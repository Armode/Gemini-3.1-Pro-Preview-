import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lock, AlertTriangle, CheckCircle2, Activity, Zap, RefreshCw, Download, FileText, X } from 'lucide-react';

// --- SYSTEM CONFIGURATION ---
const BOOT_SEQUENCE = [
  { text: "TRV-LCH MK-VI: Project 'Infinite Branch' - Mission Archive", type: "header" },
  { text: "Initializing physical prototype induction...", type: "system" },
  { text: "Checking Integrated Force Calculus (The Five Vectors):", type: "system" },
  { text: "> T_c (Counter-Acting Tension): 1.0G Anchor SECURED.", type: "success" },
  { text: "> F_c (Centrifugal Force): Radial stretch nominal.", type: "success" },
  { text: "> f_t (Tangential Friction): Resonance induction active.", type: "success" },
  { text: "> B_res (Magnetic Resonance): H-Factor Neutralized (100%).", type: "success" },
  { text: "> D_sun (Solar Displacement): Z-axis trajectory LOCKED.", type: "success" },
  { text: "B-Loop Integrity: 99.98% - Gravity Paradox Solved.", type: "info" },
  { text: "WARNING: High angular velocity detected.", type: "warning" },
  { text: "Current Phase: SUPERFLUID TRAVERSAL (ω = 124.8)", type: "header" },
  { text: "Fluidic Spacetime Resistance (η_fluid) = 0.00", type: "info" },
  { text: "Awaiting manual deceleration command...", type: "system" }
];

const DECELERATION_SEQUENCE = [
  { text: "COMMAND ACCEPTED: Deep Field Deceleration Initiated.", type: "warning" },
  { text: "Reducing angular velocity (ω)...", type: "system" },
  { text: "ω = 122.4 ... State 1: Locked", type: "info" },
  { text: "ω = 120.0 ... THRESHOLD REACHED.", type: "warning" },
  { text: "ALERT: Phase change in spacetime medium detected.", type: "warning" },
  { text: "Viscosity Re-Emergence observed. Entering Newtonian Stabilization.", type: "system" },
  { text: "State 2: Transitioning. B-Loop snowballing contraction nominal.", type: "info" },
  { text: "ω = 85.3 ... Spacetime resistance increasing.", type: "system" },
  { text: "ω = 42.1 ... Anchoring to weak, local deep-field mass shadow.", type: "system" },
  { text: "ω ≈ 0.0 ... State 3: Deep Field Halt.", type: "success" },
  { text: "Z-Axis Drift: 0.000001% (Trajectory Locked).", type: "success" },
  { text: "DECELERATION STATUS: COMPLETE. MISSION READY.", type: "header" }
];

// --- TELEMETRY SUB-SYSTEM ---
const SystemMonitor = ({ isDecelerating, isComplete }: { isDecelerating: boolean, isComplete: boolean }) => {
  const [metrics, setMetrics] = useState({ entropy: "12.40", flux: "0.0040", stability: "99.9" });
  const simState = useRef({ entropy: 12.4, flux: 0.004, stability: 99.9 });
  const [history, setHistory] = useState<number[]>(new Array(20).fill(15));

  useEffect(() => {
    const interval = setInterval(() => {
      const current = simState.current;
      let newFlux, newEntropy, newStability;

      if (isComplete) {
        newFlux = 0.0001;
        newEntropy = 0.01;
        newStability = 100.0;
      } else {
        newFlux = isDecelerating 
          ? Math.max(0.0001, current.flux - 0.0008)
          : 0.004 + (Math.random() * 0.004);
        newEntropy = isDecelerating
          ? Math.max(0.05, current.entropy - 0.8)
          : 12 + Math.random() * 4;
        newStability = isDecelerating
          ? Math.min(100, current.stability + 0.2)
          : 98.5 + Math.random() * 1.5;
      }

      simState.current = { entropy: newEntropy, flux: newFlux, stability: newStability };
      setMetrics({
        entropy: newEntropy.toFixed(2),
        flux: newFlux.toFixed(4),
        stability: newStability.toFixed(1)
      });

      const graphValue = Math.min(30, Math.max(0, newFlux * 3000));
      setHistory(h => [...h.slice(1), graphValue]); 
    }, 200);

    return () => clearInterval(interval);
  }, [isDecelerating, isComplete]);

  return (
    <div className="absolute top-16 right-6 bg-slate-900/90 border border-slate-700/50 p-4 rounded-lg text-xs font-mono w-56 z-20 shadow-2xl backdrop-blur-md">
      <div className="text-slate-500 uppercase tracking-tighter border-b border-slate-800 mb-3 pb-2 flex justify-between items-center">
        <span className="flex items-center gap-2"><Activity size={14} className="text-blue-400" /> SYSTEM VITAL</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${isComplete ? "bg-emerald-500" : "bg-cyan-500 animate-pulse"}`}></div>
          <span className={isComplete ? "text-emerald-500 font-bold" : "text-cyan-500 font-bold"}>
            {isComplete ? "NOMINAL" : "ACTIVE"}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="text-cyan-400/80">ENTROPY</div>
          <div className="text-right text-slate-200 font-bold tabular-nums text-sm">{metrics.entropy}%</div>
        </div>
        <div className="space-y-1 bg-slate-950/50 p-2 rounded border border-slate-800/50">
          <div className="flex justify-between items-center mb-1">
            <div className="text-yellow-400 flex items-center gap-1"><Zap size={10}/> FLUX Δ</div>
            <div className="text-right text-yellow-100 font-bold tabular-nums">{metrics.flux}</div>
          </div>
          <div className="h-8 w-full relative overflow-hidden">
            <svg className="w-full h-full stroke-yellow-500 fill-none" preserveAspectRatio="none">
              <path
                d={`M 0 ${30 - history[0]} ${history.map((val, i) => `L ${(i / (history.length - 1)) * 100}% ${30 - val}`).join(" ")}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-emerald-400/80">STABILITY</div>
          <div className="text-right text-slate-200 font-bold tabular-nums text-sm">{metrics.stability}%</div>
        </div>
      </div>
    </div>
  );
};

// --- MISSION REPORT OVERLAY ---
const MissionReport = ({ isOpen, onReset, onDownload }: { isOpen: boolean, onReset: () => void, onDownload: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-slate-900 border-2 border-emerald-500/50 p-8 rounded-xl max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={48} className="text-emerald-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tighter uppercase">Mission Archive Secured</h2>
              <p className="text-slate-400 text-xs mb-8 font-mono uppercase tracking-widest">Archive Reference: INF-BRNCH-772-B</p>
              <div className="grid grid-cols-2 gap-4 text-left mb-8">
                <div className="bg-slate-950/50 p-4 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Final Velocity</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">0.0000 ω</div>
                </div>
                <div className="bg-slate-950/50 p-4 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Z-Axis Drift</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">0.00%</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onDownload}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded transition-all uppercase tracking-[0.1em] text-[10px] border border-slate-600 hover:border-blue-400 flex items-center justify-center gap-2 group"
                >
                  <Download size={14} className="text-blue-400 group-hover:text-white" />
                  Download Archive
                </button>
                <button 
                  onClick={onReset}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition-all uppercase tracking-[0.1em] text-[10px] border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} /> 
                  Re-Initialize
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN TERMINAL INTERFACE ---
interface TerminalSimulatorProps {
  onClose: () => void;
}

export function TerminalSimulator({ onClose }: TerminalSimulatorProps) {
  const [logs, setLogs] = useState<{text: string, type: string}[]>([]);
  const [isDecelerating, setIsDecelerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // SESSION ID: Used to force re-runs of effects
  const [resetCount, setResetCount] = useState(0);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Boot Sequence - DEPENDENCY ADDED: [resetCount]
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setLogs(prev => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600); 
    return () => clearInterval(interval);
  }, [resetCount]); // <--- This triggers the reboot when resetCount changes

  const triggerDeceleration = () => {
    if (isDecelerating || isComplete) return;
    setIsDecelerating(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < DECELERATION_SEQUENCE.length) {
        setLogs(prev => [...prev, DECELERATION_SEQUENCE[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 800); 
  };

  const handleReset = () => {
    setLogs([]);
    setIsDecelerating(false);
    setIsComplete(false);
    // Incrementing this triggers the useEffect above
    setResetCount(prev => prev + 1);
  };

  const downloadLogs = () => {
    const logText = logs.map(l => `[${new Date().toISOString()}] ${l.text}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TRV-LCH_Mission_Archive_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLogStyle = (type: string) => {
    switch(type) {
      case 'header': return 'text-blue-400 font-bold';
      case 'success': return 'text-emerald-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-cyan-300';
      default: return 'text-slate-300';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl mx-auto bg-slate-950 border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono flex flex-col h-[600px]">
        
        {/* Passing key={resetCount} forces SystemMonitor to destroy and recreate itself, resetting the sparkline */}
        <SystemMonitor key={resetCount} isDecelerating={isDecelerating} isComplete={isComplete} />

        <MissionReport isOpen={isComplete} onReset={handleReset} onDownload={downloadLogs} />

        <div className="bg-slate-900 border-b border-slate-700 p-3 flex justify-between items-center shrink-0 z-10 relative">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal size={18} />
            <span className="text-sm tracking-widest uppercase font-semibold">TRV-LCH MK-VI / Infinite Branch System</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={downloadLogs}
              className="text-slate-500 hover:text-blue-400 transition-colors"
              title="Export Current Log"
            >
              <FileText size={16} />
            </button>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Close Terminal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-950/50 relative z-0">
          <div className="space-y-2 pb-20"> 
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-sm ${getLogStyle(log.type)} tracking-wide`}
              >
                <span className="text-slate-600 mr-3 select-none">
                  [{new Date().toISOString().substring(11, 23)}]
                </span>
                {log.text}
              </motion.div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>

        <div className="bg-slate-900 border-t border-slate-700 p-4 flex justify-between items-center shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <span className="text-green-500 animate-pulse">root@mk-vi:~#</span>
            <span className="text-slate-400 text-sm">
              {!isDecelerating ? "awaiting input..." : isComplete ? "system locked. monitoring..." : "executing script..."}
            </span>
          </div>
          
          <button
            onClick={triggerDeceleration}
            disabled={isDecelerating || logs.length < BOOT_SEQUENCE.length}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold transition-colors border border-slate-600 hover:border-blue-500 group"
          >
            {isComplete ? (
              <><CheckCircle2 size={16} className="text-green-400" /> STABLE</>
            ) : isDecelerating ? (
              <><AlertTriangle size={16} className="text-yellow-400 animate-pulse" /> DECELERATING</>
            ) : (
              <><Lock size={16} className="text-blue-400 group-hover:text-blue-300" /> INITIATE ACTIVATE.SH</>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
