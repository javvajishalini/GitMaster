export const COMMAND_TOOLTIPS = {
  "git init": {
    title: "git init",
    description: "Initialize a new empty Git repository.",
    flags: "",
  },
  "git status": {
    title: "git status",
    description: "Show the working tree status.",
    flags: "",
  },
  "git add": {
    title: "git add",
    description: "Add file contents to the index (staging area).",
    flags: "[--all | .] <pathspec>",
  },
  "git commit": {
    title: "git commit",
    description: "Record changes to the repository.",
    flags: "-m <msg> [--amend]",
  },
  "git push": {
    title: "git push",
    description: "Update remote refs along with associated objects.",
    flags: "[<remote> <branch>]",
  },
  "git pull": {
    title: "git pull",
    description: "Fetch from and integrate with another repository or a local branch.",
    flags: "[<remote> <branch>]",
  },
  "git merge": {
    title: "git merge",
    description: "Join two or more development histories together.",
    flags: "[--no-ff] <branch>",
  },
  "git branch": {
    title: "git branch",
    description: "List, create, or delete branches.",
    flags: "-d <branch> | <new-branch>",
  },
};
