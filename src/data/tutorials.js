export const tutorials = [
  {
    id: "intro",
    title: "Git Introduction",
    explanation: "Git is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It allows multiple developers to work together on the same codebase, track history, revert to previous states, and manage branches of development.",
    syntax: "N/A (Git is a concept and tool suite)",
    examples: [
      {
        description: "Checking if Git is installed on your system",
        code: "git --version"
      }
    ],
    notes: "Think of Git as a series of snapshots of your project code. Every time you commit, you are taking a snapshot of how your project looks at that exact moment.",
    challenge: null,
    practiceQuiz: [
      {
        question: "What is the primary function of Git?",
        options: [
          "To compile code into runnables",
          "To host websites on cloud servers",
          "To track file changes and collaborate on code history",
          "To edit images in the browser"
        ],
        answer: 2,
        explanation: "Git is a version control system whose primary job is tracking changes in files and managing development history."
      },
      {
        question: "Is Git centralized or distributed?",
        options: [
          "Centralized (requires single central server)",
          "Distributed (every developer has a full copy of the history)",
          "Neither, it is a serverless database",
          "It is a browser extension"
        ],
        answer: 1,
        explanation: "Git is a distributed version control system, meaning every developer has a full copy of the repository and its history locally."
      }
    ]
  },
  {
    id: "install",
    title: "Git Installation",
    explanation: "To start using Git, you need to install it on your computer. You can download installers for Windows, macOS, or Linux from the official website. Once installed, it is common practice to set your username and email address so your commits are correctly attributed to you.",
    syntax: "git config --global user.name \"Your Name\"\ngit config --global user.email \"your.email@example.com\"",
    examples: [
      {
        description: "Configure your commit author name",
        code: 'git config --global user.name "John Doe"'
      },
      {
        description: "Configure your commit author email",
        code: 'git config --global user.email "johndoe@example.com"'
      }
    ],
    notes: "You only need to run the `git config` setup once on your machine. All subsequent repositories will use these default values.",
    challenge: {
      instruction: "Verify your Git installation version by running the version check command in the terminal.",
      expectedCommands: ["git --version"],
      hint: "Type `git --version` and press Enter.",
      successMessage: "Great! You have confirmed Git is ready to run. Let's move on to initializing a repository.",
      simulatedOutput: "git version 2.40.1.windows.1",
      updatesState: {}
    }
  },
  {
    id: "init",
    title: "Git Init",
    explanation: "The `git init` command initializes a brand new, empty Git repository. It creates a hidden folder named `.git` in the root of your project directory, which stores all repository metadata and tracking information.",
    syntax: "git init",
    examples: [
      {
        description: "Initialize the current folder as a Git repository",
        code: "git init"
      }
    ],
    notes: "Never run `git init` inside another Git repository. One repository per project is the standard rule.",
    challenge: {
      instruction: "Initialize your new project repository using the init command.",
      expectedCommands: ["git init"],
      hint: "Type the basic init command: `git init`",
      successMessage: "Repository successfully initialized! A hidden .git folder has been created, and your folder is now tracked by Git.",
      simulatedOutput: "Initialized empty Git repository in /workspace/.git/",
      updatesState: { repoInitialized: true }
    }
  },
  {
    id: "status",
    title: "Git Status",
    explanation: "The `git status` command displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git yet.",
    syntax: "git status",
    examples: [
      {
        description: "Check the status of files in your repository",
        code: "git status"
      }
    ],
    notes: "`git status` is safe to run anytime! It only shows information and does not modify any files or history.",
    challenge: {
      instruction: "Check the status of your newly initialized repository to see if there are any files or tracking information.",
      expectedCommands: ["git status"],
      hint: "Simply type `git status` to see the current state of files.",
      successMessage: "Fantastic! You checked the status. Notice how Git tells you what branch you're on (usually 'main' or 'master') and whether you have untracked files.",
      simulatedOutput: "On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tindex.html\n\tstyle.css\n\nnothing added to commit but untracked files present (use \"git add\" to track)",
      updatesState: { checkedStatus: true }
    }
  },
  {
    id: "add",
    title: "Git Add",
    explanation: "The `git add` command adds changes in your working directory to your staging area. It tells Git that you want to include these changes in the next commit snapshot. You can stage individual files or all changes in the current directory.",
    syntax: "git add <filename>\ngit add .",
    examples: [
      {
        description: "Stage a single file named index.html",
        code: "git add index.html"
      },
      {
        description: "Stage all changed and new files in the current folder",
        code: "git add ."
      }
    ],
    notes: "Staging is like packing a box. You decide what goes in before sealing (committing) it.",
    challenge: {
      instruction: "Stage all files (`index.html` and `style.css`) in the project directory using the wildcard selector.",
      expectedCommands: ["git add .", "git add -A"],
      hint: "Use the dot notation: `git add .` to add all files to the staging area.",
      successMessage: "Excellent! All untracked files are now staged. If you run status now, you will see they are listed in green as changes to be committed.",
      simulatedOutput: "",
      updatesState: { stagedFiles: ["index.html", "style.css"], unstagedFiles: [] }
    }
  },
  {
    id: "commit",
    title: "Git Commit",
    explanation: "The `git commit` command saves your staged snapshots to the project history. Commits require a descriptive commit message using the `-m` flag, describing what changes were made. This is essential for understanding history later.",
    syntax: "git commit -m \"Your descriptive message here\"",
    examples: [
      {
        description: "Commit staged changes with a message",
        code: 'git commit -m "Initial commit with landing page"'
      }
    ],
    notes: "Commit early and commit often! Small, focused commits make it much easier to track down bugs and collaborate with others.",
    challenge: {
      instruction: "Commit your staged files with the message: 'Initial commit'",
      expectedCommands: ["git commit -m \"Initial commit\"", "git commit -m 'Initial commit'"],
      hint: "Run `git commit -m \"Initial commit\"`. Make sure to use quotes for the message.",
      successMessage: "Boom! You made your first Git commit! Your changes are permanently saved in the local repository database history.",
      simulatedOutput: "[main (root-commit) a1b2c3d] Initial commit\n 2 files changed, 24 insertions(+)\n create mode 100644 index.html\n create mode 100644 style.css",
      updatesState: { commits: [{ hash: "a1b2c3d", message: "Initial commit", date: "Just now" }] }
    }
  },
  {
    id: "log",
    title: "Git Log",
    explanation: "The `git log` command lists all the commits made in the repository in reverse chronological order. It displays the commit hash, author name, date/time, and the commit message for each saved state.",
    syntax: "git log",
    examples: [
      {
        description: "View the list of all commits in history",
        code: "git log"
      },
      {
        description: "View history formatted on one line per commit",
        code: "git log --oneline"
      }
    ],
    notes: "`git log` helps you travel back in time, inspect your teammates' contributions, and locate when bugs were introduced.",
    challenge: {
      instruction: "View your project's commit history to see the 'Initial commit' you just created.",
      expectedCommands: ["git log", "git log --oneline"],
      hint: "Run the command `git log` to display history log.",
      successMessage: "Congratulations! You have completed all essential basic Git tutorials and interactive challenges! You're ready to head over to the quiz or reference page to test your knowledge.",
      simulatedOutput: "commit a1b2c3dfb867c29ae7d92a10dcf20ea3b25a3bc4 (HEAD -> main)\nAuthor: John Doe <johndoe@example.com>\nDate:   Wed Jun 3 10:00:00 2026 +0530\n\n    Initial commit",
      updatesState: { completedLog: true }
    }
  }
];
