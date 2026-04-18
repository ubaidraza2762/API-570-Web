import React, { useState, useEffect } from "react";
import { 
  FileText, 
  LayoutDashboard, 
  BookOpen, 
  Plus, 
  Trash2,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Exam, 
  Question, 
  ExamAttempt, 
  ExamMode 
} from "./types";
import { cn } from "./lib/utils";
import { INITIAL_EXAMS } from "./data/exams";

// --- Sub-Components ---
import { Dashboard } from "./components/Dashboard";
import { ExamBrowser } from "./components/ExamBrowser";
import { ManageExams } from "./components/ManageExams";
import { ActiveExam } from "./components/ActiveExam";
import { ResultsView } from "./components/ResultsView";
import { Settings } from "./components/Settings";

// --- Utilities ---
const generateDummyQuestions = (count: number, prefix: string): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-dummy-${i + 1}`,
    text: `Sample Question ${i + 1} for ${prefix}. (Actual question data for this set is currently being updated in the system)`,
    options: ["Option A (Sample Choice)", "Option B (Sample Choice)", "Option C (Sample Choice)", "Option D (Sample Choice)"],
    correctAnswer: 0,
    hint: "This is a placeholder hint for the sample question."
  }));
};






export default function App() {
  const [view, setView] = useState<"dashboard" | "exams" | "manage" | "active-exam" | "results" | "history-detail" | "settings">("dashboard");
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("app_theme") as "light" | "dark" | "system") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // Handle system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const [exams, setExams] = useState<Exam[]>(() => {
    // 1. Prepare standard default exams from code constants
    const defaultExams = INITIAL_EXAMS.map(e => ({ ...e, isDefault: true }));
    
    try {
      const saved = localStorage.getItem("api_exams");
      if (!saved) return defaultExams;
      
      const parsed: Exam[] = JSON.parse(saved);
      if (!Array.isArray(parsed)) return defaultExams;

      // 2. Identify which exams in localStorage are "User Added" (not in INITIAL_EXAMS)
      const defaultIds = new Set(INITIAL_EXAMS.map(e => e.id));
      const userExams = parsed.filter(e => !defaultIds.has(e.id));
      
      // 3. Return the fresh default exams combined with existing user exams
      // This ensures that if we update question data in code, it reflects immediately
      // while preserving any exams the user manually created.
      return [...defaultExams, ...userExams];
    } catch {
      return defaultExams;
    }
  });

  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem("api_attempts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onSelection: (confirmed: boolean) => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onSelection: () => {}
  });

  const confirmAction = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmation({
        isOpen: true,
        title,
        message,
        onSelection: (confirmed) => {
          setConfirmation(prev => ({ ...prev, isOpen: false }));
          resolve(confirmed);
        }
      });
    });
  };

  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [activeAttempt, setActiveAttempt] = useState<ExamAttempt | null>(null);
  const [examMode, setExamMode] = useState<ExamMode>("Standard");
  const [lastResult, setLastResult] = useState<ExamAttempt | null>(null);
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    localStorage.setItem("api_exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("api_attempts", JSON.stringify(attempts));
  }, [attempts]);

  const startExam = (exam: Exam, mode: ExamMode) => {
    setCurrentExam(exam);
    setExamMode(mode);
    const newAttempt: ExamAttempt = {
      id: crypto.randomUUID(),
      examId: exam.id,
      mode: mode,
      date: new Date().toLocaleString(),
      score: 0,
      total: exam.questions.length,
      answers: {},
      flags: {}
    };
    setActiveAttempt(newAttempt);
    setView("active-exam");
  };

  const endExam = (attempt: ExamAttempt, timeTaken: number, isCompleted: boolean = true) => {
    const exam = exams.find(e => e.id === attempt.examId);
    if (!exam) return;

    if (!isCompleted) {
      setActiveAttempt(null);
      setCurrentExam(null);
      setView("exams");
      return;
    }

    let correct = 0;
    exam.questions.forEach(q => {
      const userAns = attempt.answers[q.id];
      if (userAns === undefined) return;

      if (q.type === "multiple") {
        if (Array.isArray(userAns)) {
          const correctAns = (q.correctAnswer as number[]) || [];
          if (userAns.length === correctAns.length && userAns.every(val => correctAns.includes(val))) {
            correct++;
          }
        }
      } else if (q.type === "matching") {
        const pairs = q.matchingPairs || [];
        const userMapping = userAns as Record<number, number>;
        let allCorrect = Object.keys(userMapping).length === pairs.length;
        if (allCorrect) {
          for (let i = 0; i < pairs.length; i++) {
            // We assume the initial matchingPairs order defines the correct mapping: left[i] matches right[i]
            // However, the items might have been shuffled.
            // Actually, we'll store the original indices in the matching interface if needed.
            // For now, let's assume the components will handle presenting shuffles but return the original indices.
            if (userMapping[i] !== i) {
              allCorrect = false;
              break;
            }
          }
          if (allCorrect) correct++;
        }
      } else {
        if (userAns === q.correctAnswer) correct++;
      }
    });

    const scorePct = exam.questions.length > 0 ? Math.round((correct / exam.questions.length) * 100) : 0;
    const finalized: ExamAttempt = { ...attempt, score: scorePct, timeTaken, completed: true };

    setAttempts([finalized, ...attempts]);
    setLastResult(finalized);
    setView("results");
    setActiveAttempt(null);
  };

  const showHistoryDetail = (attempt: ExamAttempt) => {
    setSelectedAttempt(attempt);
    setView("history-detail");
  };

  const handleExportData = () => {
    const data = {
      exams,
      attempts,
      version: "2.4.0",
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api_exam_database_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (re) => {
        try {
          const content = re.target?.result as string;
          const data = JSON.parse(content);
          if (Array.isArray(data.exams)) {
            const confirmed = await confirmAction("Import Database", "This will merge the imported exams with your current database. Continue?");
            if (confirmed) {
              // Merge logic: avoid duplicate IDs
              const existingIds = new Set(exams.map(e => e.id));
              const newExams = data.exams.filter((e: Exam) => !existingIds.has(e.id));
              setExams([...exams, ...newExams]);
              if (Array.isArray(data.attempts)) {
                const existingAttemptIds = new Set(attempts.map(a => a.id));
                const newAttempts = data.attempts.filter((a: ExamAttempt) => !existingAttemptIds.has(a.id));
                setAttempts([...attempts, ...newAttempts]);
              }
            }
          }
        } catch (err) {
          console.error("Failed to import data:", err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-bg text-text-primary pb-20 md:pb-0 relative overflow-hidden">
      {/* Sidebar Navigation - Simplified Professional Design */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:w-24 glass-panel flex flex-row md:flex-col items-center justify-around md:justify-start p-2 md:py-8 z-[150] md:h-screen shrink-0 border-t md:border-t-0 md:border-r border-border">
        <div 
          onClick={() => setView("dashboard")} 
          className="w-12 h-12 bg-accent text-white rounded-xl cursor-pointer hover:bg-accent-hover active:scale-95 transition-all shadow-lg flex items-center justify-center shrink-0 mb-0 md:mb-12"
        >
          <FileText size={20} />
        </div>
        
        <div className="flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-4 flex-1 justify-center md:flex-none">
          <button 
            title="Dashboard" 
            onClick={() => setView("dashboard")} 
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all relative group", 
              view === "dashboard" ? "text-accent bg-accent/5" : "text-text-secondary hover:text-text-primary hover:bg-accent/5"
            )}
          >
            <LayoutDashboard size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block">Dashboard</span>
            {view === "dashboard" && <motion.div layoutId="active-nav" className="absolute -left-0 md:left-auto md:-right-3 top-0 md:top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-full hidden md:block" />}
          </button>
          <button 
            title="Exams" 
            onClick={() => setView("exams")} 
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all relative group", 
              view === "exams" || view === "results" ? "text-accent bg-accent/5" : "text-text-secondary hover:text-text-primary hover:bg-accent/5"
            )}
          >
            <BookOpen size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block">Exams</span>
            {(view === "exams" || view === "results") && <motion.div layoutId="active-nav" className="absolute -left-0 md:left-auto md:-right-3 top-0 md:top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-full hidden md:block" />}
          </button>
          <button 
            title="Manage" 
            onClick={() => setView("manage")} 
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all relative group", 
              view === "manage" ? "text-accent bg-accent/5" : "text-text-secondary hover:text-text-primary hover:bg-accent/5"
            )}
          >
            <Plus size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block">Manage</span>
            {view === "manage" && <motion.div layoutId="active-nav" className="absolute -left-0 md:left-auto md:-right-3 top-0 md:top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-full hidden md:block" />}
          </button>
        </div>
        
        <div className="md:mt-auto flex flex-col items-center gap-4">
          <button 
            title="Settings" 
            onClick={() => setView("settings")} 
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all relative group mb-0 md:mb-4", 
              view === "settings" ? "text-accent bg-accent/5" : "text-text-secondary hover:text-text-primary hover:bg-accent/5"
            )}
          >
            <SettingsIcon size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block">Settings</span>
            {view === "settings" && <motion.div layoutId="active-nav" className="absolute -left-0 md:left-auto md:-right-3 top-0 md:top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-full hidden md:block" />}
          </button>
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-[10px]">UR</div>
        </div>
      </nav>

      {/* Main Content Pane */}
      <main className="flex-grow p-4 sm:p-6 lg:p-12 overflow-x-hidden relative md:flex-row flex flex-col z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Heading Bar */}
          <header className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">
                {view === "dashboard" ? "Dashboard" : 
                 view === "exams" ? "Exams Catalog" : 
                 view === "manage" ? "Database" : 
                 view === "settings" ? "Settings" :
                 view === "active-exam" ? "Live Session" : 
                 view === "results" ? "Results Summary" : 
                 view === "history-detail" ? "History Detail" : "System Overlay"}
              </h2>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight font-display">
                {view === "dashboard" ? "Dashboard Overview" : 
                 view === "exams" ? "Study & Practice" : 
                 view === "manage" ? "Database Control" : 
                 view === "settings" ? "Configuration" :
                 view === "active-exam" ? "Assessment in Progress" :
                 view === "results" ? "Exam Summary" : 
                 view === "history-detail" ? "Historical Result" : "Application View"}
              </h1>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {view === "dashboard" && <Dashboard exams={exams} attempts={attempts} onViewManage={() => setView("manage")} onSelectAttempt={showHistoryDetail} />}
              {view === "exams" && <ExamBrowser exams={exams} onStartExam={startExam} />}
              {view === "manage" && <ManageExams exams={exams} onUpdateExams={setExams} confirmAction={confirmAction} />}
              {view === "settings" && <Settings theme={theme} onThemeChange={setTheme} onImportData={handleImportData} />}
              {view === "results" && lastResult && <ResultsView lastResult={lastResult} exams={exams} onViewExams={() => setView("exams")} onViewDashboard={() => setView("dashboard")} />}
              {view === "history-detail" && selectedAttempt && <ResultsView lastResult={selectedAttempt} exams={exams} onViewExams={() => setView("exams")} onViewDashboard={() => setView("dashboard")} isHistory />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Active Exam Component (Overlay) */}
      <AnimatePresence>
        {view === "active-exam" && currentExam && activeAttempt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000]">
            <ActiveExam 
              currentExam={currentExam} 
              activeAttempt={activeAttempt} 
              examMode={examMode} 
              onUpdateAttempt={setActiveAttempt}
              onEndExam={endExam}
              confirmAction={confirmAction}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Confirmation Modal */}
      <AnimatePresence>
        {confirmation.isOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => confirmation.onSelection(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-bg-panel border border-border rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6"><Trash2 size={32} /></div>
              <h3 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">{confirmation.title}</h3>
              <p className="text-text-secondary mb-8 text-sm leading-relaxed">{confirmation.message}</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => confirmation.onSelection(false)} className="px-6 py-3 rounded-xl bg-bg border border-border text-text-secondary font-bold text-xs uppercase tracking-wider hover:bg-bg-panel transition-all">Cancel</button>
                <button onClick={() => confirmation.onSelection(true)} className="px-6 py-3 rounded-xl bg-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
