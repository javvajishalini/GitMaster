import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Terminal from "../components/Terminal";
import { tutorials } from "../data/tutorials";
import { useGitProgress } from "../context/GitProgressContext";
import { ChevronLeft, ChevronRight, BookOpen, Info, HelpCircle, CheckCircle, AlertTriangle, RefreshCw, Menu, X } from "lucide-react";

// Mini practice quiz helper component for lessons without terminal challenges
function PracticeQuiz({ quiz, onQuizPassed, isPassed }) {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = quiz[currentQIdx];

  const handleOptionSelect = (optIdx) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);
    const correct = optIdx === question.answer;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentQIdx < quiz.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      // Finished all questions!
      onQuizPassed();
    }
  };

  const handleReset = () => {
    setCurrentQIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  if (isPassed) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle size={24} />
        </div>
        <div className="space-y-1">
          <h5 className="text-sm font-bold text-white">Quiz Practice Completed</h5>
          <p className="text-[11px] text-slate-400">You successfully cleared the questions for this lesson module.</p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          <RefreshCw size={12} /> Retake Lesson Practice
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Question tracker */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-semibold">
        <span>Question {currentQIdx + 1} of {quiz.length}</span>
        <span className="text-indigo-400">Intro Quiz</span>
      </div>

      {/* Question prompt */}
      <p className="text-xs font-semibold text-slate-200 text-left">
        {question.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOpt === idx;
          const isCorrectAns = idx === question.answer;

          let style = "border-slate-800 bg-slate-900/30 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";
          if (isAnswered) {
            if (isCorrectAns) {
              style = "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-medium";
            } else if (isSelected) {
              style = "border-rose-500 bg-rose-500/10 text-rose-300 font-medium";
            } else {
              style = "border-slate-950 bg-slate-950/20 text-slate-600 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-2 ${style}`}
            >
              <span className={`w-5 h-5 rounded font-mono text-[10px] font-bold flex items-center justify-center border shrink-0 ${
                isSelected 
                  ? "bg-indigo-600 border-indigo-500 text-white" 
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback panel */}
      {isAnswered && (
        <div className={`p-3 rounded-xl border text-left text-[11px] space-y-1.5 animate-pulse-soft ${
          isCorrect 
            ? "bg-emerald-950/10 border-emerald-900/20 text-emerald-300" 
            : "bg-rose-950/10 border-rose-900/20 text-rose-300"
        }`}>
          <div className="flex items-center gap-1 font-bold uppercase tracking-wider">
            {isCorrect ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
            {isCorrect ? "Correct answer!" : "Incorrect option!"}
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{question.explanation}</p>
          
          {isCorrect ? (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-[10px] flex items-center gap-1"
              >
                {currentQIdx < quiz.length - 1 ? "Next Question" : "Complete Lesson"}
                <ChevronRight size={12} />
              </button>
            </div>
          ) : (
            <div className="pt-1.5 flex justify-end">
              <button
                onClick={() => { setSelectedOpt(null); setIsAnswered(false); }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-1.5 rounded-lg text-[10px]"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Tutorials({ activeTutorialId, setActiveTutorialId }) {
  const { completedTutorials, completedChallenges, completeTutorial, completeChallenge } = useGitProgress();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentIdx = tutorials.findIndex((t) => t.id === activeTutorialId);
  const currentLesson = tutorials[currentIdx] || tutorials[0];

  // Mark tutorial as read/completed when loaded
  useEffect(() => {
    if (currentLesson) {
      completeTutorial(currentLesson.id);
    }
  }, [currentLesson]);

  const hasChallenge = currentLesson.challenge !== null;
  const challengeDone = completedChallenges.includes(currentLesson.id);

  const handleNext = () => {
    if (currentIdx < tutorials.length - 1) {
      setActiveTutorialId(tutorials[currentIdx + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setActiveTutorialId(tutorials[currentIdx - 1].id);
    }
  };

  const handleChallengeSuccess = () => {
    completeChallenge(currentLesson.id);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
      {/* Sidebar navigation */}
      {isSidebarOpen && (
        <Sidebar 
          activeTutorialId={activeTutorialId} 
          setActiveTutorialId={(id) => {
            setActiveTutorialId(id);
            if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }} 
        />
      )}

      {/* Main content pane */}
      <main className="flex-1 bg-slate-900/10 p-4 md:p-6 lg:p-8 flex flex-col gap-6 w-full text-left overflow-y-auto">
        
        {/* Header Breadcrumbs / Title with Sidebar Menu toggler */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono uppercase font-bold tracking-wider">
              <BookOpen size={13} />
              Tutorial Module {currentIdx + 1} of {tutorials.length}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {currentLesson.title}
            </h2>
          </div>
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="self-start sm:self-center flex items-center gap-1.5 px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-xl text-xs text-slate-300 font-semibold transition-all shadow-md select-none active:scale-[0.98]"
          >
            {isSidebarOpen ? <X size={14} className="text-rose-400" /> : <Menu size={14} className="text-indigo-400" />}
            {isSidebarOpen ? "Close Syllabus" : "View Syllabus"}
          </button>
        </div>

        {/* Workspace Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Lesson Details & Navigation */}
          <div className="space-y-6">
            {/* Explanation text */}
            <section className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {currentLesson.explanation}
              </p>
            </section>

            {/* Syntax block */}
            {currentLesson.syntax !== "N/A (Git is a concept and tool suite)" && (
              <section className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Command Syntax
                </h4>
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl font-mono text-xs text-indigo-300 whitespace-pre-wrap">
                  {currentLesson.syntax}
                </div>
              </section>
            )}

            {/* Examples */}
            {currentLesson.examples && currentLesson.examples.length > 0 && (
              <section className="space-y-3">
                <h4 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Usage Examples
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentLesson.examples.map((ex, i) => (
                    <div key={i} className="bg-slate-950/30 border border-slate-900/60 rounded-xl p-4 space-y-2">
                      <div className="text-xs text-slate-400 font-sans font-medium">
                        {ex.description}
                      </div>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-xs text-slate-200 overflow-x-auto">
                        {ex.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Notes */}
            {currentLesson.notes && (
              <section className="bg-indigo-950/15 border border-indigo-900/30 rounded-2xl p-4 flex gap-3">
                <div className="shrink-0 text-indigo-400 pt-0.5">
                  <Info size={18} />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Pro Tip / Note</h5>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    {currentLesson.notes}
                  </p>
                </div>
              </section>
            )}

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-900 pt-6 mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  currentIdx === 0
                    ? "bg-slate-950/20 border-slate-900/60 text-slate-600 cursor-not-allowed"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <ChevronLeft size={16} />
                Previous Lesson
              </button>

              {!challengeDone && (
                <span className="text-[11px] font-medium text-amber-500/90 font-mono bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10 text-center">
                  ⚠️ Complete practice challenge to unlock!
                </span>
              )}

              <button
                onClick={handleNext}
                disabled={currentIdx === tutorials.length - 1 || !challengeDone}
                className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentIdx === tutorials.length - 1 || !challengeDone
                    ? "bg-slate-950/20 border-slate-900/60 text-slate-600 cursor-not-allowed opacity-50"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 active:scale-[0.98]"
                }`}
              >
                Next Lesson
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Terminal challenge OR Practice Quiz */}
          <div className="space-y-4 lg:sticky lg:top-24">
            {hasChallenge ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Practice Challenge Room
                  </h4>
                  {challengeDone && (
                    <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle size={10} /> Solved
                    </span>
                  )}
                </div>

                <Terminal 
                  challenge={currentLesson.challenge} 
                  onSuccess={handleChallengeSuccess}
                  activeLessonId={currentLesson.id}
                />
              </div>
            ) : (
              <div className="bg-slate-950/40 border border-slate-900 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <h4 className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    Lesson Practice Quiz
                  </h4>
                  {challengeDone && (
                    <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle size={10} /> Solved
                    </span>
                  )}
                </div>
                {currentLesson.practiceQuiz ? (
                  <PracticeQuiz 
                    quiz={currentLesson.practiceQuiz} 
                    onQuizPassed={handleChallengeSuccess} 
                    isPassed={challengeDone} 
                  />
                ) : (
                  <p className="text-xs text-slate-500">No practice tasks for this lesson.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
