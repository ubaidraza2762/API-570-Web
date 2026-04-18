import React, { useState, useMemo } from "react";
import { Search, FileText, Clock, Play, BookOpen, Lightbulb, ChevronLeft, ArrowRight } from "lucide-react";
import { Exam, ExamMode } from "../types";
import { cn } from "../lib/utils";

interface ExamBrowserProps {
  exams: Exam[];
  onStartExam: (exam: Exam, mode: ExamMode) => void;
}

export const ExamBrowser: React.FC<ExamBrowserProps> = ({ exams, onStartExam }) => {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredExams = useMemo(() => {
    return exams.filter(e => 
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.year.includes(search) ||
      (e.category && e.category.toLowerCase().includes(search.toLowerCase()))
    );
  }, [exams, search]);

  const groupedExams = useMemo(() => {
    const groups: Record<string, Exam[]> = {};
    filteredExams.forEach(e => {
      const g = e.group || "Other Certifications";
      if (!groups[g]) groups[g] = [];
      groups[g].push(e);
    });
    return groups;
  }, [filteredExams]);

  const groupOrder = useMemo(() => {
    const baseOrder = ["API 570 Final Exam", "API 570 Main Code"];
    const allGroups = Object.keys(groupedExams);
    const others = allGroups.filter(g => !baseOrder.includes(g));
    return [...baseOrder, ...others];
  }, [groupedExams]);

  const showCategoryView = !search && !selectedGroup;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div className="flex items-center gap-4">
          {selectedGroup && !search && (
            <button 
              onClick={() => setSelectedGroup(null)}
              className="p-3 bg-bg-panel border border-border rounded-xl hover:bg-bg transition-all shadow-sm"
              title="Back to Categories"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight font-display">
              {search ? "Search Results" : selectedGroup || "Assessment Categories"}
            </h1>
            <p className="text-xs text-text-secondary mt-1">Browse available certification study modules</p>
          </div>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-50 group-focus-within:text-accent transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by title, year, or code..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tech-input pl-11 pr-4 py-3 text-sm placeholder:text-text-secondary/50"
          />
        </div>
      </header>

      {showCategoryView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupOrder.map((groupName) => {
            const count = (groupedExams[groupName] || []).length;
            const isFinalExam = groupName === "API 570 Final Exam";
            const isMainCode = groupName === "API 570 Main Code";
            
            return (
              <button
                key={groupName}
                onClick={() => setSelectedGroup(groupName)}
                className={cn(
                  "p-8 rounded-3xl text-left transition-all relative overflow-hidden group border border-border hover:shadow-lg",
                  isFinalExam ? "bg-accent/[0.03]" : isMainCode ? "bg-emerald-500/[0.03]" : "bg-bg-panel"
                )}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
                  {isFinalExam ? <BookOpen size={200} /> : <FileText size={200} />}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn("w-1.5 h-1.5 rounded-full", isFinalExam ? "bg-accent" : isMainCode ? "bg-emerald-500" : "bg-text-secondary")} />
                    <span className="font-bold text-[10px] uppercase tracking-wider text-text-secondary/60">Study Resource Group</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-text-primary mb-6 leading-tight tracking-tight font-display">
                    {groupName}
                  </h2>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-3xl font-black text-text-primary tracking-tighter">{count}</span>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Modules Available</span>
                    </div>
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm border border-border",
                      isFinalExam ? "bg-accent/10 text-accent" : "bg-emerald-500/10 text-emerald-600"
                    )}>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : Object.keys(groupedExams).length > 0 ? (
        <div className="space-y-16">
          {(search ? Object.keys(groupedExams) : [selectedGroup!]).map(groupName => {
            const examsInGroup = groupedExams[groupName];
            if (!examsInGroup) return null;
 
            return (
              <section key={groupName} className="space-y-8">
                <div className="section-label">{groupName} ({examsInGroup.length})</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {examsInGroup.map(exam => (
                    <div key={exam.id} className="glass-card flex flex-col group relative overflow-hidden p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                          <FileText size={18} />
                        </div>
                        <div className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border",
                          exam.bookType === "Open Book" ? "bg-blue-500/5 text-blue-600 border-blue-200/50" : "bg-orange-500/5 text-orange-600 border-orange-200/50"
                        )}>
                          {exam.bookType}
                        </div>
                      </div>

                      <div className="mb-8 space-y-2">
                        <span className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest flex items-center gap-2">
                           {exam.year} Edition
                        </span>
                        <h3 className="text-lg font-bold text-text-primary leading-tight tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                          {exam.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] text-text-secondary/70 mb-8 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="opacity-40" /> {exam.duration}m</span>
                        {exam.questions.length > 0 && (
                          <span className="flex items-center gap-1.5 font-mono"><Search size={14} className="opacity-40" /> q:{exam.questions.length}</span>
                        )}
                      </div>

                      <div className="mt-auto space-y-2 pt-6 border-t border-border">
                        <button 
                          onClick={() => onStartExam(exam, "Standard")} 
                          disabled={exam.questions.length === 0} 
                          className="btn-primary w-full py-2.5 text-xs disabled:opacity-20"
                        >
                          <Play size={12} className="fill-current" /> Start Practice
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => onStartExam(exam, "Practice")} 
                            disabled={exam.questions.length === 0} 
                            className="bg-bg hover:bg-bg-panel border border-border text-text-secondary text-[10px] font-bold py-2 rounded-lg transition-colors uppercase tracking-wider disabled:opacity-30"
                          >
                            Drill
                          </button>
                          <button 
                            onClick={() => onStartExam(exam, "Hint")} 
                            disabled={exam.questions.length === 0} 
                            className="bg-bg hover:bg-bg-panel border border-border text-text-secondary text-[10px] font-bold py-2 rounded-lg transition-colors uppercase tracking-wider disabled:opacity-30"
                          >
                            Hints
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-bg-panel border border-border rounded-3xl flex flex-col items-center gap-6 shadow-sm">
           <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center">
             <Search size={32} className="text-text-secondary opacity-20" />
           </div>
           <p className="text-text-secondary font-bold text-lg">No Results Found</p>
           <button onClick={() => {setSearch(""); setSelectedGroup(null);}} className="text-accent text-xs font-bold uppercase tracking-wider hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};
