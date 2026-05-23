import React from "react";
import { Plus, RotateCcw, Clock, FileText, PieChart as PieChartIcon, LayoutDashboard, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Exam, ExamAttempt } from "../types";
import { cn } from "../lib/utils";

interface DashboardProps {
  exams: Exam[];
  attempts: ExamAttempt[];
  onViewManage: () => void;
  onSelectAttempt: (attempt: ExamAttempt) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ exams, attempts, onViewManage, onSelectAttempt }) => {
  const totalExams = exams.length;
  const validAttempts = attempts.filter(a => typeof a.score === 'number');
  const avgScore = validAttempts.length 
    ? Math.round(validAttempts.reduce((acc, curr) => acc + curr.score, 0) / validAttempts.length) 
    : 0;

  return (
    <div className="space-y-12 pb-10">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 glass-card flex flex-col justify-between overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
            <LayoutDashboard size={140} className="text-accent" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
              <PieChartIcon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Performance Average</p>
              <h3 className="text-3xl font-bold text-text-primary tracking-tight font-display">Learning Progress</h3>
            </div>
          </div>
          <div className="flex items-end justify-between mt-10 relative z-10">
            <div className="text-6xl font-black text-text-primary tracking-tighter">
              {avgScore}<span className="text-xl font-bold ml-1 text-accent">%</span>
            </div>
            <button onClick={onViewManage} className="btn-primary scale-90 origin-bottom-right shadow-lg shadow-accent/20">
              <Plus size={16} /> Create Exam
            </button>
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between group">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20 mb-6">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Total Exams</p>
            <div className="text-5xl font-black text-text-primary tracking-tight">{totalExams}</div>
            <p className="text-[11px] font-medium text-text-secondary mt-2">Available in library</p>
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between group">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20 mb-6">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Total Sessions</p>
            <div className="text-5xl font-black text-text-primary tracking-tight">{attempts.length}</div>
            <p className="text-[11px] font-medium text-text-secondary mt-2">Completed attempts</p>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="section-label">Performance History / Recent Activity</div>
        
        <div className="bg-bg-panel border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            {attempts.length === 0 ? (
              <div className="py-24 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-bg flex items-center justify-center"><AlertCircle className="text-text-secondary opacity-30" size={32} /></div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-text-secondary">No activity recorded yet</p>
                  <p className="text-xs text-text-secondary opacity-60">Complete an exam to see your results here.</p>
                </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-bg/50">
                    <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Date & Time</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Exam Module</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Outcome</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attempts.slice(0, 8).map(a => (
                    <tr 
                      key={a.id} 
                      onClick={() => onSelectAttempt(a)}
                      className="hover:bg-bg/50 transition-colors cursor-pointer group/row"
                    >
                      <td className="px-8 py-5">
                        <div className="text-xs font-medium text-text-secondary">{a.date}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-primary tracking-tight">{exams.find(e => e.id === a.examId)?.title || "Deleted Exam"}</span>
                          <span className="text-[10px] text-text-secondary opacity-60 font-mono">ID: {a.id.slice(0, 8)}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                          a.score >= 90 ? "bg-green-500/10 text-green-600 border-green-200" : "bg-red-500/10 text-red-600 border-red-200"
                        )}>
                          {a.score >= 90 ? "Pass" : "Fail"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-6">
                          <div className={cn("text-xl font-bold tracking-tight", a.score >= 90 ? "text-text-primary" : "text-red-500")}>
                            {a.score}%
                          </div>
                          <div className="w-2 h-10 bg-bg rounded-full relative overflow-hidden flex items-end">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${a.score}%` }}
                              className={cn("w-full transition-colors", a.score >= 90 ? "bg-accent" : "bg-red-500")} 
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
