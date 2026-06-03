import React from "react";
import { COMMAND_TOOLTIPS } from "../data/commandTooltips";

export default function CommandTooltip({ command }) {
  if (!command) return null;
  const tip = COMMAND_TOOLTIPS[command];
  if (!tip) return null;
  return (
    <div className="absolute bottom-full mb-1 left-0 w-max max-w-xs p-3 rounded-xl bg-[color:var(--bg-footer)]/80 backdrop-blur-md shadow-lg border border-[color:var(--border-footer)] text-[color:var(--text-body)] text-xs animate-fade-in">
      <p className="font-medium">{tip.title}</p>
      <p className="mt-1">{tip.description}</p>
      {tip.flags && <p className="mt-1 opacity-70">Flags: {tip.flags}</p>}
    </div>
  );
}
