import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle2, XCircle, Info, ChevronDown, Lightbulb } from "lucide-react";
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
        const userMatches = Object.entries(userMapping);
        if (userMatches.length === pairs.length) {
          const expectedSet = pairs.map(p => `${p.left.trim()}|||${p.right.trim()}`).sort();
          const userSet = userMatches.map(([lIdx, rIdx]) => {
            const leftText = pairs[parseInt(lIdx)].left;
            const rightText = pairs[rIdx].right;
            return `${leftText.trim()}|||${rightText.trim()}`;
          }).sort();
          isCorrect = JSON.stringify(expectedSet) === JSON.stringify(userSet);
        }
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) correctCount++;
      else incorrectCount++;
    });
  }

  const chartData = [
    { name: "Correct", value: correctCount, color: "#3B82F6" },
    { name: "Incorrect", value: incorrectCount, color: "#EF4444" },
    { name: "Skipped", value: unattemptedCount, color: "#94A3B8" }
  ];
  const isPassed = lastResult.score >= 90;

  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return "N/A";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-10 py-10 pb-20">
      <div className="section-label">Examination Summary</div>
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-bg-panel border border-border p-8 sm:p-12 rounded-3xl relative overflow-hidden group shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-1000">
           {isPassed ? <CheckCircle2 size={300} className="text-accent" /> : <XCircle size={300} className="text-red-500" />}
        </div>
        
        <div className="relative z-10 space-y-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
             <div className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm", 
               isPassed ? "bg-green-500/10 text-green-600 border-green-200" : "bg-red-500/10 text-red-600 border-red-200")}>
               {isPassed ? "COMPLETED" : "REVIEW REQUIRED"}
             </div>
             <span className="text-text-secondary text-xs font-medium">• {lastResult.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight font-display max-w-2xl leading-tight">
            {exam?.title || "Exam Results"}
          </h1>
        </div>

        <div className="relative z-10 md:text-right">
          <div className={cn("text-7xl sm:text-8xl font-black tracking-tighter leading-none", isPassed ? "text-text-primary" : "text-red-600")}>
            {lastResult.score}<span className="text-2xl font-bold ml-1 opacity-40">%</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 mt-3">Final Percentage</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-bg-panel border border-border rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-12 group shadow-sm">
          <div className="h-56 w-56 shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={chartData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={70} 
                  outerRadius={90} 
                  paddingAngle={8} 
                  dataKey="value" 
                  stroke="none"
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-black text-text-primary tracking-tighter">{lastResult.total}</div>
              <div className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Questions</div>
            </div>
          </div>

          <div className="flex-grow grid grid-cols-2 gap-4 w-full">
            {[
              { label: "Correct", val: correctCount, color: "text-blue-600", bg: "bg-blue-50/50" },
              { label: "Incorrect", val: incorrectCount, color: "text-red-600", bg: "bg-red-50/50" },
              { label: "Skipped", val: unattemptedCount, color: "text-text-secondary", bg: "bg-slate-50/50" },
              { label: "Time Taken", val: formatTime(lastResult.timeTaken), color: "text-text-primary", bg: "bg-bg" }
            ].map((stat, i) => (
              <div key={i} className={cn("p-5 rounded-2xl border border-border flex flex-col hover:shadow-sm transition-all", stat.bg)}>
                <span className="text-[9px] font-bold uppercase text-text-secondary/60 tracking-widest mb-1">{stat.label}</span>
                <span className={cn("text-2xl font-bold tracking-tight", stat.color)}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
           <button onClick={onViewExams} className="btn-primary w-full py-4 text-sm shadow-lg shadow-accent/20">
             {isHistory ? "Retake Exam" : "Browse More Exams"}
           </button>
           <button onClick={onViewDashboard} className="btn-secondary w-full py-4 text-sm">
             Back to Dashboard
           </button>
        </div>
      </div>

      {(lastResult.mode === "Practice" || lastResult.mode === "Hint" || isHistory) && exam && (
        <section className="space-y-8">
          <div className="section-label">Detailed Question Review</div>
          
          <div className="space-y-6">
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
                  const userMatches = Object.entries(userMapping);
                  if (userMatches.length === pairs.length) {
                    const expectedSet = pairs.map(p => `${p.left.trim()}|||${p.right.trim()}`).sort();
                    const userSet = userMatches.map(([lIdx, rIdx]) => {
                      const leftText = pairs[parseInt(lIdx)].left;
                      const rightText = pairs[rIdx].right;
                      return `${leftText.trim()}|||${rightText.trim()}`;
                    }).sort();
                    isCorrect = JSON.stringify(expectedSet) === JSON.stringify(userSet);
                  }
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
                      <div className="bg-bg p-5 rounded-xl border border-border">
                        <div className="text-[9px] font-bold uppercase text-text-secondary mb-4 tracking-widest">Your Choices</div>
                        <div className="space-y-2">
                          {userArr.length > 0 ? userArr.map(idx => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-bg-panel border border-border flex items-center justify-center font-bold text-[10px] text-text-primary">{String.fromCharCode(65 + idx)}</span>
                              <span className="text-xs text-text-secondary truncate">{options[idx]}</span>
                            </div>
                          )) : <div className="text-xs text-text-secondary opacity-40 font-medium">Not answered</div>}
                        </div>
                      </div>
                      <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                        <div className="text-[9px] font-bold uppercase text-blue-600 mb-4 tracking-widest">Correct Answer</div>
                        <div className="space-y-2">
                          {correctArr.map(idx => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">{String.fromCharCode(65 + idx)}</span>
                              <span className="text-xs font-semibold text-text-primary truncate">{options[idx]}</span>
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
                    <div className="bg-bg p-6 rounded-xl border border-border">
                      <div className="text-[9px] font-bold uppercase text-text-secondary mb-6 tracking-widest">Relationship Mapping</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pairs.map((p, lIdx) => {
                          const userMatch = userMapping[lIdx];
                          const isMatchCorrect = userMatch !== undefined && pairs.some(pRef => pRef.left.trim() === p.left.trim() && pRef.right.trim() === pairs[userMatch].right.trim());
                          return (
                            <div key={lIdx} className={cn("p-4 rounded-xl border flex flex-col gap-2 transition-colors", isMatchCorrect ? "bg-green-50/30 border-green-100" : "bg-red-50/30 border-red-100")}>
                               <div className="flex items-center justify-between">
                                 <span className="text-[9px] font-bold text-text-secondary lowercase tracking-wider opacity-60">pair {lIdx + 1}</span>
                                 <div className={cn("w-1.5 h-1.5 rounded-full", isMatchCorrect ? "bg-green-500" : "bg-red-500")} />
                               </div>
                               <div className="text-sm font-bold text-text-primary">{p.left}</div>
                               <div className="h-px bg-border my-1" />
                               <div className="text-xs text-text-secondary font-medium italic">
                                  {userMatch !== undefined ? pairs[userMatch].right : "No selection"}
                               </div>
                               {!isMatchCorrect && (
                                 <div className="mt-2 text-[10px] font-bold text-green-700 bg-green-100/50 p-2 rounded-lg">Correct: {p.right}</div>
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
                    <div className="bg-bg p-5 rounded-xl border border-border">
                       <div className="text-[9px] font-bold uppercase text-text-secondary mb-4 tracking-widest">Your Selection</div>
                       <div className="flex items-center gap-4">
                          <span className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm",
                            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          )}>
                            {userAns !== undefined ? String.fromCharCode(65 + userAns) : "-"}
                          </span>
                          <span className="font-bold text-text-primary">{userAns !== undefined ? options[userAns] : "Skipped"}</span>
                       </div>
                    </div>

                    {!isCorrect && (
                      <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                         <div className="text-[9px] font-bold uppercase text-blue-600 mb-4 tracking-widest">Correct Solution</div>
                         <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-200">
                              {String.fromCharCode(65 + (q.correctAnswer as number))}
                            </span>
                            <span className="font-bold text-text-primary">{options[q.correctAnswer as number]}</span>
                         </div>
                      </div>
                    )}
                  </div>
                );
              };

              return (
                <div key={q.id} className={cn(
                  "p-8 rounded-3xl border transition-all relative overflow-hidden group/item shadow-sm",
                  isCorrect ? "bg-bg-panel border-border" : "bg-red-50/10 border-red-100"
                )}>
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", isCorrect ? "bg-green-500" : "bg-red-500")} />
                  
                  <div className="flex items-start gap-6 sm:gap-8">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 border shadow-sm transition-all group-hover/item:scale-105",
                      isCorrect ? "bg-green-500 text-white border-green-400" : "bg-red-500 text-white border-red-400"
                    )}>
                      {qIdx + 1}
                    </div>
                    
                    <div className="flex-grow space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <span className={cn("text-[10px] font-bold tracking-wider uppercase", isCorrect ? "text-green-600" : "text-red-600")}>
                             {isCorrect ? "Correct Result" : "Incorrect Result"}
                           </span>
                        </div>
                        <p className="text-xl font-bold text-text-primary tracking-tight leading-snug">{q.text}</p>
                      </div>

                      <div className="relative z-10">
                        {renderAnswerInfo()}
                      </div>

                      {q.hint && (
                        <div className="flex items-start gap-4 bg-bg p-6 rounded-2xl border border-border relative overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-200 shrink-0">
                            <Lightbulb size={20} />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-amber-600 tracking-wider">Reference Info</span>
                            <p className="text-sm text-text-secondary leading-relaxed font-medium">{q.hint}</p>
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
