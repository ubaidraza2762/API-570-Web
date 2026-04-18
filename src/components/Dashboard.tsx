import React from "react";
import { Plus, RotateCcw, Clock, FileText, PieChart as PieChartIcon } from "lucide-react";
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
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-api-navy tracking-tight mb-1">Dashboard</h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">API Certification Control Panel</p>
        </div>
        <button onClick={onViewManage} className="btn-primary">
          <Plus size={18} /> New Examination Profile
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all">
          <div className="p-4 bg-blue-50 text-api-navy rounded-3xl group-hover:bg-api-navy group-hover:text-white transition-colors duration-500"><FileText size={24} /></div>
          <div className="text-right">
            <div className="text-4xl font-black text-api-navy tracking-tighter">{totalExams}</div>
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Catalog Total</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-yellow-900/5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all">
          <div className="p-4 bg-yellow-50 text-api-gold rounded-3xl group-hover:bg-api-gold group-hover:text-api-navy transition-colors duration-500"><PieChartIcon size={24} /></div>
          <div className="text-right">
            <div className="text-4xl font-black text-api-navy tracking-tighter">{avgScore}%</div>
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Aggregate Acc.</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all">
          <div className="p-4 bg-blue-50 text-api-navy rounded-3xl group-hover:bg-api-navy group-hover:text-white transition-colors duration-500"><Clock size={24} /></div>
          <div className="text-right">
            <div className="text-4xl font-black text-api-navy tracking-tighter">{attempts.length}</div>
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Sessions</h3>
          </div>
        </div>
      </div>

      <section className="mt-12 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black flex items-center gap-3 text-api-navy tracking-tight"><RotateCcw size={22} className="text-api-gold" /> Historical Records</h2>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Recent Activity</span>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          {attempts.length === 0 ? (
            <div className="p-20 text-center text-gray-300 italic text-sm font-bold uppercase tracking-widest">Null Sessions Detected</div>
          ) : (
            <table className="w-full text-left min-w-[600px]">
              <thead className="text-api-navy text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                <tr>
                  <th className="pb-6 px-4">Timestamp</th>
                  <th className="pb-6 px-4">Examination Module</th>
                  <th className="pb-6 px-4 text-center">Modality</th>
                  <th className="pb-6 px-4 text-center">Result</th>
                  <th className="pb-6 px-4 text-right">Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {attempts.slice(0, 10).map(a => (
                   <tr 
                    key={a.id} 
                    onClick={() => onSelectAttempt(a)}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group/row"
                  >
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400">{a.date}</td>
                    <td className="px-6 py-4 text-xs font-bold text-api-navy">{exams.find(e => e.id === a.examId)?.title || "Deleted Exam"}</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-gray-100 text-api-navy text-[9px] font-black uppercase rounded">{a.mode}</span></td>
                    <td className="px-6 py-4 text-center font-black">
                       <span className={cn(a.score >= 70 ? "text-api-navy" : "text-red-500")}>{a.score}%</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full ml-auto overflow-hidden">
                         <div className={cn("h-full rounded-full", a.score >= 70 ? "bg-api-navy" : "bg-red-500")} style={{ width: `${a.score}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};
