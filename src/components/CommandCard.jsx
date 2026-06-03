import React, { useState } from "react";
import { Copy, Check, Terminal, Info } from "lucide-react";

export default function CommandCard({ command }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.syntax);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Setup": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Basic Snapshotting": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Inspection & Comparison": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Branching & Merging": return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Sharing & Updating": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 transition-all duration-200 group overflow-hidden">
      {/* Header info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(command.category)}`}>
              {command.category}
            </span>
            
            <button
              onClick={handleCopy}
              className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              title="Copy Syntax to Clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5 font-mono">
            <Terminal size={16} className="text-indigo-400" />
            {command.name}
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            {command.description}
          </p>
        </div>

        {/* Syntax panel */}
        <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-3.5 relative overflow-x-auto">
          <span className="absolute right-2 top-2 text-[9px] font-mono text-slate-600 font-semibold uppercase">Syntax</span>
          <code className="text-indigo-300 font-mono text-xs whitespace-pre-wrap block pr-8">
            {command.syntax}
          </code>
        </div>
      </div>

      {/* Code Example Preview */}
      {command.example && (
        <div className="bg-slate-900/20 border-t border-slate-900/50 p-4">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mb-1.5 uppercase font-semibold">
            <Info size={11} /> Example Usage
          </div>
          <pre className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-900/80 overflow-x-auto">
            {command.example}
          </pre>
        </div>
      )}
    </div>
  );
}
