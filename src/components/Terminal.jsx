import React, { useState, useRef, useEffect } from "react";
import { useGitProgress } from "../context/GitProgressContext";
import { Terminal as TerminalIcon, RefreshCw, Trash2, HelpCircle, CheckCircle, AlertTriangle } from "lucide-react";

export default function Terminal({ challenge, onSuccess, activeLessonId }) {
  const { gitState, setGitState } = useGitProgress();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "# GitMaster Interactive Practice Terminal v1.0", type: "system" },
    { text: "# Type 'help' to see list of supported commands.", type: "system" },
    { text: "", type: "output" }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on terminal area click
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keyboard navigation for command history (up/down arrow keys)
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add to command history list (for arrow keys)
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Add user input line to screen history
    setHistory(prev => [...prev, { text: trimmedInput, type: "input" }]);
    setInput("");

    // Process command
    processCommand(trimmedInput);
  };

  const processCommand = (cmdText) => {
    const args = cmdText.split(/\s+/);
    const primary = args[0];

    // Helper to print lines to terminal
    const print = (text, type = "output") => {
      setHistory(prev => [...prev, { text, type }]);
    };

    if (cmdText === "clear") {
      setHistory([]);
      return;
    }

    if (cmdText === "help") {
      print("Supported Git commands in this practice simulator:", "info");
      print("  git init             - Initialize a new empty repository", "info");
      print("  git status           - Show the working tree status", "info");
      print("  git add .            - Add all files to the staging area", "info");
      print("  git commit -m \"msg\"  - Commit staged changes with message", "info");
      print("  git log              - Show commit history logs", "info");
      print("  git --version        - Check Git installation version", "info");
      print("  clear                - Clear terminal screen", "info");
      return;
    }

    // Check if challenge expects this command
    const isChallengeCommand = challenge && challenge.expectedCommands.some(
      expected => expected.toLowerCase() === cmdText.toLowerCase()
    );

    if (isChallengeCommand) {
      // Execute the state update from challenge and run output
      let outputText = challenge.simulatedOutput;
      
      // Update global/local state
      const updated = { ...gitState, ...challenge.updatesState };
      
      // Special logic to populate simulation fields dynamically
      if (cmdText === "git init") {
        updated.repoInitialized = true;
      } else if (cmdText.startsWith("git add")) {
        updated.stagedFiles = ["index.html", "style.css"];
        updated.unstagedFiles = [];
        outputText = "Changes staged successfully.";
      } else if (cmdText.startsWith("git commit")) {
        // Parse message
        const match = cmdText.match(/git commit -m\s+["'](.*?)["']/);
        const msg = match ? match[1] : "Initial commit";
        updated.commits = [
          { hash: "a1b2c3d", message: msg, date: new Date().toLocaleTimeString() },
          ...gitState.commits
        ];
        updated.stagedFiles = [];
        updated.unstagedFiles = [];
        outputText = `[main (root-commit) a1b2c3d] ${msg}\n 2 files changed, 24 insertions(+)\n create mode 100644 index.html\n create mode 100644 style.css`;
      } else if (cmdText === "git status") {
        updated.checkedStatus = true;
      } else if (cmdText === "git log") {
        updated.completedLog = true;
      }

      setGitState(updated);
      if (outputText) {
        print(outputText, "output");
      }
      print(`Challenge Successful! ${challenge.successMessage}`, "success");
      
      if (onSuccess) {
        onSuccess();
      }
      return;
    }

    // Standard simulation of commands outside the active challenge trigger
    if (primary === "git") {
      const gitCmd = args[1];

      if (!gitCmd) {
        print("Usage: git <command> [<args>]", "error");
        return;
      }

      // Check repo initialization for git commands other than 'init' and '--version'
      if (gitCmd !== "init" && args[1] !== "--version" && !gitState.repoInitialized) {
        print("fatal: not a git repository (or any of the parent directories): .git", "error");
        return;
      }

      switch (gitCmd) {
        case "--version":
          print("git version 2.40.1.windows.1");
          break;

        case "init":
          if (gitState.repoInitialized) {
            print("Reinitialized existing Git repository in /workspace/.git/");
          } else {
            setGitState(prev => ({ ...prev, repoInitialized: true }));
            print("Initialized empty Git repository in /workspace/.git/");
          }
          break;

        case "status": {
          const currentB = gitState.currentBranch || "main";
          if (gitState.stagedFiles.length === 0 && gitState.unstagedFiles.length === 0) {
            print(`On branch ${currentB}\nnothing to commit, working tree clean`);
          } else if (gitState.stagedFiles.length === 0 && gitState.unstagedFiles.length > 0) {
            print(`On branch ${currentB}\n\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\t` + gitState.unstagedFiles.join("\n\t") + "\n\nnothing added to commit but untracked files present (use \"git add\" to track)");
          } else {
            const stagedList = gitState.stagedFiles.map(f => `\tnew file:   ${f}`).join("\n");
            const unstagedList = gitState.unstagedFiles.length > 0 
              ? `\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\t` + gitState.unstagedFiles.join("\n\t")
              : "";
            print(`On branch ${currentB}\n\nNo commits yet\n\nChanges to be committed:\n  (use "git rm --cached <file>..." to unstage)\n${stagedList}${unstagedList}`);
          }
          break;
        }

        case "add":
          const fileToStage = args.slice(2).join(" ");
          if (!fileToStage) {
            print("Nothing specified, nothing added.\nMaybe you wanted to say 'git add .'?", "error");
          } else if (fileToStage === "." || fileToStage === "-A" || fileToStage === "*") {
            setGitState(prev => ({
              ...prev,
              stagedFiles: [...new Set([...prev.stagedFiles, ...prev.unstagedFiles])],
              unstagedFiles: []
            }));
            // Git add is silent on success!
          } else {
            if (gitState.unstagedFiles.includes(fileToStage)) {
              setGitState(prev => ({
                ...prev,
                stagedFiles: [...new Set([...prev.stagedFiles, fileToStage])],
                unstagedFiles: prev.unstagedFiles.filter(f => f !== fileToStage)
              }));
            } else {
              print(`fatal: pathspec '${fileToStage}' did not match any files`, "error");
            }
          }
          break;

        case "commit":
          const hasMFlag = args.includes("-m");
          if (!hasMFlag) {
            print("error: switch `m' requires a value\nUsage: git commit -m \"message\"", "error");
            return;
          }

          // Regex to parse commit message properly
          const commitMsgMatch = cmdText.match(/git commit -m\s+["'](.*?)["']/);
          if (!commitMsgMatch) {
            print("error: unbalanced quotes or missing commit message.\nFormat: git commit -m \"your message\"", "error");
            return;
          }

          const msg = commitMsgMatch[1].trim();
          if (!msg) {
            print("error: empty commit message is not allowed.", "error");
            return;
          }

          if (gitState.stagedFiles.length === 0) {
            print(`On branch ${gitState.currentBranch || "main"}\nnothing to commit, working tree clean`);
          } else {
            const commitHash = Math.random().toString(16).substring(2, 9);
            const newCommit = {
              hash: commitHash,
              message: msg,
              date: new Date().toLocaleTimeString()
            };
            setGitState(prev => ({
              ...prev,
              commits: [newCommit, ...prev.commits],
              stagedFiles: []
            }));
            print(`[${gitState.currentBranch || "main"} (root-commit) ${commitHash}] ${msg}\n ${gitState.stagedFiles.length} file(s) changed, 12 insertions(+)`);
          }
          break;

        case "log":
          if (gitState.commits.length === 0) {
            print(`fatal: your current branch '${gitState.currentBranch || "main"}' does not have any commits yet`, "error");
          } else {
            gitState.commits.forEach(c => {
              print(`commit ${c.hash}7a8b9c0d3a5efb867c29ae7d92a10dcf20ea3b25a (HEAD -> ${gitState.currentBranch || "main"})\nAuthor: John Doe <johndoe@example.com>\nDate:   ${c.date}\n\n    ${c.message}\n`, "log");
            });
          }
          break;

        case "branch": {
          const branchName = args[2];
          if (!branchName) {
            // list branches
            const branches = gitState.branches || ["main"];
            branches.forEach(b => {
              if (b === (gitState.currentBranch || "main")) {
                print(`* ${b}`, "success");
              } else {
                print(`  ${b}`);
              }
            });
          } else {
            const branches = gitState.branches || ["main"];
            if (branches.includes(branchName)) {
              print(`fatal: A branch named '${branchName}' already exists.`, "error");
            } else {
              setGitState(prev => ({
                ...prev,
                branches: [...(prev.branches || ["main"]), branchName]
              }));
            }
          }
          break;
        }

        case "checkout":
        case "switch": {
          const isNewBranch = (gitCmd === "checkout" && args[2] === "-b") || (gitCmd === "switch" && args[2] === "-c");
          const targetBranch = isNewBranch ? args[3] : args[2];
          
          if (!targetBranch) {
            print(`fatal: missing branch name`, "error");
            break;
          }

          const currentBranches = gitState.branches || ["main"];
          if (isNewBranch) {
            if (currentBranches.includes(targetBranch)) {
              print(`fatal: A branch named '${targetBranch}' already exists.`, "error");
            } else {
              setGitState(prev => ({
                ...prev,
                branches: [...(prev.branches || ["main"]), targetBranch],
                currentBranch: targetBranch
              }));
              print(`Switched to a new branch '${targetBranch}'`);
            }
          } else {
            if (!currentBranches.includes(targetBranch)) {
              print(`error: pathspec '${targetBranch}' did not match any file(s) known to git`, "error");
            } else {
              setGitState(prev => ({
                ...prev,
                currentBranch: targetBranch
              }));
              print(`Switched to branch '${targetBranch}'`);
            }
          }
          break;
        }

        case "merge": {
          const mergeBranch = args[2];
          if (!mergeBranch) {
            print("merge: missing branch", "error");
            break;
          }
          const allBranches = gitState.branches || ["main"];
          if (!allBranches.includes(mergeBranch)) {
            print(`merge: ${mergeBranch} - not something we can merge`, "error");
            break;
          }
          if (mergeBranch === (gitState.currentBranch || "main")) {
            print("Already up to date.");
          } else {
            print(`Updating ...\nFast-forward\n 1 file changed`);
          }
          break;
        }

        case "remote": {
          if (args[2] === "add") {
            const remoteName = args[3];
            const remoteUrl = args[4];
            if (!remoteName || !remoteUrl) {
              print("usage: git remote add <name> <url>", "error");
            } else {
              setGitState(prev => ({
                ...prev,
                remoteUrl: remoteUrl
              }));
              // Silent on success
            }
          } else if (args[2] === "-v") {
            if (gitState.remoteUrl) {
              print(`origin\t${gitState.remoteUrl} (fetch)\norigin\t${gitState.remoteUrl} (push)`);
            }
          } else {
            print("usage: git remote [-v | add <name> <url>]", "error");
          }
          break;
        }

        case "push": {
          if (!gitState.remoteUrl) {
            print("fatal: No configured push destination.\nEither specify the URL from the command-line or configure a remote repository using\n\n    git remote add <name> <url>\n", "error");
          } else {
            print(`Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), 284 bytes | 284.00 KiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0)\nTo ${gitState.remoteUrl}\n * [new branch]      ${gitState.currentBranch || "main"} -> ${gitState.currentBranch || "main"}`);
          }
          break;
        }

        case "pull": {
          if (!gitState.remoteUrl) {
            print("fatal: No remote repository specified.  Please, specify either a URL or a\nremote name from which new revisions should be fetched.", "error");
          } else {
            print(`From ${gitState.remoteUrl}\n * branch            ${gitState.currentBranch || "main"}     -> FETCH_HEAD\nAlready up to date.`);
          }
          break;
        }

        default:
          print(`git: '${gitCmd}' is not a git command. See 'git --help'.`, "error");
      }
    } else {
      print(`bash: ${primary}: command not found`, "error");
      if (challenge) {
        print(`💡 Hint: ${challenge.hint}`, "hint");
      }
    }
  };

  const handleResetGitState = () => {
    setGitState({
      repoInitialized: false,
      checkedStatus: false,
      stagedFiles: [],
      unstagedFiles: ["index.html", "style.css"],
      commits: [],
      completedLog: false
    });
    setHistory([
      { text: "Simulated Git Terminal Environment Reset.", type: "system" },
      { text: "Staged files cleared. Repository uninitialized.", type: "system" },
      { text: "Type 'help' to see list of supported commands.", type: "system" },
      { text: "", type: "output" }
    ]);
  };

  // Clear only terminal output without resetting repo state
  const handleClearTerminal = () => {
    setHistory([]);
  };

  return (
    <div className="flex flex-col h-[400px] rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl font-mono text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={handleResetGitState} title="Reset terminal files" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-not-allowed" />
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-not-allowed" />
          <span className="text-slate-400 text-xs pl-2 flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-indigo-400" />
            GitPracticeTerminal ~ workspace
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleResetGitState}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded hover:bg-slate-800 transition-all flex items-center gap-1 text-[11px]" 
            title="Reset Terminal Workspace"
          >
            <RefreshCw size={11} /> Reset files
          </button>
          <button
            onClick={handleClearTerminal}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded hover:bg-slate-800 transition-all flex items-center gap-1 text-[11px]"
            title="Clear terminal output"
          >
            <Trash2 size={11} /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        ref={containerRef}
        onClick={handleTerminalClick}
        className="flex-1 p-4 overflow-y-auto cursor-text space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent text-left"
      >
        {history.map((line, idx) => {
          if (line.type === "input") {
            return (
              <div key={idx} className="flex items-start">
                <span className="text-indigo-400 mr-2 font-bold">$</span>
                <span className="text-slate-100 break-all">{line.text}</span>
              </div>
            );
          } else if (line.type === "error") {
            return (
              <div key={idx} className="text-rose-400 flex items-start gap-1 text-xs whitespace-pre-wrap pl-2 border-l border-rose-500 py-0.5">
                <AlertTriangle size={13} className="shrink-0 mt-0.5 text-rose-400 animate-pulse" />
                {line.text}
              </div>
            );
          } else if (line.type === "success") {
            return (
              <div key={idx} className="text-emerald-400 flex items-start gap-1 whitespace-pre-wrap pl-2 border-l border-emerald-500 py-0.5 bg-emerald-950/20 my-1 font-bold">
                <CheckCircle size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                {line.text}
              </div>
            );
          } else if (line.type === "hint") {
            return (
              <div key={idx} className="text-amber-400 flex items-start gap-1 text-xs pl-2 border-l border-amber-500/70 py-0.5">
                <HelpCircle size={13} className="shrink-0 mt-0.5" />
                {line.text}
              </div>
            );
          } else if (line.type === "system") {
            return <div key={idx} className="text-indigo-300/60 text-xs italic">{line.text}</div>;
          } else if (line.type === "info") {
            return <div key={idx} className="text-slate-400 text-xs pl-4">{line.text}</div>;
          } else if (line.type === "log") {
            return <div key={idx} className="text-yellow-100/90 whitespace-pre-wrap pl-2 font-light border-l border-yellow-600 bg-yellow-500/5">{line.text}</div>;
          }
          return <div key={idx} className="text-slate-300 whitespace-pre-wrap pl-4">{line.text}</div>;
        })}

        {/* Input prompt line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center pt-1">
          <span className="text-indigo-400 mr-2 font-bold shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-slate-100 focus:outline-none caret-indigo-400"
            placeholder={challenge ? "Type command here..." : ""}
          />
        </form>
      </div>

      {/* Terminal Challenge Instructions Footer */}
      {challenge && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 text-left">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1 text-xs uppercase tracking-wider">
            <CheckCircle size={14} className="text-indigo-400 animate-pulse-soft" />
            Current Terminal Challenge
          </div>
          <p className="text-slate-300 text-xs font-sans leading-relaxed">{challenge.instruction}</p>
        </div>
      )}
    </div>
  );
}
