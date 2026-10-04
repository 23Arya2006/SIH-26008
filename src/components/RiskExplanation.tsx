import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { BrainCircuit, Eye, Activity, Zap, Flame, ArrowDown, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

export const RiskExplanation: React.FC = () => {
  const { currentJoint } = useDashboard();
  const { visual, vibration, current, temperature, summary } = currentJoint.multimodalEvidence;

  const isHealthy = currentJoint.healthScore >= 80;
  const isWarning = currentJoint.healthScore >= 60 && currentJoint.healthScore < 80;
  const isCritical = currentJoint.healthScore < 60;

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              WHY IS {currentJoint.id} AT RISK?
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-[#070b13] px-2 py-0.5 rounded border border-[#162033]">
            Multimodal Fusion Model
          </span>
        </div>

        {/* 4 Sensor Evidence Breakdown Stream */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {/* 1. VISUAL EVIDENCE */}
          <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>VISUAL</span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {visual}
            </p>
          </div>

          {/* 2. VIBRATION EVIDENCE */}
          <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>VIBRATION</span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {vibration}
            </p>
          </div>

          {/* 3. MOTOR CURRENT EVIDENCE */}
          <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-yellow-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>MOTOR CURRENT</span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {current}
            </p>
          </div>

          {/* 4. TEMPERATURE EVIDENCE */}
          <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>TEMPERATURE</span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {temperature}
            </p>
          </div>
        </div>

        {/* Multimodal Reasoning Fusion Flow Schematic */}
        <div className="bg-[#070b13] border border-[#18263d] p-3 rounded text-center">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
            MULTIMODAL ASSESSMENT
          </div>

          {/* 4 Evidence Pill Inputs */}
          <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] font-mono text-slate-300">
            <span className="bg-[#111a2a] px-2 py-0.5 rounded border border-slate-700">
              Visual evidence
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="bg-[#111a2a] px-2 py-0.5 rounded border border-slate-700">
              Vibration evidence
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="bg-[#111a2a] px-2 py-0.5 rounded border border-slate-700">
              Current evidence
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="bg-[#111a2a] px-2 py-0.5 rounded border border-slate-700">
              Temperature trend
            </span>
          </div>

          {/* Downward Fusion Arrow */}
          <div className="my-1.5 flex justify-center">
            <ArrowDown className="w-4 h-4 text-sky-400 animate-bounce" />
          </div>

          {/* Calculated Output Row: Health Assessment -> Risk Level */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-[#0d1522] border border-[#1b2b44] p-2 rounded">
              <div className="text-[9px] font-mono text-slate-400 uppercase">
                JOINT HEALTH ASSESSMENT
              </div>
              <div
                className={`font-mono text-lg font-black ${
                  isHealthy
                    ? 'text-emerald-400'
                    : isWarning
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {currentJoint.healthScore} / 100
              </div>
            </div>

            <div className="bg-[#0d1522] border border-[#1b2b44] p-2 rounded">
              <div className="text-[9px] font-mono text-slate-400 uppercase">
                RISK LEVEL
              </div>
              <div
                className={`font-mono text-lg font-black uppercase ${
                  isHealthy
                    ? 'text-emerald-400'
                    : isWarning
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {currentJoint.risk}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Label & Disclaimer from requirements #14 */}
      <div className="mt-3 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="text-slate-400 font-semibold italic">Prototype AI Explanation</span>
        <span className="text-slate-500">Probabilistic early-warning assessment</span>
      </div>
    </div>
  );
};
