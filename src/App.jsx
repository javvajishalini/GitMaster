import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tutorials from "./pages/Tutorials";
import CommandReference from "./pages/CommandReference";
import Quiz from "./pages/Quiz";
import { GitProgressProvider, useGitProgress } from "./context/GitProgressContext";
import { Heart } from "lucide-react";

function AppContent() {
  const [activePage, setActivePage] = useState("home"); // home, tutorials, reference, quiz
  const [activeTutorialId, setActiveTutorialId] = useState("intro");
  const { toast } = useGitProgress();

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home 
            setActivePage={setActivePage} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
      case "tutorials":
        return (
          <Tutorials 
            activeTutorialId={activeTutorialId} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
      case "reference":
        return <CommandReference />;
      case "quiz":
        return <Quiz />;
      default:
        return (
          <Home 
            setActivePage={setActivePage} 
            setActiveTutorialId={setActiveTutorialId} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070a13]">
      {/* Top Header Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Routed Page Container */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* App Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 font-mono select-none">
        <div className="flex items-center justify-center gap-2 mb-1 text-slate-400">
          <span className="font-extrabold text-sm"><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500">Git</span><span className="text-white">Master</span></span>
          <span>Terminal Learning Sandbox</span>
        </div>
        <p className="flex items-center justify-center gap-1">
          Made for developers with <Heart size={10} className="text-rose-500 fill-rose-500" /> &copy; 2026. All rights reserved.
        </p>
      </footer>

      {/* Floating Toast Notification overlay */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-[100] max-w-xs md:max-w-sm p-4 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all duration-300 ${
          toast.type === "success"
            ? "bg-emerald-950/85 border-emerald-500/30 text-emerald-300"
            : "bg-slate-950/85 border-slate-800 text-indigo-300"
        }`}>
          <div className="shrink-0">
            {toast.type === "success" ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 flex items-center justify-center text-[10px] font-bold">✓</div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/35 flex items-center justify-center text-[10px] font-bold">i</div>
            )}
          </div>
          <p className="text-xs font-semibold font-sans">{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GitProgressProvider>
      <AppContent />
    </GitProgressProvider>
  );
}
