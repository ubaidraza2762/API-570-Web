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
  Image as ImageIcon
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
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-api-navy/60 backdrop-blur-sm" onClick={onClose} />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-huge p-10 max-w-lg w-full relative z-10 shadow-2xl">
      <h3 className="text-2xl font-black text-api-navy mb-6 flex items-center gap-3 tracking-tighter"><MessageSquare className="text-api-gold" /> Examination Comment</h3>
      <textarea className="w-full h-40 bg-gray-50 border-0 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-api-gold mb-6 font-bold text-api-navy" placeholder="Documentation for technical review..." />
      <div className="flex gap-4">
        <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Discard</button>
        <button onClick={onClose} className="flex-1 py-4 bg-api-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-95 transition-all">Save Note</button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-6">
        <div className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-gray-400 flex items-center gap-2">
            <div className="w-4 h-1 bg-api-gold rounded-full" /> Categories
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
                  "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group relative overflow-hidden",
                  selectedLeft === lIdx ? "border-api-gold bg-api-gold/10 font-bold shadow-md ring-2 ring-api-gold/20" : "border-gray-100 bg-white hover:border-gray-300 shadow-sm",
                  isMatched && selectedLeft !== lIdx && "border-blue-100 bg-blue-50/5",
                  isCorrect && "border-api-navy bg-api-navy/5",
                  isWrong && "border-red-500 bg-red-50/50"
                )}
              >
                <div className="flex items-center gap-4">
                   <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black", 
                     isCorrect ? "bg-api-navy text-white" : isWrong ? "bg-red-600 text-white" : "bg-gray-100 text-api-navy"
                   )}>
                     {lIdx + 1}
                   </div>
                   <span className={cn("text-api-navy text-sm font-bold", (isCorrect || isWrong) && "font-black")}>{p.left}</span>
                </div>
                {isMatched && (
                  <div className={cn(
                    "px-3 py-1.5 text-white text-[9px] rounded-lg font-black uppercase tracking-tighter shadow-sm",
                    isCorrect ? "bg-api-navy" : isWrong ? "bg-red-600" : "bg-api-gold text-api-navy"
                  )}>
                    {isCorrect ? "MATCHED" : isWrong ? "FAIL" : "LINKED"}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-gray-400 flex items-center gap-2">
            <div className="w-4 h-1 bg-api-navy rounded-full" /> Definitions
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
                  "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group shadow-sm",
                  selectedLeft === null 
                    ? (isMappedToSomething ? "border-api-gold/30 bg-api-gold/5 opacity-70" : "opacity-40 grayscale cursor-not-allowed border-gray-100 bg-gray-50") 
                    : (isMappedToSomething ? "border-api-gold bg-api-gold/10" : "border-gray-50 bg-white hover:border-api-gold/30"),
                  isMappedToSomething && "border-api-gold/50 bg-api-gold/10"
                )}
              >
                <span className="font-bold text-gray-700 text-sm leading-relaxed">{r.text}</span>
                {isMappedToSomething && (
                  <span className="text-[10px] font-black text-api-navy bg-api-gold px-2 py-1 rounded-md border border-api-gold/20 shadow-sm ml-4 shrink-0">
                    ID: {parseInt(mappedLeftIdx!) + 1}
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
    <div className="space-y-5">
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
          <div key={idx} className="flex items-center gap-6 group">
            {/* Label Bubble - Proctor Style */}
            <div className={cn(
              "w-11 h-11 shrink-0 flex items-center justify-center font-black text-lg transition-all rounded-2xl border-2",
              isSelected 
                ? "bg-api-gold text-api-navy border-api-gold shadow-lg shadow-yellow-500/10 scale-110" 
                : "bg-gray-50/80 text-gray-400 border-transparent group-hover:bg-gray-100 group-hover:text-gray-600"
            )}>
              {String.fromCharCode(65 + idx)}
            </div>

            <motion.div
              whileHover={{ scale: isFaded ? 1 : 1.002 }}
              whileTap={{ scale: isFaded ? 1 : 0.995 }}
              onClick={() => !isFaded && (isMulti ? handleMultiSelect(idx) : handleSelect(idx))}
              className={cn(
                "flex-1 p-5 sm:p-6 border-2 transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem]",
                isSelected 
                  ? "border-api-gold bg-api-gold/5 shadow-md" 
                  : "border-gray-100 bg-white hover:border-gray-200 text-gray-700 shadow-sm",
                isCorrectFeedback && "bg-api-navy border-api-navy text-white",
                isWrongFeedback && "bg-red-50/50 border-red-500",
                isFaded && "opacity-20 blur-[1px] pointer-events-none grayscale shadow-none"
              )}
            >
              <div className={cn("flex-1 text-[16px] sm:text-[18px] font-bold leading-tight", isSelected ? "text-api-navy" : "text-gray-700", isCorrectFeedback && "text-white")}>
                {opt}
              </div>
              {isCorrectFeedback && <div className="p-1 bg-white rounded-full"><CheckCircle2 size={20} className="text-api-navy" /></div>}
              {isWrongFeedback && <div className="p-1 bg-red-500 rounded-full"><AlertTriangle size={20} className="text-white" /></div>}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const ProctorActiveExam: React.FC<SharedProps> = (props) => {
  const {
    currentExam, activeAttempt, currentIdx, setCurrentIdx,
    timerValue, formatExamTimer, confirmEnd, isCalculatorOpen, setIsCalculatorOpen,
    userAns, isCommentModalOpen, setIsCommentModalOpen, toggleFlag, handleSelect, handleMultiSelect,
    selectedLeft, setSelectedLeft, shuffledRights, handleMatchingSelect
  } = props;

  const question = currentExam.questions[currentIdx];
  const attemptedCount = Object.keys(activeAttempt.answers).length;

  return (
    <div className="fixed inset-0 bg-[#F0F0F0] z-[1000] flex flex-col font-sans select-none overflow-hidden text-[#333]">
      {/* 1. Dark Gray Top Header */}
      <header className="bg-[#EAEAEA] min-h-[60px] flex items-center justify-between px-6 py-1 border-b border-gray-400 shrink-0">
        <div className="flex flex-col text-[13px] font-bold leading-tight flex-1">
          <div className="text-gray-500 font-black">Page: {currentIdx + 1}</div>
          <div className="truncate max-w-[400px] text-gray-700">Section: 1</div>
        </div>
        
        <div className="flex items-center gap-16 mr-4 h-full">
          <div className="flex items-center gap-2">
            <Clock size={24} className="text-gray-600" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Section Time Remaining</span>
              <span className="text-xl font-bold leading-none tabular-nums text-gray-800">{formatExamTimer(timerValue)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center h-full justify-center px-8">
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-tight">{attemptedCount}/{currentExam.questions.length}</span>
            <span className="text-[13px] font-black text-gray-600">Items Attempted</span>
          </div>
          
          <button 
            onClick={confirmEnd}
            className="bg-[#DEDEDE] border border-gray-400 px-6 py-2 rounded font-black text-[14px] shadow-sm hover:bg-gray-300 active:bg-gray-200 transition-colors whitespace-nowrap text-gray-700"
          >
            Finish Section
          </button>
        </div>
      </header>

      {/* 2. Brand Green Sub-Header */}
      <div className="bg-api-navy h-8 flex items-center justify-between px-4 text-white text-[13px] font-bold shadow-md shrink-0 z-10 border-b border-white/10">
        <span className="truncate max-w-[60%] flex items-center gap-2">
           Test: {currentExam.year} - {currentExam.title}
        </span>
        <span className="truncate ml-2 flex items-center gap-2">
           Candidate: Ubaid Raza
        </span>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* 3. Side Navigator */}
        <aside className="w-[85px] bg-[#EAEAEA] border-r border-gray-300 flex flex-col items-center py-4 overflow-y-auto custom-scrollbar shadow-inner shrink-0">
          <div className="flex flex-col gap-1 w-full px-2">
            {currentExam.questions.map((_, i) => {
              const isCurrent = currentIdx === i;
              const isAttempted = activeAttempt.answers[currentExam.questions[i].id] !== undefined;
              const isFlagged = activeAttempt.flags[currentExam.questions[i].id];
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={cn(
                    "w-full h-9 flex items-center rounded relative text-sm font-black border transition-all mb-1",
                    isCurrent ? "bg-api-gold text-api-navy border-api-gold shadow-md z-10" : 
                    isAttempted ? "bg-[#BDBDBD] text-[#333] border-[#AAAAAA]" :
                    "bg-[#EFEFEF] text-[#333] border-[#CCCCCC] hover:border-gray-400"
                  )}
                >
                  {isCurrent && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-api-gold" />
                  )}
                  <span className="pl-3">{i + 1}</span>
                  {isFlagged && <div className="ml-auto pr-1"><Flag size={10} className="fill-current text-red-600" /></div>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* 4. Question Container */}
        <main className="flex-1 bg-white m-6 rounded shadow-xl border border-gray-300 flex flex-col relative overflow-hidden">
          <div className="p-10 sm:p-14 overflow-y-auto custom-scrollbar flex-grow">
            {/* Top Tools Bar */}
            <div className="flex flex-col gap-3 mb-10 border-b border-gray-100 pb-6 items-start">
              <button className="flex items-center gap-2 bg-[#F5F5F5] border border-gray-300 px-3 py-1.5 rounded text-[13px] font-bold hover:bg-gray-200 transition-colors shadow-sm"><FileText size={14} /> Reference</button>
              <button 
                className="flex items-center gap-3 bg-[#F5F5F5] border border-gray-300 px-5 py-2 rounded text-[13px] font-black hover:bg-gray-200 shadow-sm transition-colors text-gray-700"
              >
                <ImageIcon size={16} /> Exhibit
              </button>
              <button 
                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)} 
                className={cn(
                  "flex items-center gap-3 border px-5 py-2 rounded text-[13px] font-black transition-all shadow-sm",
                  isCalculatorOpen ? "bg-api-gold text-api-navy border-api-gold" : "bg-[#F5F5F5] border-gray-300 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Calculator size={16} /> Calculator
              </button>
            </div>
            
            {/* Question Title/Text */}
            <div className="mb-12 text-[20px] sm:text-[22px] leading-relaxed font-bold text-gray-800">
              {question.text}
            </div>
            
            {/* Multi/Matching Warning */}
            {(question.type === "multiple" || question.type === "matching") && (
              <div className="bg-api-gold/10 border-l-4 border-api-gold p-4 mb-8 flex items-start gap-3 rounded-r shadow-sm">
                <AlertTriangle size={18} className="text-api-gold shrink-0 mt-0.5" />
                <p className="text-api-navy text-[12px] font-black uppercase tracking-widest leading-normal">
                  {question.type === "multiple" 
                    ? "Multiple-Response Item: This may have more than one correct answer, please select all answers that apply." 
                    : "Extended Matching Item: To complete a match, click on the category then click on the corresponding definition."}
                </p>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-6">
              {question.type === "matching" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {question.matchingPairs?.map((p, lIdx) => {
                      const currentMapping = (userAns as Record<number, number>) || {};
                      const isSelected = selectedLeft === lIdx;
                      const isMatched = currentMapping[lIdx] !== undefined;
                      return (
                        <button 
                          key={lIdx} 
                          onClick={() => setSelectedLeft(lIdx)}
                          className={cn("w-full text-left p-4 border-2 rounded transition-all flex items-center justify-between",
                            isSelected ? "border-api-gold bg-api-gold/5" : isMatched ? "border-api-navy bg-api-navy/5 font-bold" : "border-gray-300 bg-white"
                          )}
                        >
                          {p.left}
                          {isMatched && <CheckCircle2 size={16} className="text-api-navy" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                      {shuffledRights.map((r, rIdx) => {
                        const currentMapping = (userAns as Record<number, number>) || {};
                        const isMapped = Object.values(currentMapping).includes(r.originalIdx);
                        return (
                          <button 
                            key={rIdx} 
                            disabled={selectedLeft === null}
                            onClick={() => handleMatchingSelect(selectedLeft!, r.originalIdx)}
                            className={cn("w-full text-left p-4 border-2 rounded transition-all",
                              selectedLeft === null ? "opacity-50 grayscale cursor-not-allowed border-gray-200" : isMapped ? "border-api-gold bg-api-gold/5" : "border-gray-300 bg-white hover:border-api-gold/30"
                            )}
                          >
                            {r.text}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {question.options?.map((opt, idx) => {
                    const isMulti = question.type === "multiple";
                    const isSelected = isMulti ? (Array.isArray(userAns) && userAns.includes(idx)) : userAns === idx;
                    return (
                      <div key={idx} className="flex items-center gap-5">
                         <span className="font-bold text-gray-500 w-6">{String.fromCharCode(65 + idx)}</span>
                          <button
                            onClick={() => isMulti ? handleMultiSelect(idx) : handleSelect(idx)}
                            className={cn(
                              "flex-1 p-4 border-2 transition-all text-left",
                              isSelected 
                                ? "border-api-gold bg-api-gold/10" 
                                : "border-gray-300 bg-white hover:border-gray-400"
                            )}
                          >
                             <span className="font-medium text-gray-800">{opt}</span>
                          </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Standard Footer */}
          <footer className="bg-[#3C3C3C] min-h-[50px] flex items-center justify-between px-3 py-1 text-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-4">
              <button className="p-2 opacity-80 hover:opacity-100 transition-opacity hover:bg-white/10 rounded"><Settings size={22} /></button>
              <button className="p-2 opacity-80 hover:opacity-100 transition-opacity hover:bg-white/10 rounded"><LayoutGrid size={22} /></button>
              <div className="h-6 w-px bg-white/10 mx-1" />
              <button onClick={() => setIsCommentModalOpen(true)} className="flex items-center gap-2 px-3 py-1 text-[11px] font-black uppercase tracking-widest opacity-60 hover:opacity-100"><MessageSquare size={16} /> Comment</button>
              <button onClick={toggleFlag} className={cn("flex items-center gap-2 px-3 py-1 text-[11px] font-black uppercase tracking-widest hover:opacity-100", activeAttempt.flags[question.id] ? "opacity-100 text-red-500" : "opacity-60")}><Flag size={16} fill={activeAttempt.flags[question.id] ? "currentColor" : "none"} /> Flag</button>
            </div>
            
            <div className="flex items-center gap-2 h-full py-1">
              <button 
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} 
                disabled={currentIdx === 0} 
                className="flex items-center gap-2 bg-api-gold text-api-navy hover:bg-api-gold/90 disabled:bg-gray-600 px-6 h-10 rounded font-bold text-[13px] shadow-sm transition-all"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button 
                onClick={() => { if (currentIdx < currentExam.questions.length - 1) setCurrentIdx(currentIdx + 1); else confirmEnd(); }} 
                className="flex items-center gap-2 bg-api-gold text-api-navy hover:bg-api-gold/90 disabled:bg-gray-600 px-6 h-10 rounded font-bold text-[13px] shadow-sm transition-all"
              >
                {currentIdx === currentExam.questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} />
              </button>
              <button 
                onClick={confirmEnd}
                className="flex items-center gap-2 bg-api-gold text-api-navy hover:bg-api-gold/90 px-8 h-10 rounded font-bold text-[13px] shadow-sm transition-all ml-2"
              >
                Continue the Test <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </main>
      </div>

      <AnimatePresence>
        {isCommentModalOpen && <CommentModal onClose={() => setIsCommentModalOpen(false)} />}
        {isCalculatorOpen && <APIExamCalculator onClose={() => setIsCalculatorOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const UIActiveExam: React.FC<SharedProps> = (props) => {
  const {
    currentExam, activeAttempt, examMode, currentIdx, setCurrentIdx,
    timerValue, isCountDown, formatExamTimer, confirmEnd, isCalculatorOpen, setIsCalculatorOpen,
    userAns, isCommentModalOpen, setIsCommentModalOpen, showHint, setShowHint, toggleFlag,
    confirmAction, onEndExam, elapsedTime
  } = props;
  
  const question = currentExam.questions[currentIdx];
  const isStandard = examMode === "Standard";

  const discardSession = async () => {
    if (await confirmAction("Discard Session", "Are you sure you want to discard this exam? Progress will not be saved in your historical records.")) {
      onEndExam(activeAttempt, elapsedTime, false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F4F7FA] z-[1000] flex flex-col font-sans select-none overflow-hidden text-[#1A1C1E]">
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm z-[1100] shrink-0">
        <div className="flex items-center gap-6 flex-1">
          <button onClick={discardSession} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><X size={24} /></button>
          <div className="h-4 w-px bg-gray-200 hidden sm:block" />
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Current Exam</h2>
            <div className="text-lg font-black text-api-navy leading-none truncate max-w-[200px] lg:max-w-md">{currentExam.title}</div>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className={cn(isStandard ? "text-red-500" : "text-api-gold")} />
            <div className="flex flex-col items-center">
              <span className={cn("text-[10px] font-black uppercase leading-none mb-0.5", isStandard ? "text-red-500" : "text-api-gold")}>
                {isStandard ? "Time Remaining" : "Session Timer"}
              </span>
              <span className="text-xl font-mono font-black tabular-nums text-api-navy leading-none">{formatExamTimer(timerValue)}</span>
            </div>
          </div>
          <div className="w-full max-w-[240px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className={cn("h-full", isStandard ? "bg-red-400" : "bg-api-gold")} 
              initial={{ width: 0 }}
              animate={{ width: `${(currentIdx + 1) / currentExam.questions.length * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 flex-1">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] font-black text-gray-400 uppercase">Question progress</span>
            <span className="text-sm font-black text-api-navy">{currentIdx + 1} of {currentExam.questions.length}</span>
          </div>
          <button onClick={() => setIsCalculatorOpen(!isCalculatorOpen)} className={cn("p-3 rounded-2xl transition-all shadow-sm", isCalculatorOpen ? "bg-api-navy text-white" : "bg-white text-gray-400 hover:text-api-navy border border-gray-100")}><Calculator size={20} /></button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden lg:px-6 lg:py-8">
        <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-6 relative">
          <motion.div key={currentIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.8rem] p-8 sm:p-14 shadow-2xl shadow-blue-900/5 flex flex-col overflow-y-auto custom-scrollbar flex-grow border border-white relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none font-black text-9xl uppercase tracking-tighter select-none">API CORE</div>
            
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="px-5 py-2 bg-api-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">Item {currentIdx + 1}</span>
                {activeAttempt.flags[question.id] && <span className="px-5 py-2 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-500/20 animate-pulse"><Flag size={10} fill="currentColor" /> Flagged</span>}
              </div>
              
              {!isStandard && (
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", examMode === "Practice" ? "bg-purple-500 animate-pulse" : "bg-api-gold animate-pulse")} />
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", 
                    examMode === "Practice" ? "text-purple-600" : "text-api-gold"
                  )}>
                    {examMode === "Practice" ? "Live Practice" : "Guided Study"}
                  </span>
                </div>
              )}
            </div>

            <div className="text-2xl sm:text-3xl font-black text-api-navy leading-tight mb-8 tracking-tight">{question.text}</div>
            
            {(question.type === "multiple" || question.type === "matching") && (
              <div className="mb-10 p-5 bg-blue-50/50 border-l-[6px] border-api-navy rounded-r-2xl flex items-center gap-4">
                <div className="p-2 bg-api-navy text-white rounded-xl"><HelpCircle size={18} /></div>
                <p className="text-api-navy text-[11px] font-black uppercase tracking-widest leading-none">
                  {question.type === "multiple" ? "Multiple-Response: Select all applicable options" : "Matching Activity: Connect items to their correct definitions"}
                </p>
              </div>
            )}

            <div className="relative z-10">
              <ExamOptions {...props} />
            </div>

            {/* Guide/Hint Display - Professional Polished Look */}
            {(examMode === "Hint" || showHint) && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-10 rounded-[2.5rem] bg-gradient-to-br from-yellow-50 to-white border-2 border-api-gold shadow-xl shadow-yellow-900/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-api-gold transition-transform group-hover:rotate-12 duration-500"><Lightbulb size={120} /></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <h4 className="font-black text-api-gold uppercase tracking-tighter text-xl flex items-center gap-3"><CheckCircle2 className="text-api-gold" size={24} /> Technical Rationale</h4>
                        <div className="px-4 py-1.5 bg-api-gold text-api-navy rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-yellow-500/20">Code Compliance</div>
                    </div>
                    <div className="text-api-navy font-bold text-lg leading-relaxed relative z-10 max-w-2xl">
                        {question.hint ? question.hint : "The correct response(s) align perfectly with API inspection protocols and established engineering standards for pressure piping."}
                    </div>
                </motion.div>
            )}
          </motion.div>

          {examMode === "Hint" && !showHint && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6"
            >
              <button 
                onClick={() => setShowHint(true)} 
                className="w-20 h-20 bg-api-gold text-api-navy rounded-[2rem] shadow-2xl shadow-yellow-900/30 flex flex-col items-center justify-center hover:scale-110 active:scale-90 transition-all group"
                title="Review Logic"
              >
                <Lightbulb size={32} className="mb-1 group-hover:rotate-12 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-tighter">Guide</span>
              </button>
            </motion.div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-gray-100 p-6 flex items-center justify-between z-[1100] shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={toggleFlag} className={cn("flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", activeAttempt.flags[question.id] ? "bg-red-50 text-red-600" : "text-gray-400 hover:text-api-navy hover:bg-gray-50")}><Flag size={18} fill={activeAttempt.flags[question.id] ? "currentColor" : "none"} /> Flag</button>
          <button onClick={() => setIsCommentModalOpen(true)} className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-api-navy hover:bg-gray-50 transition-all"><MessageSquare size={18} /> Comment</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)} disabled={currentIdx === 0} className="p-4 rounded-2xl bg-gray-50 text-api-navy hover:bg-gray-100 disabled:opacity-30 disabled:grayscale transition-all shadow-sm"><ChevronLeft size={24} /></button>
          <button onClick={() => { if (currentIdx < currentExam.questions.length - 1) setCurrentIdx(currentIdx + 1); else confirmEnd(); }} className="flex items-center gap-3 px-10 py-4 bg-api-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-95 transition-all">
            {currentIdx === currentExam.questions.length - 1 ? "Complete Exam" : "Next Question"} <ChevronRight size={20} />
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [shuffledRights, setShuffledRights] = useState<{ text: string, originalIdx: number }[]>([]);

  const question = currentExam.questions[currentIdx];
  const userAns = activeAttempt.answers[question.id];

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
       onEndExam(activeAttempt, elapsedTime);
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
    // Only lock if we're in Guided (Hint) mode AND it's a single-choice question
    if (examMode === "Hint" && question.type !== "multiple" && question.type !== "matching" && userAns !== undefined) return;
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: idx } });
  };

  const handleMultiSelect = (idx: number) => {
    // In Guided mode for multiple choice, we allow toggling until the user is "done"
    // Usually, in Guided, any change updates the view.
    const currentMulti = Array.isArray(userAns) ? userAns : [];
    const newMulti = currentMulti.includes(idx) ? currentMulti.filter(i => i !== idx) : [...currentMulti, idx];
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: newMulti } });
  };

  const handleMatchingSelect = (leftIdx: number, rightIdx: number) => {
    const currentMapping = (userAns as Record<number, number>) || {};
    const newMapping = { ...currentMapping };
    
    // Check if this right option is already paired with someone else, if so, remove that old pair
    Object.keys(newMapping).forEach(k => { 
      if (newMapping[parseInt(k)] === rightIdx) delete newMapping[parseInt(k)]; 
    });
    
    // Add the new pair
    newMapping[leftIdx] = rightIdx;
    
    // Update the attempt
    onUpdateAttempt({ ...activeAttempt, answers: { ...activeAttempt.answers, [question.id]: newMapping } });
    setSelectedLeft(null);
  };

  const toggleFlag = () => {
    onUpdateAttempt({ ...activeAttempt, flags: { ...activeAttempt.flags, [question.id]: !activeAttempt.flags[question.id] } });
  };

  const confirmEnd = async () => {
    const timeTakenStr = formatExamTimer(elapsedTime);
    const isLastQuestion = currentIdx === currentExam.questions.length - 1;
    
    // If it's the last question and they click Finish, they are probably done.
    // If they hit the 'X' button or 'Finish Section' in the header, we ask.
    
    let title = "Finish Session";
    let message = "Are you sure you want to finish this examination section and submit your answers?";
    
    if (examMode !== "Standard") {
      title = "End Session";
      message = `Session complete! Time taken: ${timeTakenStr}. Do you want to submit and review your results?`;
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
    <div className="fixed inset-0 bg-white z-[1000] flex flex-col font-sans select-none overflow-hidden text-[#333]">
      <UIActiveExam {...sharedProps} />
      <AnimatePresence>
        {isCalculatorOpen && <APIExamCalculator onClose={() => setIsCalculatorOpen(false)} />}
        {isCommentModalOpen && <CommentModal onClose={() => setIsCommentModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};
