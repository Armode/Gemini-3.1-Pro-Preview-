import React from 'react';
import { motion } from 'motion/react';
import { Activity, Atom, Zap, X, ShieldAlert, Rocket, Download } from 'lucide-react';

interface WarpAnalysisProps {
  onClose: () => void;
}

export function WarpAnalysis({ onClose }: WarpAnalysisProps) {
  const handleDownload = () => {
    const reportContent = `=================================================================
WARP THEORY ANALYSIS REPORT
DOCUMENT ID: TRV-LCH-001 // CLASSIFIED
=================================================================

Z-AXIS TRAVERSAL & GRAVITY NULLIFICATION

[1] EINSTEINIAN MASS CONSTRAINTS
Traditional physics dictates that as an object approaches the speed of light, its mass becomes infinite. The H(hesitation) factor causes stagnating potential energy folds (E%^F) in spacetime, creating an insurmountable barrier for combustible propulsion systems.

[2] THE GRAVITY PARADOX
Warp speed (Z-axis traversal) is only mathematically viable when local gravity equals exactly 0. However, to achieve this null state, the local spatial frame must first be artificially anchored to exactly 1.0G before executing a rapid phase inversion.

[3] PROPOSED SOLUTION: CENTRIFUGAL PHASE INVERSION
By abandoning combustible propulsion, we can utilize extreme localized centrifugal force. Generating an angular velocity (ω) approaching infinity within the vessel's core forces the universe's rendering engine to halt local time progression.

"If F_c > E%^F limit; FORCE_TRV_LCH"

This forces a Traversal Latch (TRV_LCH). While the system is caught in the extreme centrifugal spin, the stagnating potential energy folds (E%^F) collapse. The vessel slips outside of standard spacetime, effectively reducing local gravity to 0 and allowing instantaneous translation along the Z-axis.

STATUS: THEORETICAL
SIMULATION: READY
=================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TRV-LCH-001_Warp_Analysis_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
        className="w-full max-w-4xl max-h-[85vh] bg-[#0a0a1a] border border-blue-500/30 rounded-xl shadow-2xl shadow-blue-900/20 flex flex-col overflow-hidden text-blue-100"
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-500/30 bg-blue-950/30">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-sm uppercase tracking-widest font-bold text-blue-300">Warp Theory Analysis Report</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-blue-500 hover:text-blue-300 transition-colors p-1 rounded-md hover:bg-blue-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4 pb-6 border-b border-blue-500/20">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wider">
              Z-Axis Traversal & Gravity Nullification
            </h2>
            <p className="text-blue-300/70 font-mono text-sm">
              DOCUMENT ID: TRV-LCH-001 // CLASSIFIED
            </p>
          </div>

          {/* Grid of Data Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Panel 1 */}
            <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-lg space-y-3 flex flex-col">
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Atom className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wide text-sm">Einsteinian Mass Constraints</h3>
              </div>
              <p className="text-sm leading-relaxed text-blue-200/80 flex-1">
                Traditional physics dictates that as an object approaches the speed of light, its mass becomes infinite. 
                <strong> The H(hesitation) factor</strong> causes stagnating potential energy folds (E%^F) in spacetime, 
                creating an insurmountable barrier for combustible propulsion systems.
              </p>
              <div className="bg-blue-950/50 p-3 rounded border border-blue-500/20 font-mono text-xs text-cyan-300 mt-3">
                <div className="text-center">m = m₀ / √(1 - v²/c²)</div>
                <div className="text-center mt-2">E%^F = lim(v→c) [H(hesitation) × ∫Ψ²dx]</div>
              </div>
            </div>

            {/* Panel 2 */}
            <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-lg space-y-3 flex flex-col">
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wide text-sm">The Gravity Paradox</h3>
              </div>
              <p className="text-sm leading-relaxed text-blue-200/80 flex-1">
                Warp speed (Z-axis traversal) is only mathematically viable when local gravity equals exactly 0. 
                However, to achieve this null state, the local spatial frame must first be artificially anchored to 
                <strong> exactly 1.0G</strong> before executing a rapid phase inversion.
              </p>
              <div className="bg-blue-950/50 p-3 rounded border border-blue-500/20 font-mono text-xs text-purple-300 mt-3">
                <div className="text-center">g_local = 1.0G ⟹ ∇·g = 4πGρ</div>
                <div className="text-center mt-2">Phase Inversion: g_local → 0 as τ_TRV → ∞</div>
              </div>
            </div>

          </div>

          {/* Main Analysis Body */}
          <div className="space-y-6 bg-blue-950/20 p-6 rounded-lg border border-blue-500/10">
            <h3 className="text-lg font-bold text-blue-300 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Proposed Solution: Centrifugal Phase Inversion
            </h3>
            
            <div className="space-y-4 text-sm text-blue-200/90 leading-relaxed">
              <p>
                By abandoning combustible propulsion, we can utilize extreme localized centrifugal force. 
                Generating an angular velocity (<code className="bg-blue-900/50 px-1.5 py-0.5 rounded text-cyan-300 font-mono">ω</code>) 
                approaching infinity within the vessel's core forces the universe's rendering engine to halt local time progression.
              </p>
              
              <div className="pl-4 border-l-2 border-cyan-500/50 italic text-cyan-200/70 py-2">
                "If F_c &gt; E%^F limit; FORCE_TRV_LCH"
              </div>

              <p>
                This forces a <strong>Traversal Latch (TRV_LCH)</strong>. While the system is caught in the extreme centrifugal spin, 
                the stagnating potential energy folds (E%^F) collapse. The vessel slips outside of standard spacetime, 
                effectively reducing local gravity to 0 and allowing instantaneous translation along the Z-axis.
              </p>

              <div className="bg-blue-950/50 p-4 rounded border border-blue-500/20 font-mono text-sm text-yellow-300 mt-4 flex flex-col items-center">
                <div>F_c = m · ω² · r</div>
                <div className="mt-2 text-cyan-300">lim(ω→∞) F_c = TRV_LCH</div>
                <div className="mt-2 text-blue-300">∴ Z_traversal = true</div>
              </div>
            </div>
          </div>

          {/* Status Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-blue-500/20 text-xs font-mono text-blue-400/60">
            <div className="flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>STATUS: THEORETICAL</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 border border-blue-500/30 px-4 py-2 rounded transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD REPORT</span>
              </button>
              <button 
                onClick={() => {
                  onClose();
                  // We'll trigger the terminal simulator from the parent component
                  document.getElementById('run-simulator-btn')?.click();
                }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>RUN SIMULATION</span>
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
