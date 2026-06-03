import React from "react";
import { useGitProgress } from "../context/GitProgressContext";
import { useTheme } from "../context/ThemeContext";
import { BookOpen, Clipboard, Award, Home, RefreshCw, Sun, Moon, User, Trophy } from "lucide-react";

export default function Navbar({ activePage, setActivePage }) {
  const { progressStats, resetProgress } = useGitProgress();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tutorials", label: "Tutorials", icon: BookOpen },
    { id: "reference", label: "Command Reference", icon: Clipboard },
    { id: "quiz", label: "Quiz Arena", icon: Award },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[color:var(--bg-footer)]/90 backdrop-blur-md border-b border-[color:var(--border-footer)] px-6 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        onClick={() => setActivePage("home")}
        className="flex items-center cursor-pointer group"
      >
        <h1 className="text-2xl font-extrabold tracking-tight m-0 leading-none select-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500">Git</span><span className="text-white">Master</span>
        </h1>
      </div>

      {/* Main Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-[color:var(--bg-app)] p-1 rounded-full border border-[color:var(--border-footer)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "liquid-glass-active text-[color:var(--text-body)] font-bold shadow-sm"
                  : "text-[color:var(--text-subtle)] hover:text-[color:var(--text-body)] hover:bg-[color:var(--bg-body)]"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Progress & Reset Actions */}
      <div className="flex items-center gap-4">
        {/* Progress Bar Display */}
        <div className="hidden sm:flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[color:var(--text-muted)] font-semibold uppercase tracking-wider">Overall Progress</span>
            <span className="text-xs font-mono font-bold text-indigo-500">{progressStats.percentage}%</span>
          </div>
          <div className="w-32 bg-[color:var(--bg-app)] rounded-full h-1.5 overflow-hidden border border-[color:var(--border-footer)]">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressStats.percentage}%` }}
            />
          </div>
        </div>

        <div className="w-px h-6 bg-[color:var(--border-footer)] mx-1"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[color:var(--text-subtle)] hover:text-[color:var(--text-body)] hover:bg-[color:var(--bg-app)] rounded-lg transition-all border border-transparent hover:border-[color:var(--border-footer)]"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <div className={`transition-transform duration-500 flex items-center justify-center ${theme === "light" ? "rotate-180" : "rotate-0"}`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </div>
        </button>

        {/* Reset Trigger */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all your progress data? This cannot be undone.")) {
              resetProgress();
              setActivePage("home");
            }
          }}
          className="p-2 text-[color:var(--text-subtle)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors border border-[color:var(--border-footer)] hover:border-rose-500/30"
          title="Reset All Progress Data"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </header>
  );
}
