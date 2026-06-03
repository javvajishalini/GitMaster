import React, { useState, useMemo } from "react";
import { commands } from "../data/commands";
import CommandCard from "../components/CommandCard";
import { Search, Filter, ClipboardList, RefreshCw } from "lucide-react";

export default function CommandReference() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(commands.map((cmd) => cmd.category));
    return ["All", ...list];
  }, []);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesSearch =
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || cmd.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header section */}
      <div className="text-left max-w-2xl">
        <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono uppercase font-bold tracking-wider mb-2">
          <ClipboardList size={14} />
          Reference Sheets
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
          Git Command Reference
        </h2>
        <p className="text-slate-400 text-xs md:text-sm">
          A quick-lookup reference cheat sheet for the most common Git snapshotting, staging, inspection, and syncing commands.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950/40 p-4 border border-slate-900 rounded-2xl">
        {/* Search Input */}
        <div className="relative w-full md:max-w-sm">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search commands (e.g. init, add, log)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 transition-all focus:outline-none"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
          <span className="text-[10px] text-slate-500 font-mono uppercase mr-2 flex items-center gap-1">
            <Filter size={11} /> Filter By:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommands.map((cmd) => (
            <CommandCard key={cmd.name} command={cmd} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-950/20 border border-slate-900/60 rounded-3xl space-y-3">
          <p className="text-slate-400 text-sm">No Git commands found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <RefreshCw size={12} />
            Reset all search filters
          </button>
        </div>
      )}
    </div>
  );
}
