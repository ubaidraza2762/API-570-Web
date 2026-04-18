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
  RotateCcw
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-text-secondary opacity-60 flex items-center gap-2">
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
                  selectedLeft === lIdx ? "border-accent bg-accent/5 font-bold shadow-sm" : "border-border bg-bg hover:border-text-secondary/30 shadow-sm",
                  isMatched && selectedLeft !== lIdx && "bg-accent/5",
                  isCorrect && "bg-green-500/5 border-green-500",
                  isWrong && "bg-red-500/5 border-red-500"
                )}
              >
                <div className="flex items-center gap-4">
                   <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold", 
                     isCorrect ? "bg-green-500 text-white" : isWrong ? "bg-red-500 text-white" : "bg-bg-panel text-text-primary border border-border"
                   )}>
                     {lIdx + 1}
                   </div>
                   <span className={cn("text-text-primary text-sm font-semibold", (isCorrect || isWrong) && "font-bold")}>{p.left}</span>
                </div>
                {isMatched && (
                  <div className={cn(
                    "px-3 py-1 text-white text-[9px] rounded-lg font-bold uppercase tracking-wider",
                    isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-accent"
                  )}>
                    {isCorrect ? "Correct" : isWrong ? "Wrong" : "Matched"}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-text-secondary opacity-60 flex items-center gap-2">
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
                  "w-full p-4 rounded-xl border transition-all flex items-center justify-between group shadow-sm text-left",
                  selectedLeft === null 
                    ? (isMappedToSomething ? "border-accent/30 bg-accent/5 opacity-70" : "opacity-40 grayscale cursor-not-allowed border-border bg-bg-panel") 
                    : (isMappedToSomething ? "border-accent bg-accent/10" : "border-border bg-bg hover:border-accent/30"),
                  isMappedToSomething && "border-accent bg-accent/5"
                )}
              >
                <span className="font-semibold text-text-primary text-sm leading-snug">{r.text}</span>
                {isMappedToSomething && (
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-lg border border-accent/20 shadow-sm ml-4 shrink-0">
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
    <div className="space-y-4">
      {options.map((opt, idx) => {
        const isSelected = isMulti ? userAnswersArray.includes(idx) : userAns === idx;
        const isFaded = fadedOptions.includes(idx);
        
        let isCorrectFeedback = false;
        let isWrongFeedback = false;

        if (examMode === "Hint" && userAns !== undefined) {
          if (isMulti) {
            const correctArr = (question.correctAnswer as number[]) || [];
            isCorrectFeedback = correctArr.includes(idx);
            isWrongFeedback = userAnswersArray.includes(idx) && !correctArr.includes(idx);
          } else {
            isCorrectFeedback = idx === question.correctAnswer;
            isWrongFeedback = userAns === idx && idx !== question.correctAnswer;
          }
        }

        return (
          <div key={idx} className="flex items-center gap-4 group">
            <div className={cn(
              "w-10 h-10 shrink-0 flex items-center justify-center font-bold text-lg transition-all rounded-xl border",
              isSelected 
                ? "bg-accent text-white border-accent shadow-md scale-105" 
                : "bg-bg-panel text-text-secondary border-border group-hover:bg-bg group-hover:text-text-primary"
            )}>
              {String.fromCharCode(65 + idx)}
            </div>

            <motion.div
              whileHover={{ scale: isFaded ? 1 : 1.002 }}
              whileTap={{ scale: isFaded ? 1 : 0.995 }}
              onClick={() => !isFaded && (isMulti ? handleMultiSelect(idx) : handleSelect(idx))}
              className={cn(
                "flex-1 p-5 border transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden rounded-2xl",
                isSelected 
                  ? "border-accent bg-accent/[0.03] shadow-sm" 
                  : "border-border bg-bg hover:border-text-secondary/30 text-text-primary shadow-sm",
                isCorrectFeedback && "bg-green-500 border-green-500 text-white",
                isWrongFeedback && "bg-red-500 border-red-500 text-white",
                isFaded && "opacity-20 blur-[1px] pointer-events-none grayscale shadow-none"
              )}
            >
              <div className={cn("flex-1 text-base font-semibold leading-snug", isSelected ? "text-text-primary" : "text-text-primary", (isCorrectFeedback || isWrongFeedback) && "text-white")}>
                {opt}
              </div>
              {isCorrectFeedback && <div className="p-1 bg-white rounded-full"><CheckCircle2 size={18} className="text-green-500" /></div>}
              {isWrongFeedback && <div className="p-1 bg-white rounded-full"><AlertTriangle size={18} className="text-red-500" /></div>}
            </motion.div>
          </div>
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
    confirmAction, onEndExam, elapsedTime
  } = props;
  
  const question = currentExam.questions[currentIdx];
  const isStandard = examMode === "Standard";

  const discardSession = async () => {
    if (await confirmAction("Discard Session", "Are you sure you want to exit? Your progress for this session will not be saved.")) {
      onEndExam(activeAttempt, elapsedTime, false);
    }
  };

  return (
    <div className="fixed inset-0 bg-bg z-[1000] flex flex-col font-sans select-none overflow-hidden text-text-primary">
      <header className="bg-bg-panel px-6 py-4 flex items-center justify-between border-b border-border shadow-sm z-[1100] shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={discardSession} className="p-2 hover:bg-bg rounded-lg transition-colors text-text-secondary"><X size={20} /></button>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-text-primary leading-none truncate max-w-[200px] lg:max-w-md">{currentExam.title}</div>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock size={14} className={cn(isStandard ? "text-red-500" : "text-accent")} />
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-bold tabular-nums text-text-primary leading-none">{formatExamTimer(timerValue)}</span>
            </div>
          </div>
          <div className="w-full max-w-[200px] h-1 bg-bg rounded-full overflow-hidden">
            <motion.div 
              className={cn("h-full", isStandard ? "bg-red-500" : "bg-accent")} 
              initial={{ width: 0 }}
              animate={{ width: `${(currentIdx + 1) / currentExam.questions.length * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 flex-1">
          <div className="hidden lg:flex flex-col items-end mr-3">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Progress</span>
            <span className="text-sm font-bold text-text-primary">{currentIdx + 1} / {currentExam.questions.length}</span>
          </div>
          <button onClick={() => setIsCalculatorOpen(!isCalculatorOpen)} className={cn("p-2.5 rounded-xl transition-all border", isCalculatorOpen ? "bg-accent text-white border-accent shadow-md" : "bg-bg-panel text-text-secondary border-border hover:border-text-secondary/30")}><Calculator size={18} /></button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden lg:px-6 lg:py-6">
        <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col gap-6 relative">
          <motion.div key={currentIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-bg-panel rounded-3xl p-8 sm:p-12 shadow-sm border border-border flex flex-col overflow-y-auto custom-scrollbar flex-grow relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 bg-accent text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">Question {currentIdx + 1}</span>
                {activeAttempt.flags[question.id] && <span className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><Flag size={10} fill="currentColor" /> Flagged</span>}
              </div>
              
              {!isStandard && (
                <div className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", examMode === "Practice" ? "bg-purple-500 animate-pulse" : "bg-accent animate-pulse")} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", 
                    examMode === "Practice" ? "text-purple-600" : "text-accent"
                  )}>
                    {examMode === "Practice" ? "Practice Mode" : "Study Mode"}
                  </span>
                </div>
              )}
            </div>

            <div className="text-xl sm:text-2xl font-bold text-text-primary leading-snug mb-10 tracking-tight">{question.text}</div>
            
            {(question.type === "multiple" || question.type === "matching") && (
              <div className="mb-8 p-4 bg-bg border-l-4 border-accent rounded-r-xl flex items-center gap-3">
                <p className="text-text-secondary text-[11px] font-bold uppercase tracking-wider">
                  {question.type === "multiple" ? "Multiple Selection: Choose all correct answers" : "Matching Activity: Pair categories with descriptions"}
                </p>
              </div>
            )}

            <div className="relative z-10">
              <ExamOptions {...props} />
            </div>

            {(examMode === "Hint" || showHint) && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 p-8 rounded-2xl bg-amber-500/[0.03] border border-amber-200/50 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h4 className="font-bold text-amber-600 uppercase tracking-wider text-sm flex items-center gap-2"><Lightbulb size={18} /> Reference Hint</h4>
                        <div className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-[9px] font-bold uppercase tracking-wider">Education</div>
                    </div>
                    <div className="text-text-secondary font-medium text-sm leading-relaxed relative z-10">
                        {question.hint ? question.hint : "Review the standard protocols and certification requirements for this topic."}
                    </div>
                </motion.div>
            )}
          </motion.div>

          {examMode === "Hint" && !showHint && (
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:flex">
              <button 
                onClick={() => setShowHint(true)} 
                className="w-12 h-12 bg-amber-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
                title="Hint"
              >
                <Lightbulb size={24} />
              </button>
            </div>
          )}
        </main>
      </div>

      <footer className="bg-bg-panel border-t border-border p-4 sm:p-6 flex items-center justify-between z-[1100] shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={toggleFlag} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all", activeAttempt.flags[question.id] ? "bg-red-50 text-red-600 border border-red-100" : "text-text-secondary hover:bg-bg")}><Flag size={14} fill={activeAttempt.flags[question.id] ? "currentColor" : "none"} /> Flag</button>
          <button onClick={() => setIsCommentModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider text-text-secondary hover:bg-bg transition-all"><MessageSquare size={14} /> Note</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)} disabled={currentIdx === 0} className="p-3 rounded-xl bg-bg border border-border text-text-primary hover:bg-bg-panel disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={20} /></button>
          <button onClick={() => { if (currentIdx < currentExam.questions.length - 1) setCurrentIdx(currentIdx + 1); else confirmEnd(); }} className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20 hover:shadow-xl transition-all">
            {currentIdx === currentExam.questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} />
          </button>
        </div>
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

  // Mobile Landscape Enhancement
  useEffect(() => {
    const handleOrientation = async () => {
      try {
        if (screen.orientation && 'lock' in screen.orientation) {
          // @ts-ignore
          await screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (e) {}
    };
    handleOrientation();
    
    document.body.classList.add('in-exam-session');
    return () => {
      document.body.classList.remove('in-exam-session');
      if (screen.orientation && 'unlock' in screen.orientation) {
        screen.orientation.unlock();
      }
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
      {/* Portrait Warning Overlay */}
      <div className="fixed inset-0 z-[6000] bg-bg flex flex-col items-center justify-center p-8 text-center sm:hidden portrait:flex hidden">
        <RotateCcw className="text-accent animate-spin-slow mb-6" size={64} />
        <h2 className="text-xl font-bold text-text-primary mb-4">Landscape Required</h2>
        <p className="text-text-secondary font-medium text-xs leading-relaxed max-w-xs">
          Please rotate your device to landscape mode for the best experience during the exam.
        </p>
      </div>

      <UIActiveExam {...sharedProps} />
      <AnimatePresence>
        {isCalculatorOpen && <APIExamCalculator onClose={() => setIsCalculatorOpen(false)} />}
        {isCommentModalOpen && <CommentModal onClose={() => setIsCommentModalOpen(false)} />}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @media (orientation: portrait) {
          .portrait\\:flex { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
