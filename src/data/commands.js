export const commands = [
  {
    name: "git init",
    syntax: "git init",
    category: "Setup",
    description: "Initializes a new, empty Git repository in the current working directory, creating a hidden `.git` folder.",
    example: "git init"
  },
  {
    name: "git add",
    syntax: "git add <file-or-directory>",
    category: "Basic Snapshotting",
    description: "Adds file contents, changes, or new untracked files to the staging area, marking them for the next commit snapshot.",
    example: "git add index.html\ngit add ."
  },
  {
    name: "git commit",
    syntax: "git commit -m \"<message>\"",
    category: "Basic Snapshotting",
    description: "Saves a snapshot of the staged files to the repository history log with a descriptive log message.",
    example: 'git commit -m "Add responsive grid styling"'
  },
  {
    name: "git status",
    syntax: "git status",
    category: "Inspection & Comparison",
    description: "Displays the status of files in the working directory and staging area, highlighting untracked, modified, or staged files.",
    example: "git status"
  },
  {
    name: "git log",
    syntax: "git log",
    category: "Inspection & Comparison",
    description: "Shows the commit history log for the current branch in reverse chronological order, including hashes, author, and date details.",
    example: "git log\ngit log --oneline"
  },
  {
    name: "git clone",
    syntax: "git clone <repository-url>",
    category: "Setup",
    description: "Downloads an existing Git repository from a remote location (like GitHub) to your local machine.",
    example: "git clone https://github.com/user/project.git"
  },
  {
    name: "git branch",
    syntax: "git branch <branch-name>",
    category: "Branching & Merging",
    description: "Lists branches, creates new branches, or deletes existing branches in the local repository.",
    example: "git branch feature-login\ngit branch -d feature-login"
  },
  {
    name: "git checkout",
    syntax: "git checkout <branch-or-commit>",
    category: "Branching & Merging",
    description: "Switches branches or restores working tree files. Used to change focus between different versions.",
    example: "git checkout main\ngit checkout feature-login"
  },
  {
    name: "git push",
    syntax: "git push <remote> <branch>",
    category: "Sharing & Updating",
    description: "Uploads your local branch commits to the remote repository (e.g. Origin) on a remote server.",
    example: "git push origin main"
  },
  {
    name: "git pull",
    syntax: "git pull <remote>",
    category: "Sharing & Updating",
    description: "Fetches and integrates remote changes directly into your current working branch.",
    example: "git pull origin main"
  }
];
