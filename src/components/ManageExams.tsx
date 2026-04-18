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
      title: "New Certification Exam",
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
    const confirmed = await confirmAction("Delete Exam", "Are you sure you want to permanently delete this exam and all its questions?");
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
      <div className="lg:col-span-12 section-label">Exam Management System</div>
      
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-bg-panel border border-border p-8 rounded-3xl sticky top-28 group shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-text-primary tracking-tight font-display">Exam Library</h2>
            <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">{exams.length} Items</div>
          </div>
          
          <button onClick={handleCreateExam} className="btn-primary w-full mb-8 py-3.5 text-xs shadow-lg shadow-accent/20">
            <Plus size={18} /> Create New Exam
          </button>
          
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {exams.map(e => (
              <div 
                key={e.id} 
                onClick={() => setEditingExam(e)} 
                className={cn(
                  "p-5 rounded-2xl cursor-pointer transition-all border flex flex-col gap-2 relative overflow-hidden group/item", 
                  editingExam?.id === e.id 
                    ? "bg-accent border-accent text-white shadow-md" 
                    : "bg-bg border-border hover:border-text-secondary/30 text-text-secondary"
                )}
              >
                <div className="flex justify-between items-start">
                   <div className="truncate flex-1">
                      <div className={cn("text-[9px] font-bold uppercase tracking-wider mb-1", editingExam?.id === e.id ? "text-white/70" : "text-text-secondary/50")}>ID: {e.id.slice(0, 8)}</div>
                      <h4 className={cn("font-bold text-sm truncate tracking-tight", editingExam?.id === e.id ? "text-white" : "text-text-primary")}>{e.title}</h4>
                   </div>
                   {!e.isDefault && (
                     <button 
                      onClick={(event) => { event.stopPropagation(); deleteExam(e.id); }} 
                      className={cn("p-2 rounded-lg transition-all ml-3", 
                        editingExam?.id === e.id ? "bg-white/20 text-white" : "bg-bg-panel text-text-secondary hover:text-red-500 border border-border"
                      )}
                    >
                      <Trash2 size={14} />
                    </button>
                   )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                   <div className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider", editingExam?.id === e.id ? "bg-white/20 text-white" : "bg-bg-panel text-text-secondary border border-border")}>{e.year}</div>
                   <div className={cn("h-1 flex-1 rounded-full overflow-hidden", editingExam?.id === e.id ? "bg-white/20" : "bg-bg")}>
                      <div className={cn("h-full", editingExam?.id === e.id ? "bg-white" : "bg-accent")} style={{ width: `${Math.min(100, (e.questions.length / 50) * 100)}%` }} />
                   </div>
                   <span className={cn("text-[10px] font-bold uppercase tracking-wider", editingExam?.id === e.id ? "text-white/80" : "text-text-secondary/60")}>{e.questions.length} Qs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="lg:col-span-8">
        {editingExam ? (
          <div className="bg-bg-panel border border-border rounded-3xl p-8 sm:p-12 space-y-12 group shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-border">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest ml-1">Exam Title</label>
                <input 
                  type="text" 
                  value={editingExam.title} 
                  onChange={(e) => updateExamField("title", e.target.value)} 
                  disabled={editingExam.isDefault}
                  className={cn(
                    "w-full px-6 py-4 bg-bg border border-border rounded-2xl outline-none font-bold text-text-primary tracking-tight transition-all text-lg",
                    editingExam.isDefault ? "opacity-50 cursor-not-allowed" : "focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  )} 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest text-center block">Year</label>
                  <input 
                    type="text" 
                    value={editingExam.year} 
                    onChange={(e) => updateExamField("year", e.target.value)} 
                    disabled={editingExam.isDefault}
                    className={cn(
                      "w-full px-2 py-4 bg-bg border border-border rounded-xl outline-none font-bold text-accent text-center transition-all",
                      editingExam.isDefault && "opacity-50 cursor-not-allowed"
                    )} 
                  />
                </div>
                <div className="space-y-3 text-center">
                  <label className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest block">Type</label>
                  <select 
                    value={editingExam.bookType} 
                    onChange={(e) => updateExamField("bookType", e.target.value)} 
                    disabled={editingExam.isDefault}
                    className={cn(
                      "w-full px-2 py-4 bg-bg border border-border rounded-xl outline-none font-bold text-text-primary appearance-none text-center transition-all uppercase text-xs",
                      editingExam.isDefault ? "opacity-50 cursor-not-allowed" : "focus:border-accent"
                    )}
                  >
                    <option value="Open Book">OPEN</option>
                    <option value="Close Book">CLOSE</option>
                  </select>
                </div>
                <div className="space-y-3 text-center">
                  <label className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest block">Mins</label>
                  <input 
                    type="number" 
                    value={editingExam.duration} 
                    onChange={(e) => updateExamField("duration", parseInt(e.target.value))} 
                    disabled={editingExam.isDefault}
                    className={cn(
                      "w-full px-2 py-4 bg-bg border border-border rounded-xl outline-none font-bold text-amber-600 text-center transition-all",
                      editingExam.isDefault && "opacity-50 cursor-not-allowed"
                    )} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <header className="flex flex-col sm:flex-row justify-between sm:items-center bg-bg p-8 rounded-3xl border border-border gap-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary tracking-tight">Question Bank</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Selected Module: <span className="text-accent ml-1">{editingExam.questions.length} Questions</span></p>
                  </div>
                </div>
                {!editingExam.isDefault && (
                  <button 
                    onClick={() => { setEditingQuestionIndex(null); setTempQuestion({ text: "", options: ["", "", "", ""], correctAnswer: 0 }); setIsQuestionModalOpen(true); }} 
                    className="btn-primary py-3 px-8 text-[10px]"
                  >
                    <Plus size={16} /> Add Question
                  </button>
                )}
              </header>
              
              <div className="grid grid-cols-1 gap-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {editingExam.questions.map((q, idx) => (
                  <div key={q.id} className="bg-bg p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start gap-8 border border-border hover:border-accent transition-all group/row relative shadow-sm">
                    <div className="flex-grow space-y-6">
                      <div className="flex items-start gap-6">
                        <span className="w-10 h-10 shrink-0 flex items-center justify-center bg-bg-panel border border-border text-text-primary rounded-xl text-xs font-bold shadow-sm">{idx + 1}</span>
                        <div className="space-y-2 pt-1">
                          <p className="text-lg font-bold text-text-primary leading-snug tracking-tight">{q.text}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className={cn("text-[9px] py-2 rounded-lg border font-bold transition-all text-center uppercase tracking-widest", 
                             oIdx === q.correctAnswer ? "border-accent text-accent bg-accent/[0.03]" : "border-border text-text-secondary/60 bg-bg-panel")}>
                            {String.fromCharCode(65 + oIdx)}
                          </div>
                        ))}
                      </div>
                    </div>
                    {!editingExam.isDefault && (
                      <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover/row:opacity-100 transition-all">
                        <button onClick={() => { setEditingQuestionIndex(idx); setTempQuestion({ ...q }); setIsQuestionModalOpen(true); }} className="flex-1 md:flex-none p-3 bg-bg-panel text-text-secondary rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center border border-border hover:border-accent"><Edit3 size={16} /></button>
                        <button onClick={async () => {
                          const confirmed = await confirmAction("Delete Question", "Are you sure you want to remove this question?");
                          if (confirmed) {
                            const updatedQuestions = editingExam.questions.filter((_, i) => i !== idx);
                            updateExamField("questions", updatedQuestions);
                          }
                        }} className="flex-1 md:flex-none p-3 bg-bg-panel text-text-secondary rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-border hover:border-red-500"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </div>
                ))}
                {editingExam.questions.length === 0 && (
                   <div className="p-20 text-center border-2 border-dashed border-border rounded-3xl text-text-secondary/40 font-bold uppercase text-[10px] tracking-widest flex flex-col items-center gap-6">
                      <div className="w-16 h-16 bg-bg-panel rounded-full flex items-center justify-center">
                         <AlertCircle size={32} />
                      </div>
                      No questions found for this exam
                   </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[500px] bg-bg-panel border border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-text-secondary/40 space-y-8 shadow-inner group">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="w-32 h-32 bg-bg rounded-full flex items-center justify-center border border-border shadow-sm opacity-50 group-hover:opacity-100 transition-opacity">
               <Plus size={48} className="text-text-secondary/20" />
            </motion.div>
            <div className="space-y-4">
              <p className="font-bold text-2xl text-text-primary tracking-tight">Editor Dashboard</p>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                Select an exam from the left panel to begin editing or create a new one to start your collection.
              </p>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isQuestionModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={() => setIsQuestionModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-bg-panel rounded-3xl p-8 sm:p-12 max-w-2xl w-full shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar border border-border">
              <div className="section-label mb-8">Question Editor</div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-12 flex items-center gap-4 leading-none tracking-tight">
                 <div className="p-3 bg-accent/10 border border-accent/20 rounded-2xl text-accent">{editingQuestionIndex !== null ? <Edit3 size={24} /> : <Plus size={24} />}</div>
                 {editingQuestionIndex !== null ? "Edit Question" : "Add New Question"}
              </h3>

              <div className="space-y-10">
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Question Text</label>
                   <textarea 
                     value={tempQuestion.text} 
                     onChange={(e) => setTempQuestion({ ...tempQuestion, text: e.target.value })} 
                     className="w-full px-8 py-8 bg-bg border border-border rounded-2xl outline-none font-bold text-text-primary h-40 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-lg tracking-tight placeholder:text-text-secondary/20" 
                     placeholder="Enter your question here..." 
                   />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1 mb-1">Answer Choices</label>
                  {tempQuestion.options?.map((opt, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-xl font-bold text-text-secondary/20 group-hover:text-accent/40 transition-colors">{String.fromCharCode(65 + idx)}</div>
                      <input 
                        type="text" 
                        value={opt} 
                        onChange={(e) => { const opts = [...tempQuestion.options!]; opts[idx] = e.target.value; setTempQuestion({ ...tempQuestion, options: opts }); }} 
                        className={cn("w-full px-8 py-5 bg-bg border border-border rounded-xl outline-none font-bold text-text-primary text-md transition-all pr-20", 
                           tempQuestion.correctAnswer === idx ? "ring-2 ring-accent border-accent bg-accent/[0.02]" : "focus:border-text-secondary/30")} 
                        placeholder={`Choice ${String.fromCharCode(65 + idx)}...`}
                      />
                      <button 
                        onClick={() => setTempQuestion({ ...tempQuestion, correctAnswer: idx })} 
                        className={cn("absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all shadow-sm border", 
                           tempQuestion.correctAnswer === idx ? "bg-accent text-white border-accent" : "bg-bg-panel text-text-secondary border-border hover:border-text-secondary/30")}
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Hint / Reference (Optional)</label>
                   <input 
                     type="text" 
                     value={tempQuestion.hint || ""} 
                     onChange={(e) => setTempQuestion({ ...tempQuestion, hint: e.target.value })} 
                     className="w-full px-8 py-5 bg-bg border border-border rounded-xl outline-none font-semibold text-text-secondary focus:border-amber-500 transition-all text-sm" 
                     placeholder="Enter reference info..." 
                   />
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                <button onClick={() => setIsQuestionModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest text-text-secondary hover:bg-bg transition-all">Cancel</button>
                <button onClick={handleSaveQuestion} className="btn-primary flex-1 py-4 text-[10px]">
                   <Save size={18} /> {editingQuestionIndex !== null ? "Update Question" : "Save Question"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
