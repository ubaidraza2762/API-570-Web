import React, { useState } from "react";
import { Plus, Trash2, Edit3, Save, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Exam, Question } from "../types";
import { cn } from "../lib/utils";

interface ManageExamsProps {
  exams: Exam[];
  onUpdateExams: (exams: Exam[]) => void;
  confirmAction: (title: string, message: string) => Promise<boolean>;
}

export const ManageExams: React.FC<ManageExamsProps> = ({ 
  exams, 
  onUpdateExams, 
  confirmAction 
}) => {
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [tempQuestion, setTempQuestion] = useState<Partial<Question>>({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const handleCreateExam = () => {
    const newExam: Exam = {
      id: crypto.randomUUID(),
      title: "New Mock Exam Profile",
      year: new Date().getFullYear().toString(),
      category: "General",
      bookType: "Close Book",
      duration: 120,
      questions: []
    };
    onUpdateExams([newExam, ...exams]);
    setEditingExam(newExam);
  };

  const deleteExam = async (id: string) => {
    const confirmed = await confirmAction("Delete Exam Profile", "Permanently delete this exam profile and all its questions?");
    if (confirmed) {
      onUpdateExams(exams.filter(e => e.id !== id));
      if (editingExam?.id === id) setEditingExam(null);
    }
  };

  const updateExamField = (field: keyof Exam, value: any) => {
    if (!editingExam) return;
    const updated = { ...editingExam, [field]: value };
    setEditingExam(updated);
    onUpdateExams(exams.map(e => e.id === updated.id ? updated : e));
  };

  const handleSaveQuestion = () => {
    if (!editingExam || !tempQuestion.text) return;
    const q: Question = {
      id: tempQuestion.id || crypto.randomUUID(),
      text: tempQuestion.text,
      options: tempQuestion.options as string[],
      correctAnswer: tempQuestion.correctAnswer as number,
      hint: tempQuestion.hint
    };
    let updatedQuestions = [...editingExam.questions];
    if (editingQuestionIndex !== null) updatedQuestions[editingQuestionIndex] = q;
    else updatedQuestions.push(q);
    const updatedExam = { ...editingExam, questions: updatedQuestions };
    setEditingExam(updatedExam);
    onUpdateExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
    setIsQuestionModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <aside className="lg:col-span-4 space-y-4 w-full h-full">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white h-full sticky top-28">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-api-navy tracking-tight">Catalog Profiles</h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">{exams.length} Total</span>
          </div>
          <button onClick={handleCreateExam} className="btn-secondary w-full mb-8">
            <Plus size={18} /> New Architecture Profile
          </button>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {exams.map(e => (
              <div 
                key={e.id} 
                onClick={() => setEditingExam(e)} 
                className={cn(
                  "p-5 rounded-[2rem] cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden border-2", 
                  editingExam?.id === e.id ? "bg-api-navy border-api-navy text-white shadow-2xl shadow-blue-900/20" : "bg-white border-gray-50 hover:border-gray-100 hover:bg-gray-50/50"
                )}
              >
                <div className="truncate pr-4">
                   <h4 className="font-black text-sm truncate uppercase tracking-tight">{e.title}</h4>
                   <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full font-black uppercase tracking-widest">{e.year}</span>
                     <span className="text-[10px] opacity-40 font-black uppercase tracking-widest">/ {e.questions.length} Items</span>
                   </div>
                </div>
                <button 
                  onClick={(event) => { event.stopPropagation(); deleteExam(e.id); }} 
                  className={cn("p-2.5 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm", editingExam?.id === e.id ? "bg-white/10 text-white/40" : "bg-gray-50 text-gray-300")}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="lg:col-span-8 w-full">
        {editingExam ? (
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-10 sm:p-14 border border-white space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pb-10 border-b border-gray-50">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Architectural Title</label>
                <input 
                  type="text" 
                  value={editingExam.title} 
                  onChange={(e) => updateExamField("title", e.target.value)} 
                  className="w-full px-6 py-5 bg-gray-50 rounded-3xl outline-none font-black text-api-navy border-2 border-transparent focus:border-api-gold focus:bg-white transition-all shadow-inner text-lg" 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Iteration</label>
                  <input 
                    type="text" 
                    value={editingExam.year} 
                    onChange={(e) => updateExamField("year", e.target.value)} 
                    className="w-full px-4 py-5 bg-gray-50 rounded-3xl outline-none font-black text-api-navy text-center border-2 border-transparent focus:border-api-gold transition-all" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <div className="relative">
                    <select 
                      value={editingExam.bookType} 
                      onChange={(e) => updateExamField("bookType", e.target.value)} 
                      className="w-full px-4 py-5 bg-gray-50 rounded-3xl outline-none font-black text-api-navy appearance-none border-2 border-transparent focus:border-api-gold transition-all"
                    >
                      <option value="Open Book">Open</option>
                      <option value="Close Book">Close</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Session</label>
                  <input 
                    type="number" 
                    value={editingExam.duration} 
                    onChange={(e) => updateExamField("duration", parseInt(e.target.value))} 
                    className="w-full px-4 py-5 bg-gray-50 rounded-3xl outline-none font-black text-api-navy text-center border-2 border-transparent focus:border-api-gold transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 p-8 rounded-[2rem] gap-6 border border-gray-100">
                <div>
                  <h3 className="text-xl font-black text-api-navy tracking-tight">Technical Data Units</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Populated Segment: <span className="text-api-navy px-2 py-0.5 bg-blue-50 rounded-lg ml-1 font-black">{editingExam.questions.length} Units</span></p>
                </div>
                <button 
                  onClick={() => { setEditingQuestionIndex(null); setTempQuestion({ text: "", options: ["", "", "", ""], correctAnswer: 0 }); setIsQuestionModalOpen(true); }} 
                  className="btn-primary"
                >
                  <Plus size={18} /> Incorporate Protocol
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                {editingExam.questions.map((q, idx) => (
                  <div key={q.id} className="bg-white p-8 rounded-huge flex flex-col sm:flex-row justify-between items-start gap-8 border-2 border-gray-50 hover:border-api-gold/30 group transition-all relative">
                    <div className="flex-grow space-y-6">
                      <div className="flex items-start gap-5">
                        <span className="w-10 h-10 shrink-0 flex items-center justify-center bg-api-navy text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-900/10">{idx + 1}</span>
                        <p className="text-lg font-bold text-api-navy leading-relaxed line-clamp-2">{q.text}</p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className={cn("text-[10px] px-4 py-2 rounded-xl border-2 font-black transition-all text-center", oIdx === q.correctAnswer ? "border-api-navy text-api-navy bg-blue-50/50" : "border-gray-50 text-gray-300")}>{String.fromCharCode(65 + oIdx)}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0 opacity-1 sm:opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => { setEditingQuestionIndex(idx); setTempQuestion({ ...q }); setIsQuestionModalOpen(true); }} className="flex-1 sm:flex-none p-3.5 bg-gray-50 text-api-navy rounded-2xl hover:bg-api-gold hover:text-white transition-all flex items-center justify-center shadow-sm"><Edit3 size={18} /></button>
                      <button onClick={async () => {
                         const confirmed = await confirmAction("Initialize Purge", "Permanently excise this protocol from the master profile?");
                         if (confirmed) {
                           const updatedQuestions = editingExam.questions.filter((_, i) => i !== idx);
                           updateExamField("questions", updatedQuestions);
                         }
                      }} className="flex-1 sm:flex-none p-3.5 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {editingExam.questions.length === 0 && (
                   <div className="p-28 text-center border-4 border-dashed border-gray-50 rounded-[3rem] text-gray-200 font-black italic uppercase text-sm tracking-[0.2em] flex flex-col items-center gap-10">
                      <AlertCircle size={60} className="text-gray-100" />
                      Zero Data Ingested
                   </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[600px] bg-white border-2 border-dashed border-gray-100 rounded-[4rem] flex flex-col items-center justify-center p-20 text-center text-gray-300 space-y-8 shadow-inner">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 shadow-sm"><Plus size={64} className="text-gray-100" /></motion.div>
            <div>
              <p className="font-black text-2xl text-gray-400 mb-4 uppercase tracking-tighter">Composition Stage</p>
              <p className="text-sm font-bold text-gray-300 uppercase tracking-widest max-w-sm mx-auto leading-loose">Initialize an existing architectural profile from the catalog to modify standard protocols.</p>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isQuestionModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-api-navy/70 backdrop-blur-md" onClick={() => setIsQuestionModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar border border-white">
              <h3 className="text-3xl font-black text-api-navy mb-10 uppercase tracking-tighter flex items-center gap-4">
                 <div className="p-3 bg-blue-50 rounded-3xl text-api-gold shadow-sm">{editingQuestionIndex !== null ? <Edit3 size={24} /> : <Plus size={24} />}</div>
                 {editingQuestionIndex !== null ? "Modify Protocol" : "New Composite Protocol"}
              </h3>
              <div className="space-y-10">
                <div className="space-y-3 px-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Narrative</label>
                   <textarea 
                     value={tempQuestion.text} 
                     onChange={(e) => setTempQuestion({ ...tempQuestion, text: e.target.value })} 
                     className="w-full px-8 py-8 bg-gray-50 rounded-[2rem] outline-none font-bold text-api-navy h-40 focus:ring-4 focus:ring-api-gold/10 focus:border-api-gold focus:bg-white transition-all text-lg shadow-inner" 
                     placeholder="State the technical protocol requirements..." 
                   />
                </div>
                <div className="grid grid-cols-1 gap-6 px-1">
                  {tempQuestion.options?.map((opt, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className={cn("text-[9px] font-black uppercase flex justify-between tracking-widest ml-1", tempQuestion.correctAnswer === idx ? "text-api-gold" : "text-gray-400")}>
                         Channel {String.fromCharCode(65 + idx)} {tempQuestion.correctAnswer === idx && <span className="bg-yellow-100 px-3 py-0.5 rounded-full text-[8px] text-api-gold font-black tracking-widest">VALIDATED</span>}
                      </label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={opt} 
                          onChange={(e) => { const opts = [...tempQuestion.options!]; opts[idx] = e.target.value; setTempQuestion({ ...tempQuestion, options: opts }); }} 
                          className={cn("w-full px-8 py-5 bg-gray-50 rounded-[1.5rem] outline-none font-bold pr-16 transition-all border-2 text-lg", tempQuestion.correctAnswer === idx ? "border-api-gold bg-yellow-50/20" : "border-transparent focus:border-gray-200 focus:bg-white shadow-inner")} 
                        />
                        <button 
                          onClick={() => setTempQuestion({ ...tempQuestion, correctAnswer: idx })} 
                          className={cn("absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all shadow-sm", tempQuestion.correctAnswer === idx ? "bg-api-gold text-white" : "bg-white text-gray-200 hover:text-api-navy hover:border-gray-100 border border-transparent")}
                        >
                          <CheckCircle2 size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 px-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Analytical Framework (Insight)</label>
                   <input 
                     type="text" 
                     value={tempQuestion.hint || ""} 
                     onChange={(e) => setTempQuestion({ ...tempQuestion, hint: e.target.value })} 
                     className="w-full px-8 py-6 bg-gray-50 rounded-[1.5rem] outline-none font-bold text-api-navy focus:ring-4 focus:ring-api-gold/10 focus:border-api-gold focus:bg-white transition-all italic text-sm shadow-inner" 
                     placeholder="Technical guidance for correct interpretation..." 
                   />
                </div>
              </div>
              <div className="mt-14 pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                <button onClick={() => setIsQuestionModalOpen(false)} className="flex-1 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all border-2 border-transparent hover:border-gray-100">Discard Protocol</button>
                <button onClick={handleSaveQuestion} className="btn-primary flex-1 py-5 text-sm">
                   <Save size={20} /> {editingQuestionIndex !== null ? "Commit Update" : "Inject Protocol"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
