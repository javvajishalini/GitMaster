import React, { createContext, useContext, useMemo, useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { tutorials } from "../data/tutorials";

const GitProgressContext = createContext();

export const BADGES = [
  { id: "initiate", title: "Git Initiate", description: "Complete the Intro tutorial module", icon: "GraduationCap" },
  { id: "first_commit", title: "First Commit", description: "Make your first commit in the interactive terminal", icon: "GitCommit" },
  { id: "branching_boss", title: "Branching Boss", description: "Create and switch to a new branch", icon: "GitBranch" },
  { id: "perfectionist", title: "Quiz Perfectionist", description: "Score 100% on a Git Fundamentals Quiz", icon: "Award" },
  { id: "grandmaster", title: "Grandmaster", description: "Complete all tutorials and challenges", icon: "Trophy" }
];

export function GitProgressProvider({ children }) {
  const [completedTutorials, setCompletedTutorials] = useLocalStorage("gitmaster_tutorials", []);
  const [completedChallenges, setCompletedChallenges] = useLocalStorage("gitmaster_challenges", []);
  const [quizAttempts, setQuizAttempts] = useLocalStorage("gitmaster_quizzes", []);
  const [unlockedBadges, setUnlockedBadges] = useLocalStorage("gitmaster_badges", []);
  const [toast, setToast] = useState(null);
  const [achievementToast, setAchievementToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const achievementTimeoutRef = useRef(null);

  // Simulated Git repository state shared globally so the practice carries over between lessons!
  const [gitState, setGitState] = useLocalStorage("gitmaster_git_state", {
    repoInitialized: false,
    checkedStatus: false,
    stagedFiles: [],
    unstagedFiles: ["index.html", "style.css"],
    commits: [],
    completedLog: false,
    currentBranch: "main",
    branches: ["main"],
    remoteUrl: null,
    remoteCommits: []
  });

  const showToast = (message, type = "info") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const showAchievementToast = (badge) => {
    if (achievementTimeoutRef.current) {
      clearTimeout(achievementTimeoutRef.current);
    }
    setAchievementToast(badge);
    achievementTimeoutRef.current = setTimeout(() => {
      setAchievementToast(null);
    }, 5000);
  };

  const totalTutorials = tutorials.length;
  const totalChallenges = tutorials.filter(t => t.challenge !== null || t.practiceQuiz !== undefined).length;
  const totalMilestones = totalTutorials + totalChallenges;

  const progressStats = useMemo(() => {
    const completedT = completedTutorials.length;
    const completedC = completedChallenges.length;
    const totalCompleted = completedT + completedC;
    const percentage = totalMilestones > 0 ? Math.round((totalCompleted / totalMilestones) * 100) : 0;
    
    // Average quiz score
    let avgQuizScore = 0;
    if (quizAttempts.length > 0) {
      const sum = quizAttempts.reduce((acc, attempt) => acc + attempt.percentage, 0);
      avgQuizScore = Math.round(sum / quizAttempts.length);
    }

    return {
      completedTutorialsCount: completedT,
      completedChallengesCount: completedC,
      totalMilestones,
      totalCompleted,
      percentage,
      quizAttemptsCount: quizAttempts.length,
      avgQuizScore,
      recentQuizScore: quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1].score : null,
      recentQuizTotal: quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1].total : null,
    };
  }, [completedTutorials, completedChallenges, quizAttempts, totalMilestones]);

  // Command usage tracking
  const [commandUsage, setCommandUsage] = useState({});

  const clearCommandUsage = () => setCommandUsage({});

  // Increment usage for a command
  const recordCommandUsage = (cmd) => {
    setCommandUsage((prev) => {
      const count = prev[cmd] ?? 0;
      return { ...prev, [cmd]: count + 1 };
    });
  };

  // Exported via context value below
  useEffect(() => {
    const newBadges = [];
    
    if (!unlockedBadges.includes("initiate") && completedTutorials.includes("intro")) {
      newBadges.push("initiate");
    }
    
    if (!unlockedBadges.includes("first_commit") && gitState.commits && gitState.commits.length > 0) {
      newBadges.push("first_commit");
    }
    
    if (!unlockedBadges.includes("branching_boss") && gitState.branches && gitState.branches.length > 1) {
      newBadges.push("branching_boss");
    }
    
    const perfectQuiz = quizAttempts.find(q => q.percentage === 100);
    if (!unlockedBadges.includes("perfectionist") && perfectQuiz) {
      newBadges.push("perfectionist");
    }
    
    if (!unlockedBadges.includes("grandmaster") && completedTutorials.length === totalTutorials && completedChallenges.length === totalChallenges && totalTutorials > 0) {
      newBadges.push("grandmaster");
    }
    
    if (newBadges.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newBadges]);
      // Show toast for the first newly unlocked badge
      const badgeInfo = BADGES.find(b => b.id === newBadges[0]);
      if (badgeInfo) {
        showAchievementToast(badgeInfo);
      }
    }
  }, [completedTutorials, completedChallenges, quizAttempts, gitState, unlockedBadges, totalTutorials, totalChallenges]);

  const completeTutorial = (id) => {
    if (!completedTutorials.includes(id)) {
      setCompletedTutorials((prev) => [...prev, id]);
      // Show tutorial completion toast!
      const tutorialObj = tutorials.find(t => t.id === id);
      showToast(`Module Completed: ${tutorialObj?.title || id}`, "success");
    }
  };

  const completeChallenge = (id) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges((prev) => [...prev, id]);
      showToast("Practice Task Unlocked!", "success");
    }
  };

  const recordQuizAttempt = (score, total) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const attempt = {
      score,
      total,
      percentage,
      date: new Date().toLocaleDateString()
    };
    setQuizAttempts((prev) => [...prev, attempt]);
    showToast(`Quiz completed: ${score}/${total} score!`, percentage >= 70 ? "success" : "info");
  };

  const resetProgress = () => {
    setCompletedTutorials([]);
    setCompletedChallenges([]);
    setQuizAttempts([]);
    setUnlockedBadges([]);
    setGitState({
      repoInitialized: false,
      checkedStatus: false,
      stagedFiles: [],
      unstagedFiles: ["index.html", "style.css"],
      commits: [],
      completedLog: false,
      currentBranch: "main",
      branches: ["main"],
      remoteUrl: null,
      remoteCommits: []
    });
    showToast("Application progress has been reset.", "info");
  };

  return (
    <GitProgressContext.Provider
      value={{
        completedTutorials,
        completedChallenges,
        quizAttempts,
        gitState,
        setGitState,
        progressStats,
        commandUsage,
        recordCommandUsage,
        clearCommandUsage,
        completeTutorial,
        completeChallenge,
        recordQuizAttempt,
        resetProgress,
        toast,
        showToast,
        achievementToast
      }}
    >
      {children}
    </GitProgressContext.Provider>
  );
}

export function useGitProgress() {
  const context = useContext(GitProgressContext);
  if (!context) {
    throw new Error("useGitProgress must be used within a GitProgressProvider");
  }
  return context;
}
