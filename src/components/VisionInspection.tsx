import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Camera, Eye, Crosshair, AlertTriangle, ShieldCheck, AlertOctagon, Scan, Thermometer } from 'lucide-react';

export const VisionInspection: React.FC = () => {
  const { currentJoint, demoMode } = useDashboard();
  const [viewMode, setViewMode] = useState<'rgb' | 'thermal'>('rgb');
  const defect = currentJoint.defectMarker;

  const getStatusBadge = () => {
    if (currentJoint.healthScore >= 80) {
      return {
        text: 'NOMINAL',
        badge: 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300',
        icon: <ShieldCheck className="w-3 h-3 text-emerald-400" />
      };
    }
    if (currentJoint.healthScore >= 60) {
      return {
        text: 'WARNING',
        badge: 'bg-amber-950/90 border-amber-600/80 text-amber-300',
        icon: <AlertTriangle className="w-3 h-3 text-amber-400" />
      };
    }
    return {
      text: 'CRITICAL',
      badge: 'bg-red-950/90 border-red-600/80 text-red-300 animate-pulse',
      icon: <AlertOctagon className="w-3 h-3 text-red-400" />
    };
  };

  const status = getStatusBadge();

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              VISION INSPECTION
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded text-[10px] font-mono">
              <button
                onClick={() => setViewMode('rgb')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  viewMode === 'rgb' ? 'bg-[#1b263b] text-sky-300 font-bold' : 'text-slate-500'
                }`}
              >
                RGB SCAN
              </button>
              <button
                onClick={() => setViewMode('thermal')}
                className={`px-2 py-0.5 rounded transition-colors flex items-center gap-0.5 ${
                  viewMode === 'thermal' ? 'bg-[#1b263b] text-amber-300 font-bold' : 'text-slate-500'
                }`}
              >
                <Thermometer className="w-2.5 h-2.5" />
                IR THERMAL
              </button>
            </div>

            {/* Status Badge */}
            <div className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold flex items-center gap-1 ${status.badge}`}>
              {status.icon}
              <span>{status.text}</span>
            </div>
          </div>
        </div>

        {/* Simulated Camera Line-Scan Viewport Frame */}
        <div className="relative bg-[#05080e] border border-[#19243a] rounded overflow-hidden aspect-[16/9] flex items-center justify-center select-none group">
          
          {/* Background Belt Surface Graphics */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              viewMode === 'thermal'
                ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 opacity-90'
                : 'bg-gradient-to-b from-[#111622] via-[#0d121c] to-[#0a0e17]'
            }`}
          >
            {/* Rubber Belt Texture Lines (Steel Cord Ribs) */}
            <div className="absolute inset-0 opacity-20 flex flex-col justify-between py-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-slate-400/40 border-dashed border-t border-slate-500/30" />
              ))}
            </div>

            {/* Stepped Vulcanized Splice Seam Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Splice Step 1 */}
                <path
                  d="M 40,30 L 160,80 L 160,120 L 280,170"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  fill="none"
                />
                {/* Splice Step 2 */}
                <path
                  d="M 120,30 L 240,80 L 240,120 L 360,170"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Stepped Joint Overlap Hatching */}
                <path
                  d="M 160,80 L 240,80 M 160,100 L 240,100 M 160,120 L 240,120"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* Thermal Hotspot Gradient (in IR mode) */}
            {viewMode === 'thermal' && (
              <div
                className={`absolute w-32 h-32 rounded-full filter blur-xl transition-all ${
                  defect.hasDefect
                    ? demoMode === 'CRITICAL'
                      ? 'bg-red-500/50 top-1/4 left-1/3'
                      : 'bg-amber-500/40 top-1/3 left-1/2'
                    : 'bg-cyan-500/20 top-1/3 left-1/2'
                }`}
              />
            )}
          </div>

          {/* Optical Telemetry Crosshairs & HUD Overlays */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-0.5 text-[9px] font-mono text-slate-400 bg-[#05080e]/80 px-1.5 py-0.5 rounded border border-slate-800">
            <span className="text-sky-400 font-bold">CAM-01 OPTICAL LINE-SCAN</span>
            <span>FOV: 1400mm | EXP: 850µs</span>
          </div>

          <div className="absolute top-2 right-2 z-10 text-[9px] font-mono text-slate-400 bg-[#05080e]/80 px-1.5 py-0.5 rounded border border-slate-800">
            <span>RES: 2048 x 1024</span>
          </div>

          {/* Real Detection Marker Overlay (when defect exists) */}
          {defect.hasDefect ? (
            <div
              className={`absolute border-2 transition-all duration-300 z-20 ${
                demoMode === 'CRITICAL'
                  ? 'border-red-500 bg-red-500/15 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'border-amber-400 bg-amber-400/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
              }`}
              style={{
                left: `${defect.x}%`,
                top: `${defect.y}%`,
                width: `${defect.width}%`,
                height: `${defect.height}%`,
              }}
            >
              {/* Corner crosshairs */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

              {/* Bounding Box Label Tag */}
              <div
                className={`absolute -top-6 left-0 text-[9px] font-mono font-bold px-1 py-0.2 rounded border whitespace-nowrap ${
                  demoMode === 'CRITICAL'
                    ? 'bg-red-950 text-red-200 border-red-500'
                    : 'bg-amber-950 text-amber-200 border-amber-500'
                }`}
              >
                {defect.type} ({(defect.confidence * 100).toFixed(1)}%)
              </div>

              {/* Anomaly Center Target */}
              <Crosshair
                className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                  demoMode === 'CRITICAL' ? 'text-red-400 animate-spin' : 'text-amber-400'
                }`}
              />
            </div>
          ) : (
            /* Healthy Scan Reticle */
            <div className="z-10 flex items-center gap-1.5 text-xs font-mono text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded">
              <Scan className="w-4 h-4 text-emerald-400" />
              <span>Splice Geometry Intact • No Surface Anomalies</span>
            </div>
          )}

          {/* Bottom HUD bar */}
          <div className="absolute bottom-1.5 left-2 right-2 z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 bg-[#05080e]/85 px-2 py-0.5 rounded border border-slate-800">
            <span className="text-slate-300">
              JOINT <strong className="text-sky-400 font-bold">{currentJoint.id}</strong> (Sec {currentJoint.section})
            </span>
            <span className="text-slate-400">
              {defect.hasDefect ? defect.description : 'Nominal rubber surface'}
            </span>
          </div>
        </div>

        {/* Text Details Summary Block */}
        <div className="mt-2.5 bg-[#070b13] border border-[#162033] p-2 rounded text-xs font-mono space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Target Splice:</span>
            <span className="text-slate-200 font-bold">JOINT {currentJoint.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Optical Assessment:</span>
            <span
              className={`font-semibold ${
                defect.hasDefect
                  ? demoMode === 'CRITICAL'
                    ? 'text-red-400'
                    : 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {defect.hasDefect ? defect.description : 'Nominal baseline surface'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Detection Status:</span>
            <span className="text-slate-300 uppercase font-semibold">{status.text}</span>
          </div>
        </div>
      </div>

      {/* Mandatory Prototype Disclaimer Label */}
      <div className="mt-2.5 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="text-slate-400 italic">Prototype vision result</span>
        <span className="text-slate-500">Synthetic line-scan renderer</span>
      </div>
    </div>
  );
};
