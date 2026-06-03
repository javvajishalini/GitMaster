import React, { useState } from "react";
import { quizQuestions } from "../data/quizzes";
import QuizCard from "../components/QuizCard";
import { useGitProgress } from "../context/GitProgressContext";
import { Award, RefreshCw, CheckCircle2, XCircle, AlertCircle, Play, Info } from "lucide-react";

export default function Quiz() {
  const { recordQuizAttempt, progressStats } = useGitProgress();
  const [gameState, setGameState] = useState("idle"); // idle, active, completed
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]); // Array of { questionId, selectedIndex, isCorrect }

  const handleStartQuiz = () => {
    setScore(0);
    setCurrentIdx(0);
    setAnswersLog([]);
    setGameState("active");
  };

  const handleAnswerSelected = (isCorrect, selectedOptionIndex) => {
    const currentQuestion = quizQuestions[currentIdx];
    
    setAnswersLog((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: selectedOptionIndex,
        isCorrect: isCorrect
      }
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Completed!
      recordQuizAttempt(score, quizQuestions.length);
      setGameState("completed");
    }
  };

  // Determine user score grade message
  const getScoreMessage = (percentage) => {
    if (percentage === 100) return { title: "Git Legend! 🏆", desc: "Perfect score! You have completely mastered basic Git actions.", color: "text-emerald-400" };
    if (percentage >= 70) return { title: "Git Expert! 🌟", desc: "Excellent job! You have a solid grasp of fundamental Git snapshots.", color: "text-indigo-400" };
    if (percentage >= 40) return { title: "Git Developer! ⚡", desc: "Good effort! Review the tutorials and try again to improve your score.", color: "text-amber-400" };
    return { title: "Git Novice! 🎓", desc: "Keep practicing! Review commands in the terminal and tutorial lessons.", color: "text-rose-400" };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* 1. START QUIZ PANEL (IDLE) */}
      {gameState === "idle" && (
        <div className="glassmorphism border border-slate-900 rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mx-auto shadow-lg shadow-indigo-600/10">
            <Award size={32} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Git Knowledge Arena</h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Test your understanding of Git configuration, initialization, staging, commits, and logs with our short quiz.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-4 text-left space-y-2.5 max-w-sm mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold font-mono">
              <Info size={14} className="text-indigo-400" /> QUIZ RULES:
            </div>
            <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1">
              <li>Contains {quizQuestions.length} multiple-choice questions.</li>
              <li>Instant feedback showing explanations is provided.</li>
              <li>Scores are tracked and visible on the dashboard.</li>
            </ul>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            <Play size={15} fill="currentColor" />
            Start Quiz Challenge
          </button>
        </div>
      )}

      {/* 2. ACTIVE QUIZ (PLAYING) */}
      {gameState === "active" && (
        <div className="space-y-6">
          <QuizCard
            key={currentIdx}
            question={quizQuestions[currentIdx]}
            questionNumber={currentIdx + 1}
            totalQuestions={quizQuestions.length}
            onAnswerSelected={handleAnswerSelected}
            onNext={handleNextQuestion}
          />
        </div>
      )}

      {/* 3. RESULTS & FEEDBACK VIEW */}
      {gameState === "completed" && (
        <div className="space-y-8">
          {/* Main Score summary */}
          <div className="glassmorphism border border-slate-900 rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto space-y-6">
            <h3 className={`text-3xl font-extrabold ${getScoreMessage(Math.round((score / quizQuestions.length) * 100)).color}`}>
              {getScoreMessage(Math.round((score / quizQuestions.length) * 100)).title}
            </h3>
            
            <div className="space-y-1">
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold">Your Score Outcome</div>
              <div className="text-5xl font-mono font-extrabold text-white">
                {score} <span className="text-slate-600 text-2xl font-light">/ {quizQuestions.length}</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
              {getScoreMessage(Math.round((score / quizQuestions.length) * 100)).desc}
            </p>

            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            >
              <RefreshCw size={14} />
              Retake Quiz
            </button>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h4 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider text-left pl-2">
              Detailed Question Review
            </h4>

            <div className="space-y-3">
              {quizQuestions.map((q, idx) => {
                const log = answersLog.find((l) => l.questionId === q.id);
                const isCorrect = log ? log.isCorrect : false;
                const userChoice = log ? log.selectedIndex : null;

                return (
                  <div key={q.id} className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 text-left space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h5 className="text-sm font-bold text-white leading-relaxed">
                        {idx + 1}. {q.question}
                      </h5>
                      <span className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={10} /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle size={10} /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    {/* Choices Review */}
                    <div className="text-xs space-y-1.5 pl-3 border-l-2 border-slate-800">
                      {q.options.map((opt, oIdx) => {
                        const correctAns = oIdx === q.answer;
                        const userAns = oIdx === userChoice;

                        let style = "text-slate-400";
                        if (correctAns) style = "text-emerald-400 font-semibold";
                        else if (userAns) style = "text-rose-400 line-through";

                        return (
                          <div key={oIdx} className={`flex items-center gap-1.5 ${style}`}>
                            <span>({String.fromCharCode(65 + oIdx)})</span>
                            <span>{opt}</span>
                            {correctAns && <span className="text-[10px] bg-emerald-500/15 px-1 py-0.5 rounded text-emerald-400 font-mono text-[9px] font-bold">Answer</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="text-[11px] text-slate-500 leading-relaxed font-sans bg-slate-900/30 p-2.5 rounded-lg border border-slate-900/60">
                      <span className="font-mono text-slate-400 font-bold uppercase text-[9px] block mb-0.5">Explanation</span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
