import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tutorials from "./pages/Tutorials";
import CommandReference from "./pages/CommandReference";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import { GitProgressProvider, useGitProgress } from "./context/GitProgressContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Heart, Trophy } from "lucide-react";

function AppContent() {
  const [activePage, setActivePage] = useState("home"); // home, tutorials, reference, quiz, profile
  const [activeTutorialId, setActiveTutorialId] = useState("intro");
  const { toast, achievementToast, progressStats } = useGitProgress();

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home 
            setActivePage={setActivePage} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
      case "tutorials":
        return (
          <Tutorials 
            activeTutorialId={activeTutorialId} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
      case "reference":
        return <CommandReference />;
      case "quiz":
        return <Quiz />;
      case "profile":
        return <Profile />;
      default:
        return (
          <Home 
            setActivePage={setActivePage} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[color:var(--bg-app)]">
      {/* Top Header Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-[color:var(--bg-footer)] border-b border-[color:var(--border-footer)]">
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressStats.percentage}%` }}></div>
          </div>
          <span className="text-xs text-[color:var(--text-muted)] font-medium whitespace-nowrap">{progressStats.percentage}%</span>
        </div>
      </div>

      {/* Main Routed Page Container */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* App Footer */}
      <footer className="bg-[color:var(--bg-footer)] border-t border-[color:var(--border-footer)] py-6 text-center text-xs text-[color:var(--text-muted)] font-mono select-none">
        <div className="flex items-center justify-center gap-2 mb-1 text-[color:var(--text-subtle)]">
          <span className="font-extrabold text-sm"><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500">Git</span><span className="text-white">Master</span></span>
          <span>Terminal Learning Sandbox</span>
        </div>
        <p className="flex items-center justify-center gap-1">
          Made for developers with <Heart size={10} className="text-rose-500 fill-rose-500" /> &copy; 2026. All rights reserved.
        </p>
      </footer>

      {/* Floating Toast Notification overlay */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-[100] max-w-xs md:max-w-sm p-4 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all duration-300 ${
          toast.type === "success"
            ? "bg-[color:var(--toast-success-bg)] border-[color:var(--toast-success-border)] text-[color:var(--toast-success-text)]"
            : "bg-[color:var(--toast-info-bg)] border-[color:var(--toast-info-border)] text-[color:var(--toast-info-text)]"
        }`}>
          <div className="shrink-0">
            {toast.type === "success" ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 flex items-center justify-center text-[10px] font-bold">✓</div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/35 flex items-center justify-center text-[10px] font-bold">i</div>
            )}
          </div>
          <p className="text-xs font-semibold font-sans">{toast.message}</p>
        </div>
      )}

      {/* Achievement Toast Overlay */}
      {achievementToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-full mx-4 p-4 rounded-2xl border shadow-2xl flex items-center gap-4 backdrop-blur-md transition-all duration-500 animate-fade-in bg-indigo-500/10 border-indigo-500/30 text-[color:var(--text-body)]">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 border border-indigo-500/30">
            <Trophy size={24} />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">Achievement Unlocked</div>
            <div className="text-sm font-bold">{achievementToast.title}</div>
            <div className="text-[11px] text-[color:var(--text-muted)]">{achievementToast.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GitProgressProvider>
        <AppContent />
      </GitProgressProvider>
    </ThemeProvider>
  );
}
