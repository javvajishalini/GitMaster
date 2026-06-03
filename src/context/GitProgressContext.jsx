import React, { createContext, useContext, useMemo, useState, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { tutorials } from "../data/tutorials";

const GitProgressContext = createContext();

export function GitProgressProvider({ children }) {
  const [completedTutorials, setCompletedTutorials] = useLocalStorage("gitmaster_tutorials", []);
  const [completedChallenges, setCompletedChallenges] = useLocalStorage("gitmaster_challenges", []);
  const [quizAttempts, setQuizAttempts] = useLocalStorage("gitmaster_quizzes", []);
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Simulated Git repository state shared globally so the practice carries over between lessons!
  const [gitState, setGitState] = useLocalStorage("gitmaster_git_state", {
    repoInitialized: false,
    checkedStatus: false,
    stagedFiles: [],
    unstagedFiles: ["index.html", "style.css"],
    commits: [],
    completedLog: false,
    currentBranch: "main",
    branches: ["main"]
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
    setGitState({
      repoInitialized: false,
      checkedStatus: false,
      stagedFiles: [],
      unstagedFiles: ["index.html", "style.css"],
      commits: [],
      completedLog: false,
      currentBranch: "main",
      branches: ["main"]
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
        completeTutorial,
        completeChallenge,
        recordQuizAttempt,
        resetProgress,
        toast,
        showToast
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
