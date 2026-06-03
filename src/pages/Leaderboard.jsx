import React, { useMemo } from "react";
import { useGitProgress } from "../context/GitProgressContext";
import {
  Trophy, Terminal, Flame, Zap, Award, BarChart2, RefreshCcw,
  Star, Hash, GitBranch, GitCommit, Cpu, RotateCcw
} from "lucide-react";

// Medal config for top 3
const MEDAL = [
  { color: "#FFD700", label: "Gold", icon: "🥇" },
  { color: "#C0C0C0", label: "Silver", icon: "🥈" },
  { color: "#CD7F32", label: "Bronze", icon: "🥉" },
];

// Command icon mapping
const CMD_ICONS = {
  "git init": GitBranch,
  "git status": Cpu,
  "git add .": Hash,
  "git commit": GitCommit,
  "git log": BarChart2,
  "git branch": GitBranch,
  "git checkout": RotateCcw,
  "git merge": Zap,
  "git --version": Star,
  "help": HelpIconFallback,
  "clear": RefreshCcw,
};

function HelpIconFallback(props) {
  return <span style={{ fontSize: 14 }}>?</span>;
}

function getCommandIcon(cmd) {
  // Match by prefix
  for (const key of Object.keys(CMD_ICONS)) {
    if (cmd.startsWith(key)) return CMD_ICONS[key];
  }
  return Terminal;
}

// Rank titles by total command count
function getRankTitle(total) {
  if (total >= 100) return { title: "Git Grandmaster", color: "#a78bfa" };
  if (total >= 50)  return { title: "Branch Wizard",   color: "#60a5fa" };
  if (total >= 25)  return { title: "Commit Champion", color: "#34d399" };
  if (total >= 10)  return { title: "Stage Warrior",   color: "#f59e0b" };
  if (total >= 1)   return { title: "Git Initiate",    color: "#94a3b8" };
  return               { title: "Newcomer",          color: "#64748b" };
}

export default function Leaderboard() {
  const { commandUsage, clearCommandUsage } = useGitProgress();

  const sorted = useMemo(() => {
    return Object.entries(commandUsage)
      .sort((a, b) => b[1] - a[1]);
  }, [commandUsage]);

  const totalCommands = useMemo(
    () => Object.values(commandUsage).reduce((acc, v) => acc + v, 0),
    [commandUsage]
  );

  const rank = getRankTitle(totalCommands);
  const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

  return (
    <div className="min-h-screen bg-[color:var(--bg-app)] text-[color:var(--text-body)] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden mb-10 p-8 flex items-center gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(139,92,246,0.14) 50%, rgba(16,185,129,0.10) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
            backdropFilter: "blur(12px)"
          }}>
          {/* Decorative glow */}
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

          <div className="relative shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, rgba(79,70,229,0.35), rgba(139,92,246,0.25))",
              border: "1px solid rgba(139,92,246,0.35)"
            }}>
            🏆
          </div>

          <div className="relative flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
              style={{ color: "rgba(167,139,250,0.8)" }}>
              Command Activity
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1 leading-none"
              style={{
                background: "linear-gradient(90deg,#818cf8,#a78bfa,#c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
              Leaderboard
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Track your most-used Git commands and level up your rank.
            </p>
          </div>
        </div>

        {/* Rank Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Current Rank */}
          <div className="col-span-1 sm:col-span-2 rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(30,27,75,0.6), rgba(45,38,88,0.5))",
              border: "1px solid rgba(99,102,241,0.2)"
            }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{
                background: "rgba(79,70,229,0.2)",
                border: `1.5px solid ${rank.color}40`
              }}>
              <Trophy size={26} style={{ color: rank.color }} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5"
                style={{ color: "rgba(148,163,184,0.7)" }}>Your Rank</div>
              <div className="text-xl font-extrabold" style={{ color: rank.color }}>{rank.title}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {totalCommands === 0
                  ? "Run your first command in the terminal to start climbing!"
                  : `${totalCommands} command${totalCommands !== 1 ? "s" : ""} executed in this session`}
              </div>
            </div>
          </div>

          {/* Total Commands Stat */}
          <div className="rounded-2xl p-5 flex flex-col items-center justify-center text-center"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.08))",
              border: "1px solid rgba(16,185,129,0.2)"
            }}>
            <Flame size={28} className="mb-2" style={{ color: "#34d399" }} />
            <div className="text-3xl font-black" style={{ color: "#34d399" }}>{totalCommands}</div>
            <div className="text-[10px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: "rgba(148,163,184,0.7)" }}>
              Commands Run
            </div>
          </div>
        </div>

        {/* Command Table */}
        <div className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15,14,35,0.55)",
            border: "1px solid rgba(99,102,241,0.18)",
            backdropFilter: "blur(10px)"
          }}>
          {/* Table header */}
          <div className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "rgba(99,102,241,0.15)" }}>
            <div className="flex items-center gap-2">
              <BarChart2 size={16} style={{ color: "#818cf8" }} />
              <span className="font-bold text-sm" style={{ color: "var(--text-body)" }}>Command Usage Rankings</span>
            </div>
            {totalCommands > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("Clear your command usage history for this session?")) {
                    clearCommandUsage();
                  }
                }}
                className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{
                  color: "rgba(239,68,68,0.8)",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)"
                }}
                title="Reset session usage stats"
              >
                <RefreshCcw size={11} /> Reset
              </button>
            )}
          </div>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(79,70,229,0.1)",
                  border: "1px solid rgba(79,70,229,0.2)"
                }}>
                <Terminal size={28} style={{ color: "#818cf8" }} />
              </div>
              <div className="text-center">
                <div className="font-bold mb-1">No commands yet</div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Head to the Tutorials and start using the interactive terminal!
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(99,102,241,0.1)" }}>
              {sorted.map(([cmd, count], idx) => {
                const Icon = getCommandIcon(cmd);
                const barWidth = Math.round((count / maxCount) * 100);
                const medal = MEDAL[idx];

                return (
                  <div
                    key={cmd}
                    className="flex items-center gap-4 px-6 py-4 transition-colors"
                    style={{
                      background: idx < 3 ? `${medal.color}08` : "transparent",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.07)"; }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = idx < 3 ? `${medal.color}08` : "transparent";
                    }}
                  >
                    {/* Rank */}
                    <div className="w-8 shrink-0 text-center font-black text-base select-none">
                      {idx < 3 ? (
                        <span className="text-lg">{medal.icon}</span>
                      ) : (
                        <span style={{ color: "rgba(148,163,184,0.5)" }}>#{idx + 1}</span>
                      )}
                    </div>

                    {/* Command icon */}
                    <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center"
                      style={{
                        background: idx < 3
                          ? `${medal.color}15`
                          : "rgba(79,70,229,0.12)",
                        border: `1px solid ${idx < 3 ? `${medal.color}30` : "rgba(79,70,229,0.2)"}`
                      }}>
                      <Icon size={16} style={{ color: idx < 3 ? medal.color : "#818cf8" }} />
                    </div>

                    {/* Command name + bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <code className="text-sm font-bold font-mono" style={{
                          color: idx < 3 ? medal.color : "var(--text-body)"
                        }}>
                          {cmd}
                        </code>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full ml-3 shrink-0"
                          style={{
                            background: idx < 3 ? `${medal.color}18` : "rgba(79,70,229,0.15)",
                            color: idx < 3 ? medal.color : "#818cf8",
                            border: `1px solid ${idx < 3 ? `${medal.color}30` : "rgba(79,70,229,0.25)"}`
                          }}>
                          ×{count}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${barWidth}%`,
                            background: idx < 3
                              ? `linear-gradient(90deg, ${medal.color}cc, ${medal.color}88)`
                              : "linear-gradient(90deg, #6366f1, #8b5cf6)"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rank Progression Guide */}
        <div className="mt-8 rounded-2xl p-6"
          style={{
            background: "rgba(15,14,35,0.45)",
            border: "1px solid rgba(99,102,241,0.15)"
          }}>
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} style={{ color: "#a78bfa" }} />
            <span className="font-bold text-sm">Rank Progression</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: "Newcomer",        min: 0,   color: "#64748b" },
              { title: "Git Initiate",    min: 1,   color: "#94a3b8" },
              { title: "Stage Warrior",   min: 10,  color: "#f59e0b" },
              { title: "Commit Champion", min: 25,  color: "#34d399" },
              { title: "Branch Wizard",   min: 50,  color: "#60a5fa" },
              { title: "Git Grandmaster", min: 100, color: "#a78bfa" },
            ].map(r => {
              const isActive = totalCommands >= r.min &&
                (r.min === 100 || totalCommands < [1,10,25,50,100,Infinity][[0,1,10,25,50,100].indexOf(r.min) + 1]);
              return (
                <div key={r.title}
                  className="rounded-xl px-4 py-3 flex items-center gap-3 transition-all"
                  style={{
                    background: isActive ? `${r.color}15` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isActive ? `${r.color}40` : "rgba(255,255,255,0.05)"}`,
                    transform: isActive ? "scale(1.02)" : "scale(1)"
                  }}>
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color }} />
                  <div>
                    <div className="text-xs font-bold" style={{ color: isActive ? r.color : "rgba(148,163,184,0.5)" }}>
                      {r.title}
                    </div>
                    <div className="text-[10px]" style={{ color: "rgba(148,163,184,0.4)" }}>
                      {r.min === 0 ? "Start" : `${r.min}+ cmds`}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto">
                      <Zap size={12} style={{ color: r.color }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
