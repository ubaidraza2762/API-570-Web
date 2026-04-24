import React, { useState, useEffect, useRef } from "react";
import { 
  Clock, 
  FileText, 
  Settings, 
  LayoutGrid, 
  HelpCircle, 
  MessageSquare, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Calculator, 
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Image as ImageIcon,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Exam, Question, ExamAttempt, ExamMode } from "../types";
import { cn } from "../lib/utils";
import { APIExamCalculator } from "./Calculator";

interface ActiveExamProps {
  currentExam: Exam;
  activeAttempt: ExamAttempt;
  examMode: ExamMode;
  onUpdateAttempt: (attempt: ExamAttempt) => void;
  onEndExam: (attempt: ExamAttempt, timeTaken: number) => void;
  confirmAction: (title: string, message: string) => Promise<boolean>;
}

const CommentModal: React.FC<{ 
  onClose: () => void; 
}> = ({ onClose }) => (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={onClose} />
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-bg-panel border border-border rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl">
      <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3 tracking-tight"><MessageSquare className="text-accent" /> Add Note</h3>
      <textarea className="w-full h-40 bg-bg border border-border p-5 rounded-xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent mb-6 font-medium text-text-primary placeholder:text-text-secondary/30" placeholder="Type your comment here..." />
      <div className="flex gap-4">
        <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-text-secondary hover:bg-bg transition-all">Cancel</button>
        <button onClick={onClose} className="flex-1 py-3 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-accent/20 hover:shadow-xl transition-all">Save Note</button>
      </div>
    </motion.div>
  </div>
);

interface SharedProps {
  currentExam: Exam;
  activeAttempt: ExamAttempt;
  examMode: ExamMode;
  currentIdx: number;
  setCurrentIdx: (idx: number) => void;
  timerValue: number;
  isCountDown: boolean;
  formatExamTimer: (sec: number) => string;
  confirmEnd: () => void;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;
  userAns: any;
  fadedOptions: number[];
  handleSelect: (idx: number) => void;
  handleMultiSelect: (idx: number) => void;
  handleMatchingSelect: (leftIdx: number, rightIdx: number) => void;
  toggleFlag: () => void;
  setIsCommentModalOpen: (open: boolean) => void;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  setFadedOptions: (options: number[]) => void;
  selectedLeft: number | null;
  setSelectedLeft: (val: number | null) => void;
  shuffledRights: { text: string, originalIdx: number }[];
  isCommentModalOpen: boolean;
  onEndExam: (attempt: ExamAttempt, timeTaken: number, isCompleted: boolean) => void;
  confirmAction: (title: string, message: string) => Promise<boolean>;
  elapsedTime: number;
}

const ExamOptions: React.FC<SharedProps> = (props) => {
  const { 
    currentExam, currentIdx, examMode, userAns, fadedOptions, 
    handleSelect, handleMultiSelect, handleMatchingSelect,
    selectedLeft, setSelectedLeft, shuffledRights
  } = props;
  
  const question = currentExam.questions[currentIdx];

  if (question.type === "matching") {
    const pairs = question.matchingPairs || [];
    const currentMapping = (userAns as Record<number, number>) || {};

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400 flex items-center gap-2">
            Categories
          </h4>
          {pairs.map((p, lIdx) => {
            const matchedRightIdx = currentMapping[lIdx];
            const isMatched = matchedRightIdx !== undefined;
            
            let isCorrect = false;
            let isWrong = false;
            if (examMode === "Hint" && isMatched) {
              isCorrect = matchedRightIdx === lIdx;
              isWrong = !isCorrect;
            }

            return (
              <button
                key={lIdx}
                onClick={() => setSelectedLeft(lIdx)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all flex items-center justify-between group relative overflow-hidden text-left",
                  selectedLeft === lIdx ? "border-blue-600 bg-blue-50 font-bold shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 shadow-sm",
                  isMatched && selectedLeft !== lIdx && "bg-blue-50/50",
                  isCorrect && "bg-green-600 border-green-600 text-white",
                  isWrong && "bg-red-600 border-red-600 text-white"
                )}
              >
                <div className="flex items-center gap-4">
                   <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold", 
                     (isCorrect || isWrong) ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
                   )}>
                     {lIdx + 1}
                   </div>
                   <span className={cn("text-slate-800 text-sm font-semibold", (isCorrect || isWrong) && "text-white font-bold")}>{p.left}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400 flex items-center gap-2">
            Definitions
          </h4>
          {shuffledRights.map((r, rShowIdx) => {
            const isMappedToSomething = Object.values(currentMapping).includes(r.originalIdx);
            const mappedLeftIdx = Object.keys(currentMapping).find(k => currentMapping[parseInt(k)] === r.originalIdx);
            
            return (
              <button
                key={rShowIdx}
                disabled={selectedLeft === null && !isMappedToSomething}
                onClick={() => selectedLeft !== null && handleMatchingSelect(selectedLeft, r.originalIdx)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all flex items-center justify-between group shadow-sm text-left min-h-[3.5rem]",
                  selectedLeft === null 
                    ? (isMappedToSomething ? "border-blue-400 bg-blue-50 opacity-70" : "opacity-40 grayscale cursor-not-allowed border-slate-200 bg-slate-50") 
                    : (isMappedToSomething ? "border-blue-600 bg-blue-100" : "border-slate-200 bg-white hover:border-blue-200"),
                  isMappedToSomething && "border-blue-500 bg-blue-50"
                )}
              >
                <span className="font-semibold text-slate-700 text-sm leading-snug">{r.text}</span>
                {isMappedToSomething && (
                  <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded-lg border border-blue-200 shadow-sm ml-4 shrink-0">
                    #{parseInt(mappedLeftIdx!) + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const options = question.options || [];
  const isMulti = question.type === "multiple";
  const userAnswersArray = Array.isArray(userAns) ? userAns : [];

  return (
    <div className="space-y-3">
      {options.map((opt, idx) => {
        const isSelected = isMulti ? userAnswersArray.includes(idx) : userAns === idx;
        const isFaded = fadedOptions.includes(idx);
        
        let isCorrectFeedback = false;
        let isWrongFeedback = false;

        // Drill or Hint mode immediate feedback
        if ((examMode === "Practice" || examMode === "Hint") && userAns !== undefined) {
          if (isMulti) {
            const correctArr = (question.correctAnswer as number[]) || [];
            if (userAnswersArray.length > 0) {
              isCorrectFeedback = correctArr.includes(idx);
              isWrongFeedback = userAnswersArray.includes(idx) && !correctArr.includes(idx);
            }
          } else {
            isCorrectFeedback = idx === question.correctAnswer;
            isWrongFeedback = userAns === idx && idx !== question.correctAnswer;
          }
        }

        return (
          <motion.div
            key={idx}
            whileTap={{ scale: isFaded ? 1 : 0.99 }}
            onClick={() => !isFaded && (isMulti ? handleMultiSelect(idx) : handleSelect(idx))}
            className={cn(
              "w-full flex items-center gap-4 p-4 border-2 transition-all cursor-pointer rounded-xl min-h-[4rem]",
              isCorrectFeedback 
                ? "bg-[#2c972c] border-[#2c972c] text-white shadow-md"
                : isWrongFeedback
                  ? "bg-[#e11d48] border-[#e11d48] text-white shadow-md"
                  : isSelected && examMode === "Standard"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white",
              isFaded && "opacity-20 blur-[1px] pointer-events-none grayscale shadow-none"
            )}
          >
            <span className={cn(
              "w-8 shrink-0 font-bold text-xl",
              (isCorrectFeedback || isWrongFeedback) ? "text-white" : "text-blue-900"
            )}>
              {String.fromCharCode(65 + idx)}
            </span>
            <div className={cn(
              "flex-1 text-lg font-medium",
              (isCorrectFeedback || isWrongFeedback) ? "text-white" : "text-slate-600"
            )}>
              {opt}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const UIActiveExam: React.FC<SharedProps> = (props) => {
  const {
    currentExam, activeAttempt, examMode, currentIdx, setCurrentIdx,
    timerValue, formatExamTimer, confirmEnd, isCalculatorOpen, setIsCalculatorOpen,
    isCommentModalOpen, setIsCommentModalOpen, showHint, setShowHint, toggleFlag,
    confirmAction, onEndExam, elapsedTime, userAns
  } = props;
  
  const question = currentExam.questions[currentIdx];
  const isStandard = examMode === "Standard";
  const hasAnswered = userAns !== undefined;

  const discardSession = async () => {
    if (await confirmAction("Discard Session", "Are you sure you want to exit? Your progress for this session will not be saved.")) {
      onEndExam(activeAttempt, elapsedTime, false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[1000] flex flex-col font-sans select-none overflow-hidden text-slate-900">
      {/* Header matching screenshot */}
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 z-[1100] shrink-0">
        <button onClick={discardSession} className="flex items-center gap-1 text-blue-800 font-semibold p-1">
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
        
        <div className="text-blue-900 font-bold text-lg tracking-tight uppercase">
          {currentExam.group || currentExam.title}
        </div>

        <button className="p-1 text-blue-900">
          <Volume2 size={24} />
        </button>
      </header>

      {/* Status Bar matching screenshot */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-50 shrink-0">
        <FileText size={28} className="text-blue-900" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-900">{currentIdx + 1} / {currentExam.questions.length}</span>
        </div>
        <button onClick={toggleFlag} className={cn("p-1 transition-colors", activeAttempt.flags[question.id] ? "text-red-500" : "text-slate-300")}>
          <Flag size={28} fill={activeAttempt.flags[question.id] ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex-grow flex overflow-hidden">
        <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col pt-6 px-6 relative overflow-y-auto custom-scrollbar">
          <div className="text-xl sm:text-2xl font-bold text-blue-950 leading-[1.3] mb-8">
            {question.text}
          </div>

          <div className="relative z-10 mb-8">
            <ExamOptions {...props} />
          </div>

          {/* Solution & Hint Sections visible after answering in Drill/Hint mode */}
          {(examMode === "Practice" || examMode === "Hint") && hasAnswered && (
            <div className="space-y-6 pb-12 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {question.explanation && (
                <div className="space-y-2">
                  <h4 className="text-slate-500 font-bold text-lg">Solution</h4>
                  <div className="text-slate-600 font-medium text-base leading-relaxed">
                    {question.explanation}
                  </div>
                </div>
              )}
              
              {question.hint && (
                <div className="space-y-2">
                  <h4 className="text-slate-500 font-bold text-lg italic">Tip</h4>
                  <div className="text-slate-600 font-medium text-base leading-relaxed italic">
                    {question.hint}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Placeholder for HINTS mode when logic allows it before answering */}
          {examMode === "Hint" && !hasAnswered && showHint && question.hint && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 p-5 bg-blue-50 border border-blue-100 rounded-xl">
               <h4 className="font-bold text-blue-800 text-sm mb-1 uppercase">Hint</h4>
               <p className="text-blue-700 text-sm italic">{question.hint}</p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Bottom Navigation matching screenshot */}
      <footer className="bg-[#004a99] p-3 flex items-center justify-around z-[1100] shrink-0 h-16">
        <button 
          onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)} 
          disabled={currentIdx === 0}
          className="text-white disabled:opacity-30 p-2"
        >
          <ChevronLeft size={40} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => setIsCommentModalOpen(true)}
          className="text-white p-2"
        >
          <LayoutGrid size={32} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => { if (currentIdx < currentExam.questions.length - 1) setCurrentIdx(currentIdx + 1); else confirmEnd(); }} 
          className="text-white p-2"
        >
          <ChevronRight size={40} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
};

export const ActiveExam: React.FC<ActiveExamProps> = ({
  currentExam, activeAttempt, examMode, onUpdateAttempt, onEndExam,
  confirmAction
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(currentExam.duration * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [fadedOptions, setFadedOptions] = useState<number[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [shuffledRights, setShuffledRights] = useState<{ text: string, originalIdx: number }[]>([]);

  const question = currentExam.questions[currentIdx];
  const userAns = activeAttempt.answers[question.id];

  useEffect(() => {
    document.body.classList.add('in-exam-session');
    return () => {
      document.body.classList.remove('in-exam-session');
    };
  }, []);

  useEffect(() => {
    if (question.type === "matching" && question.matchingPairs) {
      const rights = question.matchingPairs.map((p, i) => ({ text: p.right, originalIdx: i }));
      for (let i = rights.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rights[i], rights[j]] = [rights[j], rights[i]];
      }
      setShuffledRights(rights);
      setSelectedLeft(null);
    }
  }, [currentIdx, currentExam.id]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
      setElapsedTime(e => e + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (examMode === "Standard" && timeLeft === 0) {
       onEndExam(activeAttempt, elapsedTime, true);
    }
  }, [timeLeft, examMode]);

  useEffect(() => {
    setFadedOptions([]);
    setShowHint(false);
  }, [currentIdx]);

  const formatExamTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (idx: number) => {
    if (examMode === "Hint" && question.type !== "multiple" && question.type !== "matching" && userAns !== undefined) return;
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: idx } });
  };

  const handleMultiSelect = (idx: number) => {
    const currentMulti = Array.isArray(userAns) ? userAns : [];
    const newMulti = currentMulti.includes(idx) ? currentMulti.filter(i => i !== idx) : [...currentMulti, idx];
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: newMulti } });
  };

  const handleMatchingSelect = (leftIdx: number, rightIdx: number) => {
    const currentMapping = (userAns as Record<number, number>) || {};
    const newMapping = { ...currentMapping };
    Object.keys(newMapping).forEach(k => { 
      if (newMapping[parseInt(k)] === rightIdx) delete newMapping[parseInt(k)]; 
    });
    newMapping[leftIdx] = rightIdx;
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: newMapping } });
    setSelectedLeft(null);
  };

  const toggleFlag = () => {
    onUpdateAttempt({ ...activeAttempt, flags: { ...activeAttempt.flags, [question.id]: !activeAttempt.flags[question.id] } });
  };

  const confirmEnd = async () => {
    const timeTakenStr = formatExamTimer(elapsedTime);
    let title = "End Session";
    let message = "Are you sure you want to finish this session? Your answers will be submitted for scoring.";
    
    if (examMode !== "Standard") {
      title = "Practice Complete";
      message = `Session finished! Time taken: ${timeTakenStr}. View your results and review your answers?`;
    }

    if (await confirmAction(title, message)) {
      onEndExam(activeAttempt, elapsedTime, true);
    }
  };

  const sharedProps: SharedProps = {
    currentExam, activeAttempt, examMode, currentIdx, setCurrentIdx,
    timerValue: examMode === "Standard" ? timeLeft : elapsedTime,
    isCountDown: examMode === "Standard",
    formatExamTimer, confirmEnd, isCalculatorOpen, setIsCalculatorOpen,
    userAns, fadedOptions, handleSelect, handleMultiSelect, handleMatchingSelect,
    toggleFlag, setIsCommentModalOpen, showHint, setShowHint, setFadedOptions,
    selectedLeft, setSelectedLeft, shuffledRights, isCommentModalOpen,
    confirmAction, onEndExam, elapsedTime
  };

  return (
    <div className="fixed inset-0 bg-bg z-[1000] flex flex-col font-sans select-none overflow-hidden text-text-primary">
      <UIActiveExam {...sharedProps} />
      <AnimatePresence>
        {isCalculatorOpen && <APIExamCalculator onClose={() => setIsCalculatorOpen(false)} />}
        {isCommentModalOpen && <CommentModal onClose={() => setIsCommentModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};
