import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle2, XCircle, Info, ChevronDown } from "lucide-react";
import { Exam, ExamAttempt } from "../types";
import { cn } from "../lib/utils";

interface ResultsViewProps {
  lastResult: ExamAttempt;
  exams: Exam[];
  onViewExams: () => void;
  onViewDashboard: () => void;
  isHistory?: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ 
  lastResult, 
  exams, 
  onViewExams, 
  onViewDashboard,
  isHistory
}) => {
  const exam = exams.find(e => e.id === lastResult.examId);
  
  // Calculate analytics
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  if (exam) {
    exam.questions.forEach(q => {
      const userAns = lastResult.answers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
        return;
      }

      let isCorrect = false;
      if (q.type === "multiple") {
        const correctArr = (q.correctAnswer as number[]) || [];
        isCorrect = Array.isArray(userAns) && userAns.length === correctArr.length && userAns.every(v => correctArr.includes(v));
      } else if (q.type === "matching") {
        const pairs = q.matchingPairs || [];
        const userMapping = userAns as Record<number, number>;
        isCorrect = Object.keys(userMapping).length === pairs.length && Object.keys(userMapping).every(k => userMapping[parseInt(k)] === parseInt(k));
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) correctCount++;
      else incorrectCount++;
    });
  }

  const chartData = [
    { name: "Correct", value: correctCount, color: "#10B981" },
    { name: "Incorrect", value: incorrectCount, color: "#EF4444" },
    { name: "Skipped", value: unattemptedCount, color: "#94A3B8" }
  ];
  const isPassed = lastResult.score >= 70;

  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return "N/A";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-8 sm:space-y-12 py-6 sm:py-10">
      <header className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-api-navy tracking-tighter mx-auto max-w-2xl px-2">
          {exam?.title || "Exam Concluded"}
        </h1>
        <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 w-fit mx-auto px-4 py-1.5 rounded-full">
          <span>Session: {lastResult.date}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
        <section className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col items-center border border-white relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-api-gold/5 rounded-full blur-3xl group-hover:bg-api-gold/10 transition-colors" />
          <div className="h-64 sm:h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={chartData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={85} 
                  outerRadius={115} 
                  paddingAngle={8} 
                  dataKey="value" 
                  stroke="none"
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-sm" />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className={cn("text-6xl sm:text-8xl font-[900] italic tracking-tighter", isPassed ? "text-api-navy" : "text-red-500")}>
                {lastResult.score}<span className="text-2xl sm:text-4xl font-black not-italic ml-1">%</span>
              </div>
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-2">Accuracy</div>
            </div>
          </div>
          <div className="mt-12 text-center space-y-4 w-full relative z-10">
            <div className={cn(
              "py-6 px-12 rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-2xl transition-all scale-100 hover:scale-[1.05] active:scale-95 inline-block", 
              isPassed ? "bg-api-navy text-white shadow-blue-900/20" : "bg-red-500 text-white shadow-red-900/20"
            )}>
              {isPassed ? "CERTIFIED" : "DEFICIENT"}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="bg-white p-10 sm:p-14 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex-grow h-full flex flex-col justify-center border border-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-700 pointer-events-none">
                 {isPassed ? <div className="text-[14rem] font-black text-api-gold">✓</div> : <div className="text-[14rem] font-black text-red-600">✗</div>}
             </div>
             <h3 className="text-xl font-black text-api-navy mb-10 border-b border-gray-50 pb-6 flex items-center justify-between tracking-tight relative z-10">
                {isHistory ? "Historical Analysis" : "Performance Analytics"}
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Items: {lastResult.total}</span>
             </h3>
             <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10 mb-12">
                <div className="bg-blue-50/30 p-6 rounded-[2rem] border border-blue-100 group/card transition-all">
                   <div className="text-[9px] font-black uppercase text-api-navy mb-1 tracking-widest">Correct</div>
                   <div className="text-3xl font-black text-api-navy tracking-tighter">{correctCount}</div>
                </div>
                <div className="bg-red-50/30 p-6 rounded-[2rem] border border-red-100 group/card transition-all">
                   <div className="text-[9px] font-black uppercase text-red-600 mb-1 tracking-widest">Incorrect</div>
                   <div className="text-3xl font-black text-api-navy tracking-tighter">{incorrectCount}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group/card transition-all">
                   <div className="text-[9px] font-black uppercase text-gray-400 mb-1 tracking-widest">Skipped</div>
                   <div className="text-3xl font-black text-api-navy tracking-tighter">{unattemptedCount}</div>
                </div>
                <div className="bg-yellow-50/30 p-6 rounded-[2rem] border border-api-gold group/card transition-all">
                   <div className="text-[9px] font-black uppercase text-api-gold mb-1 tracking-widest">Time Taken</div>
                   <div className="text-3xl font-black text-api-navy tracking-tighter whitespace-nowrap">{formatTime(lastResult.timeTaken)}</div>
                </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10 pt-8 border-t border-gray-50">
               <button onClick={onViewExams} className="btn-secondary py-5 text-sm">{isHistory ? "Launch New" : "New Session"}</button>
               <button onClick={onViewDashboard} className="btn-primary py-5 text-sm">{isHistory ? "Back to Dashboard" : "Dashboard"}</button>
             </div>
          </div>
        </section>
      </div>

      {/* Question Review Section */}
      {(lastResult.mode === "Practice" || lastResult.mode === "Hint" || isHistory) && exam && (
        <section className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 sm:p-14 border border-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-3xl font-black text-api-navy tracking-tight mb-2">Detailed Evaluation</h2>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Question-by-question technical review</p>
            </div>
            <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-2">
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm"><div className="w-2.5 h-2.5 rounded-full bg-api-navy" /> <span className="text-[10px] font-black text-api-navy uppercase">Correct</span></div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> <span className="text-[10px] font-black text-api-navy uppercase">Incorrect</span></div>
            </div>
          </div>

          <div className="space-y-8">
            {exam.questions.map((q, qIdx) => {
              const userAns = lastResult.answers[q.id];
              
              let isCorrect = false;
              if (userAns !== undefined) {
                if (q.type === "multiple") {
                  const correctArr = (q.correctAnswer as number[]) || [];
                  isCorrect = Array.isArray(userAns) && userAns.length === correctArr.length && userAns.every(v => correctArr.includes(v));
                } else if (q.type === "matching") {
                  const pairs = q.matchingPairs || [];
                  const userMapping = userAns as Record<number, number>;
                  isCorrect = Object.keys(userMapping).length === pairs.length && Object.keys(userMapping).every(k => userMapping[parseInt(k)] === parseInt(k));
                } else {
                  isCorrect = userAns === q.correctAnswer;
                }
              }

              const renderAnswerInfo = () => {
                if (q.type === "multiple") {
                  const correctArr = (q.correctAnswer as number[]) || [];
                  const userArr = Array.isArray(userAns) ? userAns : [];
                  const options = q.options || [];

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/80 p-5 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Your Selections</div>
                        <div className="space-y-2">
                          {userArr.length > 0 ? userArr.map(idx => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center font-black text-[10px]">{String.fromCharCode(65 + idx)}</span>
                              <span className="text-sm font-bold text-gray-600 truncate">{options[idx]}</span>
                            </div>
                          )) : <div className="text-sm text-gray-400 font-bold italic">No selection made</div>}
                        </div>
                      </div>
                      <div className="bg-white/80 p-5 rounded-2xl border border-api-gold shadow-sm border-dashed">
                        <div className="text-[10px] font-black uppercase text-api-navy mb-2 tracking-widest">Correct Answers</div>
                        <div className="space-y-2">
                          {correctArr.map(idx => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-api-navy text-white flex items-center justify-center font-black text-[10px]">{String.fromCharCode(65 + idx)}</span>
                              <span className="text-sm font-bold text-api-navy truncate">{options[idx]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (q.type === "matching") {
                  const pairs = q.matchingPairs || [];
                  const userMapping = (userAns as Record<number, number>) || {};

                  return (
                    <div className="bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Matching Evaluation</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {pairs.map((p, lIdx) => {
                          const userMatch = userMapping[lIdx];
                          const isMatchCorrect = userMatch === lIdx;
                          return (
                            <div key={lIdx} className={cn("p-3 rounded-xl border flex flex-col gap-2", isMatchCorrect ? "bg-api-navy/5 border-api-navy/10" : "bg-red-50/50 border-red-100")}>
                               <div className="text-[10px] font-black text-api-navy uppercase opacity-40">Item #{lIdx + 1}</div>
                               <div className="font-bold text-gray-800">{p.left}</div>
                               <div className="h-px bg-gray-200" />
                               <div className="flex items-center gap-2">
                                  <div className={cn("w-2 h-2 rounded-full", isMatchCorrect ? "bg-api-navy" : "bg-red-500")} />
                                  <span className={cn("text-sm font-medium", isMatchCorrect ? "text-api-navy" : "text-red-700")}>
                                     {userMatch !== undefined ? pairs[userMatch].right : "Unmatched"}
                                  </span>
                               </div>
                               {!isMatchCorrect && (
                                 <div className="mt-1 text-[10px] font-black text-api-navy uppercase italic">Should be: {p.right}</div>
                               )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const options = q.options || [];
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/80 p-5 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                       <div className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Your Selection</div>
                       <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs",
                            isCorrect ? "bg-api-navy text-white" : "bg-red-50 text-red-700"
                          )}>
                            {userAns !== undefined ? String.fromCharCode(65 + userAns) : "-"}
                          </span>
                          <span className="font-bold text-gray-600 truncate">{userAns !== undefined ? options[userAns] : "Not Attempted"}</span>
                       </div>
                    </div>

                    {!isCorrect && (
                      <div className="bg-white/80 p-5 rounded-2xl border border-api-gold shadow-sm border-dashed">
                         <div className="text-[10px] font-black uppercase text-api-navy mb-2 tracking-widest">Valid Alternative</div>
                         <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-api-navy text-white flex items-center justify-center font-black text-xs">
                              {String.fromCharCode(65 + (q.correctAnswer as number))}
                            </span>
                            <span className="font-bold text-api-navy truncate">{options[q.correctAnswer as number]}</span>
                         </div>
                      </div>
                    )}
                  </div>
                );
              };

              return (
                <div key={q.id} className={cn(
                  "p-8 rounded-[2rem] border-2 transition-all relative overflow-hidden group",
                  isCorrect ? "bg-api-navy/5 border-api-navy/10" : "bg-red-50/20 border-red-100"
                )}>
                  {/* Status Indicator Bar */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-2", isCorrect ? "bg-api-navy" : "bg-red-500")} />
                  
                  <div className="flex items-start gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 outline outline-4 outline-white shadow-sm",
                      isCorrect ? "bg-api-navy text-white" : "bg-red-500 text-white"
                    )}>
                      {qIdx + 1}
                    </div>
                    
                    <div className="flex-grow space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                           {isCorrect ? <CheckCircle2 size={18} className="text-api-navy" /> : <XCircle size={18} className="text-red-600" />}
                           <span className={cn("text-[10px] font-black tracking-[0.2em] uppercase", isCorrect ? "text-api-navy" : "text-red-600")}>
                             {isCorrect ? "Validated" : "Deficient Response"}
                           </span>
                        </div>
                        <p className="text-xl font-bold text-api-navy leading-snug">{q.text}</p>
                      </div>

                      {renderAnswerInfo()}

                      {q.hint && (
                        <div className="flex items-start gap-3 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                          <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Technical Justification</span>
                            <p className="text-sm font-medium text-api-navy italic leading-relaxed">{q.hint}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
