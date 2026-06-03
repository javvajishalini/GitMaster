import React from "react";
import { Heart, BookOpen, Clipboard, Award, Home, ChevronRight } from "lucide-react";

function GitHubIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
      />
    </svg>
  );
}

const GITHUB_REPO_URL = "https://github.com/javvajishalini/GitMaster";

const PROJECT_DESCRIPTION =
  "Learn Git interactively in a sandboxed browser terminal. Practice commands, follow tutorials, and track your progress.";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "tutorials", label: "Tutorials", icon: BookOpen },
  { id: "reference", label: "Command Reference", icon: Clipboard },
  { id: "quiz", label: "Quiz Arena", icon: Award },
];

function GitMasterLogo({ className = "text-xl" }) {
  return (
    <span className={`font-extrabold tracking-tight select-none ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500">
        Git
      </span>
      <span className="text-white">Master</span>
    </span>
  );
}

export default function Footer({ setActivePage }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId) => {
    if (setActivePage) {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {/* Brand & description */}
          <div className="space-y-3 text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <GitMasterLogo />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-indigo-400/90 bg-indigo-600/10 border border-indigo-500/25 px-2 py-0.5 rounded-full w-fit mx-auto sm:mx-0">
                Terminal Learning Sandbox
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
              {PROJECT_DESCRIPTION}
            </p>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/30 px-4 py-2 rounded-xl transition-all duration-200 group"
            >
              <GitHubIcon size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
              View on GitHub
              <ChevronRight size={12} className="text-slate-500 group-hover:text-indigo-400/80" />
            </a>
          </div>

          {/* Site navigation */}
          <nav
            className="text-center sm:text-left"
            aria-label="Footer navigation"
          >
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 px-2 py-1.5 rounded-lg transition-colors"
                    >
                      <Icon size={14} className="shrink-0 text-slate-500" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick links */}
          <div className="text-center sm:text-left">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Project
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  Repository
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  Report an issue
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center">
          <p className="flex flex-wrap items-center justify-center gap-1 text-[11px] sm:text-xs text-slate-500 font-mono">
            <GitMasterLogo className="text-sm" />
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              Made for developers with{" "}
              <Heart size={10} className="text-rose-500 fill-rose-500" aria-hidden="true" />
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span>&copy; {currentYear} GitMaster. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
