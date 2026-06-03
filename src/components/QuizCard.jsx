import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Lightbulb } from "lucide-react";

export default function QuizCard({ question, questionNumber, totalQuestions, onAnswerSelected, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionClick = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    onAnswerSelected(idx === question.answer, idx);
  };

  const handleNext = () => {
    if (onNext) onNext();
  };

  return (
    <div className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Quiz Progress header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600/10 text-indigo-400 text-xs px-2.5 py-1 rounded-lg border border-indigo-500/20 font-bold font-mono">
            QUESTION {questionNumber} / {totalQuestions}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">Git Fundamentals Quiz</span>
      </div>

      {/* Question text */}
      <div className="text-left">
        <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed flex items-start gap-2.5">
          <HelpCircle size={24} className="text-indigo-400 shrink-0 mt-0.5" />
          {question.question}
        </h2>
      </div>

      {/* Options grid */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => {
          const isCorrectAnswer = idx === question.answer;
          const isUserSelection = idx === selectedOption;
          
          let btnStyle = "border-slate-800 bg-slate-900/30 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";
          let icon = null;

          if (isSubmitted) {
            if (isCorrectAnswer) {
              btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold";
              icon = <CheckCircle2 size={16} className="text-emerald-400" />;
            } else if (isUserSelection) {
              btnStyle = "border-rose-500 bg-rose-500/10 text-rose-300 font-semibold";
              icon = <XCircle size={16} className="text-rose-400" />;
            } else {
              btnStyle = "border-slate-900 bg-slate-950/20 text-slate-600 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleOptionClick(idx)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left text-sm transition-all duration-200 ${btnStyle}`}
            >
              <div className="flex items-center gap-3 pr-2">
                <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center border shrink-0 ${
                  isUserSelection
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation panel */}
      {isSubmitted && (
        <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-2xl p-4 text-left animate-pulse-soft space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold uppercase mb-1 tracking-wider">
              <Lightbulb size={14} />
              Explanation Note
            </div>
            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              {question.explanation}
            </p>
          </div>
          
          <div className="flex justify-end border-t border-indigo-900/30 pt-3">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            >
              {questionNumber < totalQuestions ? "Next Question" : "See Quiz Results"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
