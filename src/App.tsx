import React, { useState, useEffect } from "react";
import { 
  FileText, 
  LayoutDashboard, 
  BookOpen, 
  Plus, 
  Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Exam, 
  Question, 
  ExamAttempt, 
  ExamMode 
} from "./types";
import { cn } from "./lib/utils";
import { API_570_CBQ_AUG_2025 } from "./data/cbq_questions";
import { API_570_OBQ_AUG_2025 } from "./data/obq_questions";
import { API_570_CALC_FEB_2025 } from "./data/calc_questions";
import { API_570_MULTI_AUG_2025 } from "./data/multi_choice_aug25";
import { API_570_JULY_2024_FINAL } from "./data/july24_questions";
import { API_570_REV1_FEB_2023 } from "./data/rev1_feb23_questions";
import { API_570_REV2_FEB_2023 } from "./data/rev2_feb23_questions";
import { API_570_REV3_FEB_2023 } from "./data/rev3_feb23_questions";
import { API_570_IMP_OB_SET2 } from "./data/imp_ob_set2_questions";
import { API_570_IMP_CB_SET2 } from "./data/imp_cb_set2_questions";
import { API_570_IMQB_CB_SET1 } from "./data/imqb_cb_set1_questions";
import { API_570_IMQB_OB_SET1 } from "./data/imqb_ob_set1_questions";
import { API_570_IMQB_OPEN } from "./data/imqb_open_questions";
import { API_570_PCC2_JAN_26 } from "./data/pcc2_jan26_questions";
import { API_570_B313_QB_2025 } from "./data/b313_qb_2025_questions";
import { API_570_QB2_2025 } from "./data/qb2_2025_questions";
import { API_574_QB_2025 } from "./data/api_574_qb_2025_questions";
import { API_570_QB1_2025 } from "./data/qb1_2025_questions";
import { API_571_CB_24_QUESTIONS } from "./data/571_cb_24_questions";
import { API_571_OB_24_QUESTIONS } from "./data/571_ob_24_questions";
import { API_576_JUNE23_QUESTIONS } from "./data/576_june23_questions";
import { PCC2_2024_QUESTIONS } from "./data/pcc2_2024_questions";
import { API_578_QUESTIONS } from "./data/api_578_questions";
import { API_577_OB_2024_QUESTIONS } from "./data/577_ob_2024_questions";
import { API_577_CB_2024_QUESTIONS } from "./data/577_cb_2024_questions";
import { ASME_SEC_V_OB_2024_QUESTIONS } from "./data/asme_sec_v_ob_2024_questions";
import { ASME_SEC_V_CB_2024_QUESTIONS } from "./data/asme_sec_v_cb_2024_questions";
import { ASME_SEC_IX_2024_QUESTIONS } from "./data/asme_sec_ix_2024_questions";
import { B165_QUESTIONS } from "./data/b165_questions";

// --- Sub-Components ---
import { Dashboard } from "./components/Dashboard";
import { ExamBrowser } from "./components/ExamBrowser";
import { ManageExams } from "./components/ManageExams";
import { ActiveExam } from "./components/ActiveExam";
import { ResultsView } from "./components/ResultsView";

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

const INITIAL_EXAMS: Exam[] = [
  // Group 1: API 570 Final Exam
  {
    id: "aug25-cbq",
    title: "570 NEW QUS CLOSED BOOK AUG-2025",
    year: "2025",
    category: "Close Book",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_CBQ_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "aug25-obq",
    title: "570 NEW QUS OPEN BOOK AUG-2025",
    year: "2025",
    category: "Open Book",
    bookType: "Open Book",
    duration: 60,
    questions: API_570_OBQ_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "aug25-mcq",
    title: "API 570 MULTI CHOICE QUESTIONS AUG-2025",
    year: "2025",
    category: "MCQ",
    bookType: "Close Book",
    duration: 33,
    questions: API_570_MULTI_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "july24-final",
    title: "API 570 FINAL EXAM JULY 24",
    year: "2024",
    category: "Final",
    bookType: "Close Book",
    duration: 83,
    questions: API_570_JULY_2024_FINAL,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev3",
    title: "API 570 REVIEW-3 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 60,
    questions: API_570_REV3_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev2",
    title: "API 570 REVIEW-2 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 50,
    questions: API_570_REV2_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "feb25-calc",
    title: "API 570 Calculations FEB-2025",
    year: "2025",
    category: "Calculations",
    bookType: "Open Book",
    duration: 60,
    questions: API_570_CALC_FEB_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev1",
    title: "API 570 REVIEW-1 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 60,
    questions: API_570_REV1_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-open",
    title: "API 570IMQB OPEN BOOK",
    year: "2023",
    category: "Open Book",
    bookType: "Open Book",
    duration: 50,
    questions: API_570_IMQB_OPEN,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-cb-set1-2021",
    title: "API 570-IMQB-CLOSEBOOK SET-1 2021",
    year: "2021",
    category: "Close Book",
    bookType: "Close Book",
    duration: 83,
    questions: API_570_IMQB_CB_SET1,
    group: "API 570 Final Exam"
  },
  {
    id: "imp-qb-cb-set2",
    title: "API 570 IMP QB-Close Book Set-2",
    year: "2023",
    category: "Close Book",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_IMP_CB_SET2,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-ob-set1-2021",
    title: "API 570-IMQB-OPENBOOK SET-1 2021",
    year: "2021",
    category: "Open Book",
    bookType: "Open Book",
    duration: 50,
    questions: API_570_IMQB_OB_SET1,
    group: "API 570 Final Exam"
  },
  {
    id: "imp-qb-ob-set2",
    title: "API 570 IMP QB-Open Book Set-2",
    year: "2023",
    category: "Open Book",
    bookType: "Open Book",
    duration: 67,
    questions: API_570_IMP_OB_SET2,
    group: "API 570 Final Exam"
  },

  // Group 2: API 570 Main Code
  {
    id: "pcc2-jan26",
    title: "PCC-2 ADD.QUS JAN-26 For 570",
    year: "2026",
    category: "Add Qus",
    bookType: "Open Book",
    duration: 150,
    questions: API_570_PCC2_JAN_26,
    group: "API 570 Main Code"
  },
  {
    id: "b313-qb-2025",
    title: "ASME B31.3 QB-2025",
    year: "2025",
    category: "QB",
    bookType: "Open Book",
    duration: 83,
    questions: API_570_B313_QB_2025,
    group: "API 570 Main Code"
  },
  {
    id: "qb2-2025",
    title: "API 570 QB-2 2025",
    year: "2025",
    category: "QB",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_QB2_2025,
    group: "API 570 Main Code"
  },
  {
    id: "574-qb-2025",
    title: "API 574 QB-2025 FOR API 570",
    year: "2025",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_574_QB_2025,
    group: "API 570 Main Code"
  },
  {
    id: "qb1-2025",
    title: "API 570 QB-1 2025",
    year: "2025",
    category: "QB",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_QB1_2025,
    group: "API 570 Main Code"
  },
  {
    id: "571-cb-24",
    title: "571 CB-API570-24",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 60,
    questions: API_571_CB_24_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "571-ob-24",
    title: "571 OB-API570-24",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 100,
    questions: API_571_OB_24_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "576-june23",
    title: "API 576 JUNE-23 FOR 570",
    year: "2023",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_576_JUNE23_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "pcc2-2024",
    title: "ASME PCC-2 API 570 2024",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 90,
    questions: PCC2_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "578-510-570",
    title: "API 578-510 570",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_578_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "577-ob-2024",
    title: "577 OB-2024",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 90,
    questions: API_577_OB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "577-cb-2024",
    title: "API 577 CB 2024",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 83,
    questions: API_577_CB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secv-ob-2024",
    title: "ASME SEC-V OB 2024",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 60,
    questions: ASME_SEC_V_OB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secv-cb-2024",
    title: "ASME SEC- V CB-2024",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 30,
    questions: ASME_SEC_V_CB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secix-2024",
    title: "ASME SEC-IX 2024",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 67,
    questions: ASME_SEC_IX_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "b165",
    title: "B16.5",
    year: "2015", // Estimated or taken from screenshot if visible
    category: "Standard",
    bookType: "Open Book",
    duration: 67,
    questions: B165_QUESTIONS,
    group: "API 570 Main Code"
  }
];

export default function App() {
  const [view, setView] = useState<"dashboard" | "exams" | "manage" | "active-exam" | "results" | "history-detail">("dashboard");
  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem("api_exams");
      if (!saved) return INITIAL_EXAMS;
      const parsed: Exam[] = JSON.parse(saved);
      const hasCbq = parsed.some(e => e.id === "aug25-cbq");
      const hasObq = parsed.some(e => e.id === "aug25-obq");
      const hasCalc = parsed.some(e => e.id === "feb25-calc" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasMulti = parsed.some(e => e.id === "aug25-mcq" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasJuly24 = parsed.some(e => e.id === "july24-final" && e.questions.length > 50 && !e.questions[0].id.includes("dummy"));
      const hasRev1 = parsed.some(e => e.id === "feb23-rev1" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasRev2 = parsed.some(e => e.id === "feb23-rev2" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasRev3 = parsed.some(e => e.id === "feb23-rev3" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasImpObSet2 = parsed.some(e => e.id === "imp-qb-ob-set2" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasImpCbSet2 = parsed.some(e => e.id === "imp-qb-cb-set2" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasImqbCbSet1 = parsed.some(e => e.id === "imqb-cb-set1-2021" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasImqbObSet1 = parsed.some(e => e.id === "imqb-ob-set1-2021" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasImqbOpen = parsed.some(e => e.id === "imqb-open" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasPcc2Jan26 = parsed.some(e => e.id === "pcc2-jan26" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasB313Qb2025 = parsed.some(e => e.id === "b313-qb-2025" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasQb22025 = parsed.some(e => e.id === "qb2-2025" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has574Qb2025 = parsed.some(e => e.id === "574-qb-2025" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasQb12025 = parsed.some(e => e.id === "qb1-2025" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has571Cb24 = parsed.some(e => e.id === "571-cb-24" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has571Ob24 = parsed.some(e => e.id === "571-ob-24" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has576June23 = parsed.some(e => e.id === "576-june23" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasPcc22024 = parsed.some(e => e.id === "pcc2-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has578 = parsed.some(e => e.id === "578-510-570" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has577Ob2024 = parsed.some(e => e.id === "577-ob-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const has577Cb2024 = parsed.some(e => e.id === "577-cb-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasAsmeSecVOb2024 = parsed.some(e => e.id === "secv-ob-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasAsmeSecVCb2024 = parsed.some(e => e.id === "secv-cb-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasAsmeSecIX2024 = parsed.some(e => e.id === "secix-2024" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const hasB165 = parsed.some(e => e.id === "b165" && e.questions.length > 0 && !e.questions[0].id.includes("dummy"));
      const isOutdated = parsed.length < INITIAL_EXAMS.length;

      if (!hasCbq || !hasObq || !hasCalc || !hasMulti || !hasJuly24 || !hasRev1 || !hasRev2 || !hasRev3 || !hasImpObSet2 || !hasImpCbSet2 || !hasImqbCbSet1 || !hasImqbObSet1 || !hasImqbOpen || !hasPcc2Jan26 || !hasB313Qb2025 || !hasQb22025 || !has574Qb2025 || !hasQb12025 || !has571Cb24 || !has571Ob24 || !has576June23 || !hasPcc22024 || !has578 || !has577Ob2024 || !has577Cb2024 || !hasAsmeSecVOb2024 || !hasAsmeSecVCb2024 || !hasAsmeSecIX2024 || !hasB165 || isOutdated) {
        return INITIAL_EXAMS;
      }
      return parsed;
    } catch {
      return INITIAL_EXAMS;
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

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-api-gold selection:text-api-navy bg-api-gray pb-20 md:pb-0">
      {/* Sidebar Navigation - Responsive */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:w-24 bg-api-navy flex flex-row md:flex-col items-center justify-around md:justify-between p-2 md:py-8 z-[150] shadow-[0_-4px_20px_rgba(0,0,0,0.2)] md:shadow-2xl md:shadow-blue-900/40 md:h-screen shrink-0 border-t md:border-t-0 md:border-r border-white/5 backdrop-blur-lg bg-api-navy/95 md:bg-api-navy">
        <div onClick={() => setView("dashboard")} className="p-3 bg-white rounded-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-lg shadow-black/20 hidden md:flex shrink-0">
          <FileText className="text-api-navy" size={24} />
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 sm:gap-4 md:gap-8 mt-0 md:mt-10 flex-1 justify-center md:flex-none">
          <button 
            title="Dashboard" 
            onClick={() => setView("dashboard")} 
            className={cn(
              "p-3 rounded-2xl transition-all relative group", 
              view === "dashboard" ? "bg-api-gold text-api-navy shadow-md shadow-yellow-900/20" : "text-white/20 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <LayoutDashboard size={22} />
            {view === "dashboard" && <motion.div layoutId="active-nav" className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-api-gold rounded-full hidden md:block" />}
          </button>
          <button 
            title="Exams" 
            onClick={() => setView("exams")} 
            className={cn(
              "p-3 rounded-2xl transition-all relative group", 
              view === "exams" || view === "results" ? "bg-api-gold text-api-navy shadow-md shadow-yellow-900/20" : "text-white/20 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <BookOpen size={22} />
            {(view === "exams" || view === "results") && <motion.div layoutId="active-nav" className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-api-gold rounded-full hidden md:block" />}
          </button>
          <button 
            title="Manage" 
            onClick={() => setView("manage")} 
            className={cn(
              "p-3 rounded-2xl transition-all relative group", 
              view === "manage" ? "bg-api-gold text-api-navy shadow-md shadow-yellow-900/20" : "text-white/20 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <Plus size={22} />
            {view === "manage" && <motion.div layoutId="active-nav" className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-api-gold rounded-full hidden md:block" />}
          </button>
        </div>
        
        <div className="md:mt-auto">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-api-gold text-sm shadow-inner">UR</div>
        </div>
      </nav>

      {/* Main Content Pane */}
      <main className="flex-grow p-4 sm:p-6 lg:p-10 overflow-x-hidden relative md:flex-row flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {view === "dashboard" && <Dashboard exams={exams} attempts={attempts} onViewManage={() => setView("manage")} onSelectAttempt={showHistoryDetail} />}
              {view === "exams" && <ExamBrowser exams={exams} onStartExam={startExam} />}
              {view === "manage" && <ManageExams exams={exams} onUpdateExams={setExams} confirmAction={confirmAction} />}
              {view === "results" && lastResult && <ResultsView lastResult={lastResult} exams={exams} onViewExams={() => setView("exams")} onViewDashboard={() => setView("dashboard")} />}
              {view === "history-detail" && selectedAttempt && <ResultsView lastResult={selectedAttempt} exams={exams} onViewExams={() => setView("exams")} onViewDashboard={() => setView("dashboard")} isHistory />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Active Exam Overlay */}
      <AnimatePresence>
        {view === "active-exam" && currentExam && activeAttempt && (
          <ActiveExam 
            currentExam={currentExam} 
            activeAttempt={activeAttempt} 
            examMode={examMode}
            onUpdateAttempt={setActiveAttempt}
            onEndExam={endExam}
            confirmAction={confirmAction}
          />
        )}
      </AnimatePresence>

      {/* Global Confirmation Modal */}
      <AnimatePresence>
        {confirmation.isOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-api-navy/80 backdrop-blur-sm" onClick={() => confirmation.onSelection(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-huge p-10 max-w-sm w-full shadow-2xl relative z-10 text-center">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><Trash2 size={40} /></div>
              <h3 className="text-2xl font-black text-api-navy mb-3 uppercase tracking-tighter">{confirmation.title}</h3>
              <p className="text-gray-500 mb-10 text-sm font-bold">{confirmation.message}</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => confirmation.onSelection(false)} className="px-6 py-4 rounded-3xl bg-gray-100 text-api-navy font-black text-[10px] uppercase tracking-widest">Discard</button>
                <button onClick={() => confirmation.onSelection(true)} className="px-6 py-4 rounded-3xl bg-red-600 text-white font-black hover:bg-red-700 shadow-xl shadow-red-200 text-[10px] uppercase tracking-widest">Execute</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 51, 102, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 51, 102, 0.2); }
      `}</style>
    </div>
  );
}
