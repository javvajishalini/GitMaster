import React from "react";
import { useGitProgress } from "../context/GitProgressContext";
import { BookOpen, Clipboard, Award, Home, RefreshCw } from "lucide-react";

export default function Navbar({ activePage, setActivePage }) {
  const { progressStats, resetProgress } = useGitProgress();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tutorials", label: "Tutorials", icon: BookOpen },
    { id: "reference", label: "Command Reference", icon: Clipboard },
    { id: "quiz", label: "Quiz Arena", icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between">
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
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "liquid-glass-active text-white font-bold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
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
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Overall Progress</span>
            <span className="text-xs font-mono font-bold text-indigo-400">{progressStats.percentage}%</span>
          </div>
          <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressStats.percentage}%` }}
            />
          </div>
        </div>

        {/* Reset Trigger */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all your progress data? This cannot be undone.")) {
              resetProgress();
              setActivePage("home");
            }
          }}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-slate-900 hover:border-rose-500/20"
          title="Reset All Progress Data"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </header>
  );
}
