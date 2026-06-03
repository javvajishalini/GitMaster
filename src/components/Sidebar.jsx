import React from "react";
import { tutorials } from "../data/tutorials";
import { useGitProgress } from "../context/GitProgressContext";
import { CheckCircle, Lock, BookOpen, Terminal, ChevronRight } from "lucide-react";

export default function Sidebar({ activeTutorialId, setActiveTutorialId }) {
  const { completedTutorials, completedChallenges } = useGitProgress();

  const isLessonUnlocked = (index) => {
    if (index === 0) return true;
    const prevLesson = tutorials[index - 1];
    
    // Unlocked if previous tutorial is completed
    const prevTutorialDone = completedTutorials.includes(prevLesson.id);
    
    // and if previous lesson had a challenge, that must be completed too
    const prevChallengeDone = prevLesson.challenge ? completedChallenges.includes(prevLesson.id) : true;
    
    return prevTutorialDone && prevChallengeDone;
  };

  const isLessonFullyCompleted = (lesson) => {
    const tutorialDone = completedTutorials.includes(lesson.id);
    const challengeDone = lesson.challenge ? completedChallenges.includes(lesson.id) : true;
    return tutorialDone && challengeDone;
  };

  return (
    <aside className="w-full lg:w-80 bg-slate-950/40 border-r border-slate-900 flex flex-col p-4 shrink-0">
      <div className="mb-4 px-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Course Syllabus</h2>
        <p className="text-[11px] text-slate-500">Complete tutorials & terminal tasks to progress.</p>
      </div>

      <nav className="space-y-1.5 flex-1 overflow-y-auto">
        {tutorials.map((lesson, index) => {
          const unlocked = isLessonUnlocked(index);
          const fullyCompleted = isLessonFullyCompleted(lesson);
          const isActive = activeTutorialId === lesson.id;

          return (
            <button
              key={lesson.id}
              disabled={!unlocked}
              onClick={() => setActiveTutorialId(lesson.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600/10 border-indigo-500 text-indigo-200"
                  : unlocked
                    ? "bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100"
                    : "bg-slate-950/20 border-slate-900/60 text-slate-600 cursor-not-allowed opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                <div className="shrink-0">
                  {fullyCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/35 flex items-center justify-center">
                      <CheckCircle size={12} className="fill-emerald-500/10" />
                    </div>
                  ) : !unlocked ? (
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-slate-600 border border-slate-800/80 flex items-center justify-center">
                      <Lock size={10} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-indigo-500/5 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                      <BookOpen size={11} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-indigo-400/80 uppercase tracking-wide">
                    Module 0{index + 1}
                  </span>
                  <span className="text-sm font-semibold truncate max-w-[170px]">
                    {lesson.title}
                  </span>
                </div>
              </div>

              {unlocked && (
                <ChevronRight 
                  size={14} 
                  className={`transition-transform duration-200 ${
                    isActive ? "translate-x-0.5 text-indigo-400" : "text-slate-600"
                  }`} 
                />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
