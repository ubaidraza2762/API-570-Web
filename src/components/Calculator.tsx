import React, { useState } from "react";
import { X, Delete, Divide, Minus, Plus, Equal, Hash } from "lucide-react";
import { motion } from "motion/react";

interface CalculatorProps {
  onClose: () => void;
}

export const APIExamCalculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");
  const [lastOp, setLastOp] = useState<string | null>(null);
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [isNewValue, setIsNewValue] = useState(true);

  const handleNumber = (n: string) => {
    if (isNewValue) {
      setDisplay(n === "." ? "0." : n);
      setIsNewValue(false);
    } else {
      if (n === "." && display.includes(".")) return;
      setDisplay(display + n);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (lastOp) {
      const result = calculate(prevVal, current, lastOp);
      setPrevVal(result);
      setDisplay(result.toString());
    }
    setLastOp(op);
    setIsNewValue(true);
    setFormula(`${display} ${op}`);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (prevVal !== null && lastOp) {
      const current = parseFloat(display);
      const result = calculate(prevVal, current, lastOp);
      setDisplay(result.toString());
      setPrevVal(null);
      setLastOp(null);
      setFormula("");
      setIsNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setFormula("");
    setPrevVal(null);
    setLastOp(null);
    setIsNewValue(true);
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed top-20 right-20 w-72 bg-[#f0f0f0] border-2 border-gray-400 shadow-2xl rounded-lg overflow-hidden z-[3000] cursor-move select-none"
    >
      <div className="bg-[#555] text-white p-2 flex justify-between items-center h-10 px-4">
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Hash size={14} /> Calculator</span>
        <button onClick={onClose} className="hover:bg-red-500 rounded p-1 transition-colors"><X size={16} /></button>
      </div>
      
      <div className="p-4 bg-white">
        <div className="bg-gray-100 p-3 rounded mb-4 text-right overflow-hidden h-20 flex flex-col justify-end border-inner border-2 border-gray-200">
          <div className="text-[10px] text-gray-400 font-bold mb-1 h-4">{formula}</div>
          <div className="text-3xl font-bold font-mono tracking-tighter truncate">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className="p-3 bg-red-100 text-red-700 font-bold rounded hover:bg-red-200 col-span-2 shadow-sm">AC</button>
          <button onClick={() => setDisplay(d => (parseFloat(d) * -1).toString())} className="p-3 bg-gray-200 font-bold rounded hover:bg-gray-300 shadow-sm">+/-</button>
          <button onClick={() => handleOperator("÷")} className="p-3 bg-[#76B947] text-white font-bold rounded shadow-md"><Divide size={18} className="mx-auto" /></button>
          
          <button onClick={() => handleNumber("7")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">7</button>
          <button onClick={() => handleNumber("8")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">8</button>
          <button onClick={() => handleNumber("9")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">9</button>
          <button onClick={() => handleOperator("×")} className="p-3 bg-[#76B947] text-white font-bold rounded shadow-md font-mono">×</button>

          <button onClick={() => handleNumber("4")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">4</button>
          <button onClick={() => handleNumber("5")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">5</button>
          <button onClick={() => handleNumber("6")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">6</button>
          <button onClick={() => handleOperator("-")} className="p-3 bg-[#76B947] text-white font-bold rounded shadow-md"><Minus size={18} className="mx-auto" /></button>

          <button onClick={() => handleNumber("1")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">1</button>
          <button onClick={() => handleNumber("2")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">2</button>
          <button onClick={() => handleNumber("3")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">3</button>
          <button onClick={() => handleOperator("+")} className="p-3 bg-[#76B947] text-white font-bold rounded shadow-md"><Plus size={18} className="mx-auto" /></button>

          <button onClick={() => handleNumber("0")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm col-span-2">0</button>
          <button onClick={() => handleNumber(".")} className="p-3 bg-white border border-gray-200 font-bold rounded hover:bg-gray-50 shadow-sm">.</button>
          <button onClick={handleEqual} className="p-3 bg-[#555] text-white font-bold rounded shadow-md"><Equal size={18} className="mx-auto" /></button>
        </div>
      </div>
    </motion.div>
  );
};
