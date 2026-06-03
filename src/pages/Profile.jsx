import React from "react";
import { useGitProgress, BADGES } from "../context/GitProgressContext";
import { GraduationCap, GitCommit, GitBranch, Award, Trophy, Lock } from "lucide-react";

const iconMap = {
  GraduationCap,
  GitCommit,
  GitBranch,
  Award,
  Trophy
};

export default function Profile() {
  const { unlockedBadges, progressStats } = useGitProgress();

  const getRank = () => {
    if (unlockedBadges.length >= 5) return "Git Grandmaster";
    if (unlockedBadges.length >= 3) return "Git Practitioner";
    if (unlockedBadges.length >= 1) return "Git Novice";
    return "Git Trainee";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fade-in text-center">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500 mb-2">
          Your Developer Profile
        </h1>
        <p className="text-[color:var(--text-subtle)] text-sm md:text-base max-w-2xl mx-auto">
          Track your Git mastery progress and collect achievement badges.
        </p>
      </div>

      <div className="glassmorphism border border-[color:var(--glass-border)] rounded-3xl p-8 max-w-xl mx-auto space-y-6">
        <div className="text-[color:var(--text-muted)] text-xs font-mono uppercase tracking-widest font-bold">Current Rank</div>
        <div className="text-4xl font-extrabold text-[color:var(--text-body)]">
          {getRank()}
        </div>
        
        {/* XP Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[color:var(--text-subtle)]">
            <span>{unlockedBadges.length} Badges</span>
            <span>{BADGES.length} Total</span>
          </div>
          <div className="h-3 w-full bg-[color:var(--bg-app)] rounded-full overflow-hidden border border-[color:var(--border-footer)]">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${(unlockedBadges.length / BADGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-8 text-left space-y-6">
        <h2 className="text-xl font-bold text-[color:var(--text-body)] font-mono uppercase tracking-wider flex items-center gap-2">
          <Award size={20} className="text-indigo-500" /> Achievements ({unlockedBadges.length}/{BADGES.length})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const IconComponent = iconMap[badge.icon] || Award;
            
            return (
              <div 
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isUnlocked
                    ? "bg-[color:var(--bg-footer)] border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.1)]"
                    : "bg-[color:var(--bg-app)] border-[color:var(--border-footer)] opacity-60 grayscale"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isUnlocked 
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" 
                      : "bg-[color:var(--bg-app)] text-[color:var(--text-muted)] border-[color:var(--border-footer)]"
                  }`}>
                    {isUnlocked ? <IconComponent size={24} /> : <Lock size={20} />}
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${isUnlocked ? "text-[color:var(--text-body)]" : "text-[color:var(--text-subtle)]"}`}>
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-[color:var(--text-muted)] leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
