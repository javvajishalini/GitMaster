import React from "react";
import { useGitProgress } from "../context/GitProgressContext";
import { GitBranch, GitCommit } from "lucide-react";

export default function GitTreeVisualizer() {
  const { gitState } = useGitProgress();

  if (!gitState.repoInitialized) {
    return (
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 text-center text-slate-500 font-mono text-xs">
        <div className="flex justify-center mb-2">
          <GitBranch size={24} className="text-slate-700" />
        </div>
        <p>No repository initialized.</p>
        <p className="text-[10px] mt-1 opacity-70">Run 'git init' in the terminal to begin.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-xs shadow-xl">
      {/* Header */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wider uppercase text-[10px]">
          <GitBranch size={14} />
          Repository Tree
        </div>
        
        {/* Branches Badges */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {(gitState.branches || ["main"]).map((branch) => {
            const isCurrent = branch === (gitState.currentBranch || "main");
            return (
              <div 
                key={branch} 
                className={`px-2 py-0.5 rounded-md border text-[9px] font-bold flex items-center gap-1 ${
                  isCurrent 
                    ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
                    : "bg-slate-800/50 border-slate-700 text-slate-400"
                }`}
              >
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                {branch}
                {isCurrent && <span className="ml-0.5 opacity-70">(HEAD)</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Commits Timeline */}
      <div className="p-4 overflow-y-auto max-h-[300px] flex flex-col gap-0 scrollbar-thin scrollbar-thumb-slate-800">
        {(!gitState.commits || gitState.commits.length === 0) ? (
          <div className="text-center py-6 text-slate-500 opacity-80">
            <p>No commits yet.</p>
            <p className="text-[10px] mt-1">Stage files and commit to see history.</p>
          </div>
        ) : (
          <div className="relative pl-3 border-l-2 border-slate-700 ml-4 py-2 space-y-5">
            {gitState.commits.map((commit, idx) => {
              const isLatest = idx === 0;
              return (
                <div key={commit.hash} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-[3px] border-slate-950 flex items-center justify-center ${
                    isLatest ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-indigo-500"
                  }`}>
                  </div>

                  {/* Commit Info Card */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <GitCommit size={12} className="text-slate-500" />
                        <span className="text-amber-400 font-bold">{commit.hash}</span>
                      </div>
                      <span className="text-[9px] text-slate-500">{commit.date}</span>
                    </div>
                    
                    <p className="text-slate-300 font-sans text-sm leading-snug">
                      {commit.message}
                    </p>
                    
                    {/* If it's the latest commit, show which branches point to it (simplification for visualization) */}
                    {isLatest && (
                      <div className="mt-2 pt-2 border-t border-slate-800/50 flex flex-wrap gap-1">
                         {(gitState.branches || ["main"]).map((b) => (
                           <span key={b} className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                             {b}
                           </span>
                         ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
