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
      const g = e.group || "Other Certification Tests";
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

  // If searching, we skip the category view and show all results
  const showCategoryView = !search && !selectedGroup;

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-16">
        <div className="flex items-center gap-6">
          {selectedGroup && !search && (
            <button 
              onClick={() => setSelectedGroup(null)}
              className="p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-api-gold hover:bg-api-gold/5 transition-all group"
            >
              <ChevronLeft className="text-api-navy group-hover:text-api-gold" size={32} />
            </button>
          )}
          <div>
            <h1 className="text-5xl font-black text-api-navy tracking-tight mb-2">
              {search ? "Search Results" : selectedGroup || "Select Category"}
            </h1>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              Professional Certification Catalog
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-[28rem] group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-api-gold transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search API modules..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-16 pr-8 py-5 border-2 rounded-[2rem] w-full border-gray-100 bg-white focus:ring-8 focus:ring-api-gold/5 focus:border-api-gold outline-none shadow-2xl shadow-blue-900/5 transition-all font-bold text-api-navy text-lg placeholder:text-gray-300"
          />
        </div>
      </header>

      {showCategoryView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
          {groupOrder.map((groupName) => {
            const count = (groupedExams[groupName] || []).length;
            const isFinalExam = groupName === "API 570 Final Exam";
            const isMainCode = groupName === "API 570 Main Code";
            
            return (
              <button
                key={groupName}
                onClick={() => setSelectedGroup(groupName)}
                className={cn(
                  "p-12 rounded-[3.5rem] text-left transition-all relative overflow-hidden group shadow-2xl min-h-[22rem]",
                  isFinalExam ? "bg-api-navy" : isMainCode ? "bg-api-gold" : "bg-slate-700"
                )}
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 group-hover:opacity-20 transition-all pointer-events-none">
                  {isFinalExam ? <BookOpen size={240} /> : <FileText size={240} />}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <span className={cn("font-black text-sm uppercase tracking-[0.3em] mb-4", isMainCode ? "text-api-navy/50" : "text-white/50")}>API Certification</span>
                  <h2 className={cn("text-4xl lg:text-5xl font-black mb-8 leading-tight max-w-[15rem]", isMainCode ? "text-api-navy" : "text-white")}>
                    {groupName}
                  </h2>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className={cn("px-6 py-3 rounded-2xl backdrop-blur-md", isMainCode ? "bg-api-navy/10" : "bg-white/10")}>
                      <span className={cn("font-black text-xs uppercase tracking-widest leading-none", isMainCode ? "text-api-navy" : "text-white")}>
                        {count} MODULES AVAILABLE
                      </span>
                    </div>
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center group-hover:translate-x-3 transition-transform", isMainCode ? "bg-api-navy text-white" : "bg-white text-api-navy")}>
                      <ArrowRight size={32} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : Object.keys(groupedExams).length > 0 ? (
        <div className="space-y-24">
          {(search ? Object.keys(groupedExams) : [selectedGroup!]).map(groupName => {
            const examsInGroup = groupedExams[groupName];
            if (!examsInGroup) return null;
 
            return (
              <section key={groupName} className="relative">
                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                  <div className="px-8 py-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm flex items-center gap-3 whitespace-nowrap">
                    <span className="text-xl font-black text-api-navy">{groupName}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-api-gold" />
                    <span className="text-api-gold font-black text-xs uppercase tracking-widest">{examsInGroup.length} AVAILABLE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {examsInGroup.map(exam => (
                    <div key={exam.id} className="bg-white p-8 rounded-[2rem] flex flex-col hover:shadow-2xl border-2 border-gray-50 hover:border-api-gold/30 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-gray-50 rounded-2xl text-api-navy">
                          <FileText size={24} />
                        </div>
                        <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm", exam.bookType === "Open Book" ? "bg-api-gold/10 text-api-navy" : "bg-red-50 text-red-500")}>
                          {exam.bookType}
                        </div>
                      </div>

                      <div className="mb-8">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] block mb-2">{exam.year} Edition</span>
                        <h3 className="text-xl font-black text-api-navy leading-tight group-hover:text-api-gold transition-colors min-h-[3rem] line-clamp-2">
                          {exam.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-8 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-api-gold" /> {exam.duration} Min</span>
                        {exam.questions.length > 0 && (
                          <span className="flex items-center gap-1.5"><Search size={14} className="text-api-navy" /> {exam.questions.length} Items</span>
                        )}
                      </div>

                      <div className="mt-auto space-y-2 pt-6 border-t border-gray-50">
                        <button 
                          onClick={() => onStartExam(exam, "Standard")} 
                          disabled={exam.questions.length === 0} 
                          className="w-full py-4 bg-api-navy text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-api-navy/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-30"
                        >
                          <Play size={14} className="fill-current" /> Start Test
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => onStartExam(exam, "Practice")} 
                            disabled={exam.questions.length === 0} 
                            className="bg-gray-50 text-api-navy hover:bg-api-gold hover:text-api-navy font-black py-3 rounded-xl flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest transition-all disabled:opacity-30 border border-gray-100"
                          >
                            Practice
                          </button>
                          <button 
                            onClick={() => onStartExam(exam, "Hint")} 
                            disabled={exam.questions.length === 0} 
                            className="bg-gray-50 text-api-gold hover:bg-api-gold hover:text-api-navy font-black py-3 rounded-xl flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest transition-all disabled:opacity-30 border border-gray-100"
                          >
                            Guided
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
        <div className="p-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-50 shadow-inner">
           <Search size={80} className="mx-auto text-gray-100 mb-8" />
           <p className="text-gray-400 font-black text-xl">No certification modules match your criteria.</p>
        </div>
      )}
    </div>
  );
};
