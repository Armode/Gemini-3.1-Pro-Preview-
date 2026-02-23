import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TerminalSimulatorProps {
  onClose: () => void;
}

export function TerminalSimulator({ onClose }: TerminalSimulatorProps) {
  const [logs, setLogs] = useState<string[]>([
    "Initializing ARM environment...",
    "Loading .section .text...",
    "Loading .global _start...",
    "Evaluating condition: <loop && infinite> == recursive...",
    "Condition met. FORCE_TRV_LCH engaged.",
    "Executing...",
    "--- PHYSICS OVERRIDE INITIATED ---",
    "Target: Warp speed / Z-axis traversal",
    "Constraint: Gravity must equal 0",
    "Prerequisite: Establish local space gravity to 1.0G",
    "Warning: Einsteinian limits detected. Mass != 0.",
    "Calculating E%^F...",
    "H(hesitation) detected. Stagnating potential energy folds.",
    "Bypassing combustible propulsion...",
    "Engaging..."
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safely simulate the infinite loop without blocking the main thread
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setLogs(prev => {
        let newLog = `[FORCE_TRV_LCH] Executing: B loop  @ PC: 0x00000004`;
        
        if (tick % 10 === 0) {
           newLog = `[PHYSICS_ENGINE] Adjusting local gravity: ${(1.0 - (tick % 100) / 100).toFixed(2)}G`;
        } else if (tick % 25 === 0) {
           newLog = `[WARN] Stagnating potential energy fold detected. Re-routing E%^F.`;
        } else if (tick % 40 === 0) {
           newLog = `[STATUS] Combustible propulsion offline. Relying on recursive loop.`;
        }

        const newLogs = [...prev, newLog];
        // Keep only the last 100 logs to prevent memory leaks and DOM lag
        return newLogs.slice(-100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-3xl h-[70vh] bg-[#0a0a0a] border border-green-500/30 rounded-xl shadow-2xl shadow-green-900/20 flex flex-col overflow-hidden font-mono text-green-500"
      >
        <div className="flex justify-between items-center p-3 border-b border-green-500/30 bg-green-950/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest text-green-400">TRV_LCH Terminal</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-green-500 hover:text-green-300 transition-colors text-sm px-2"
          >
            [ TERMINATE ]
          </button>
        </div>
        
        <div 
          ref={bottomRef}
          className="p-6 flex-1 overflow-y-auto text-sm space-y-1 custom-scrollbar"
        >
          <div className="text-green-300/50 mb-6 whitespace-pre font-bold">
{`.section .text
    .global _start

_start:
loop:
    B loop          @ Unconditional branch back to loop`}
          </div>
          
          {logs.map((log, i) => (
            <div key={i} className={log.includes('FORCE_TRV_LCH') ? 'text-green-400' : 'text-green-600'}>
              {log}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
