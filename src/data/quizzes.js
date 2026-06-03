export const quizQuestions = [
  {
    id: 1,
    question: "What is Git?",
    options: [
      "A programming language",
      "A database server",
      "A distributed version control system",
      "A remote file hosting cloud service"
    ],
    answer: 2,
    explanation: "Git is a distributed version control system designed to track changes in source code during software development."
  },
  {
    id: 2,
    question: "Which command initializes a new empty Git repository in your directory?",
    options: [
      "git start",
      "git create",
      "git install",
      "git init"
    ],
    answer: 3,
    explanation: "`git init` creates a new, empty Git repository and sets up the hidden `.git` folder."
  },
  {
    id: 3,
    question: "What does the command `git status` do?",
    options: [
      "Deletes all files in the current folder",
      "Shows which files are modified, staged, or untracked",
      "Displays the git software version",
      "Logs in to your GitHub account"
    ],
    answer: 1,
    explanation: "`git status` displays the state of the working directory and staging area."
  },
  {
    id: 4,
    question: "How do you add all files in your directory to the staging area?",
    options: [
      "git add all",
      "git add .",
      "git stage --all",
      "git commit --all"
    ],
    answer: 1,
    explanation: "`git add .` stages all changed and untracked files in the current directory and its subdirectories."
  },
  {
    id: 5,
    question: "What does the `-m` flag stand for in `git commit -m \"Message\"`?",
    options: [
      "Message",
      "Modify",
      "Main",
      "Manual"
    ],
    answer: 0,
    explanation: "The `-m` flag allows you to provide a commit message directly inline without opening a text editor."
  },
  {
    id: 6,
    question: "Which command displays the chronological list of commits in a repository?",
    options: [
      "git history",
      "git list",
      "git log",
      "git show"
    ],
    answer: 2,
    explanation: "`git log` displays a list of all commits in the repository in reverse chronological order."
  },
  {
    id: 7,
    question: "What is the 'staging area' in Git?",
    options: [
      "A website where you host your code files",
      "A preview environment for testing code",
      "An intermediate step where you prepare files before committing them",
      "A storage device for backups"
    ],
    answer: 2,
    explanation: "The staging area is a file (also known as the index) that stores information about what changes will go into your next commit snapshot."
  }
];
