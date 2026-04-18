import React from "react";
import { Moon, Sun, Monitor, User, Info, Smartphone, FileUp, FileDown, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";

type Theme = "light" | "dark" | "system";

interface SettingsProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onImportData: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  theme, 
  onThemeChange,
  onImportData
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 mt-10">
      <div className="section-label">Preference Configuration / System Parameters</div>
      
      {/* Theme Selection */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <Monitor className="text-accent" size={24} />
          Visual Appearance
        </h3>
        <p className="text-sm text-text-secondary">Configure the primary interface luminosity to optimize your visual focus environment.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "light" as Theme, label: "Light Mode", icon: Sun, desc: "High clarity for bright environments" },
            { id: "dark" as Theme, label: "Dark Mode", icon: Moon, desc: "Reduced strain for low light setups" },
            { id: "system" as Theme, label: "System Sync", icon: Smartphone, desc: "Automatically match device settings" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onThemeChange(item.id)}
              className={cn(
                "p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 group hover:shadow-md",
                theme === item.id 
                  ? "border-accent bg-accent/5" 
                  : "border-border bg-bg-panel hover:border-accent/30"
              )}
            >
              <div className={cn(
                "p-3 rounded-xl w-fit transition-colors",
                theme === item.id ? "bg-accent text-white" : "bg-bg text-text-secondary group-hover:text-accent"
              )}>
                <item.icon size={20} />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">{item.label}</div>
                <div className="text-[11px] text-text-secondary mt-1">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Data Management */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <Info className="text-accent" size={24} />
          Data & Repository
        </h3>
        <p className="text-sm text-text-secondary">Manage your local exam database. Synchronization and redundancy controls.</p>
        
        <div className="glass-panel rounded-2xl p-8 flex flex-col sm:flex-row gap-6">
          <button 
            onClick={onImportData}
            className="flex-grow btn-secondary py-5 flex items-center justify-center gap-3"
          >
            <FileUp size={20} />
            Import Database
          </button>
        </div>
      </section>

      {/* Profile Info (Mock) */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <User className="text-accent" size={24} />
          Operator Profile
        </h3>
        <div className="glass-panel rounded-2xl p-10 flex items-center gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={120} />
          </div>
          <div className="w-20 h-20 rounded-full bg-accent/10 border-4 border-accent/20 flex items-center justify-center text-accent font-black text-2xl">
            API
          </div>
          <div>
            <h4 className="text-xl font-black italic uppercase tracking-tighter">System Administrator</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] font-black uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">Pro Member</span>
              <span className="text-[10px] font-black uppercase text-text-secondary flex items-center gap-1">
                <Smartphone size={12} /> Mobile Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <div className="pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4 text-text-secondary">
          <HelpCircle size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest italic">Version Protocol v.2.4.0-Alpha</span>
        </div>
        <div className="flex items-center gap-6">
           <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">Privacy Policy</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">Documentation</a>
        </div>
      </div>
    </div>
  );
};
