import React from "react";
import { useGitProgress } from "../context/GitProgressContext";
import { Terminal, Award, Clipboard, ChevronRight, AwardIcon, Compass, Play } from "lucide-react";
import { tutorials } from "../data/tutorials";

export default function Home({ setActivePage, setActiveTutorialId }) {
  const { progressStats, completedTutorials } = useGitProgress();

  const startLearning = () => {
    // Find first incomplete tutorial
    const firstIncomplete = tutorials.find(t => !completedTutorials.includes(t.id));
    if (firstIncomplete) {
      setActiveTutorialId(firstIncomplete.id);
    } else {
      setActiveTutorialId(tutorials[0].id);
    }
    setActivePage("tutorials");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold animate-pulse-soft">
          <Terminal size={13} />
          Interactive Git Learning Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">Git</span> Interactively
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Unlock your dev superpowers. Learn Git installation, directory setup, staging, committing, and logging history with a live, simulated browser terminal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={startLearning}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all active:scale-[0.98]"
          >
            <Play size={16} fill="currentColor" />
            Get Started
          </button>
          <button
            onClick={() => setActivePage("reference")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold px-8 py-3.5 rounded-2xl transition-all"
          >
            Command Reference
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Progress & Stats Dashboard */}
      <section className="glassmorphism rounded-3xl p-6 md:p-8 border border-slate-900 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-6 mb-6">
          <div className="text-left">
            <h2 className="text-xl font-bold text-white mb-1">Your Progress Dashboard</h2>
            <p className="text-xs text-slate-400">Track your completed exercises, terminal milestones, and scores.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-extrabold text-indigo-400">{progressStats.percentage}%</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold font-mono">Completed</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-4 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Tutorials Read</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{progressStats.completedTutorialsCount}</span>
              <span className="text-xs text-slate-500">/ {progressStats.totalTutorials}</span>
            </div>
            <div className="w-full bg-slate-900 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full" 
                style={{ width: `${(progressStats.completedTutorialsCount / progressStats.totalTutorials) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-4 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Terminal Tasks</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{progressStats.completedChallengesCount}</span>
              <span className="text-xs text-slate-500">/ {progressStats.totalChallenges}</span>
            </div>
            <div className="w-full bg-slate-900 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full" 
                style={{ width: `${progressStats.totalChallenges > 0 ? (progressStats.completedChallengesCount / progressStats.totalChallenges) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-4 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Quiz Score Avg</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{progressStats.avgQuizScore}%</span>
              <span className="text-xs text-slate-500">score</span>
            </div>
            <div className="w-full bg-slate-900 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full" 
                style={{ width: `${progressStats.avgQuizScore}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-4 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Quiz Attempts</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{progressStats.quizAttemptsCount}</span>
              <span className="text-xs text-slate-500">total</span>
            </div>
            <div className="w-full bg-slate-900 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full" 
                style={{ width: `${progressStats.quizAttemptsCount > 0 ? 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950/20 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 text-left transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-4">
            <Compass size={20} />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Guided Tutorials</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Step-by-step explanations, interactive commands, examples, and note guides from initial installation up to branching logs.
          </p>
        </div>

        <div className="bg-slate-950/20 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 text-left transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-4">
            <Terminal size={20} />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Simulated Practice Terminal</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Run realistic commands like `git init`, `git status`, and `git commit` directly in your browser with real-time folder simulation and tips.
          </p>
        </div>

        <div className="bg-slate-950/20 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 text-left transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center border border-amber-500/20 mb-4">
            <AwardIcon size={20} />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Interactive Quiz Arena</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Test your knowledge, review explanations for answers, track score outcomes, and boost your git retention rates.
          </p>
        </div>
      </section>
    </div>
  );
}
