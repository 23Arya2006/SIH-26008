import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { JointId } from '../types';
import { Play, ArrowRight, Eye, Radio, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const ConveyorOverview: React.FC = () => {
  const { allJoints, selectedJointId, setSelectedJointId, conveyorMetrics } = useDashboard();

  const sections = [
    { key: 'B1', label: 'SECTION B1', length: '280m', joint: 'J-01' as JointId },
    { key: 'B2', label: 'SECTION B2', length: '280m', joint: 'J-02' as JointId },
    { key: 'B3', label: 'SECTION B3', length: '290m', joint: 'J-03' as JointId },
    { key: 'B4', label: 'SECTION B4', length: '280m', joint: 'J-04' as JointId },
    { key: 'B5', label: 'SECTION B5', length: '290m', joint: 'J-05' as JointId },
  ];

  const getStatusBadge = (score: number, risk: string) => {
    if (score >= 80) {
      return {
        text: 'HEALTHY',
        badgeClass: 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300',
        dotClass: 'bg-emerald-400',
        ringClass: 'border-emerald-500/40'
      };
    }
    if (score >= 60) {
      return {
        text: 'WARNING',
        badgeClass: 'bg-amber-950/90 border-amber-600/80 text-amber-300',
        dotClass: 'bg-amber-400 animate-pulse',
        ringClass: 'border-amber-500 ring-2 ring-amber-500/30'
      };
    }
    return {
      text: 'CRITICAL',
      badgeClass: 'bg-red-950/90 border-red-600/80 text-red-300',
      dotClass: 'bg-red-400 animate-ping',
      ringClass: 'border-red-500 ring-2 ring-red-500/50'
    };
  };

  return (
    <section className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#182338]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-3.5 bg-sky-500 rounded-xs"></span>
          <h2 className="font-mono font-bold text-sm tracking-wider text-slate-100 uppercase">
            CONVEYOR OVERVIEW
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            [2D Schematic Monitoring Profile — CV-104]
          </span>
        </div>

        {/* Speed & Direction Indicator */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#080d17] px-2 py-0.5 rounded border border-[#1e2a42] text-slate-300">
            <span className="text-slate-500">DIRECTION:</span>
            <span className="flex items-center text-sky-400 font-semibold">
              HEAD PULLEY <ArrowRight className="w-3.5 h-3.5 inline ml-0.5" />
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#080d17] px-2 py-0.5 rounded border border-[#1e2a42] text-slate-300">
            <span className="text-slate-500">VELOCITY:</span>
            <span className="text-emerald-400 font-bold">{conveyorMetrics.beltSpeed} m/s</span>
          </div>
        </div>
      </div>

      {/* 2D Schematic Belt Line Container */}
      <div className="bg-[#070b13] border border-[#162033] rounded p-4 relative overflow-x-auto">
        {/* Conveyor 2D Layout Strip */}
        <div className="min-w-[780px]">
          
          {/* Top Carry-Run Belt & Joints Flow */}
          <div className="relative flex items-center justify-between py-6 px-4">
            
            {/* Drive Head Pulley */}
            <div className="flex flex-col items-center shrink-0 z-10 mr-1">
              <div className="w-12 h-16 rounded bg-[#162030] border-2 border-slate-600 flex flex-col items-center justify-center text-center shadow-md">
                <div className="w-8 h-8 rounded-full border border-sky-400/50 bg-[#0d1522] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400/30" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-300 mt-1">DRIVE</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">Head Drum</span>
            </div>

            {/* Continuous Belt Line Path */}
            <div className="absolute top-[48px] left-[52px] right-[52px] h-3.5 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 border-y border-slate-600 rounded-xs flex items-center justify-around overflow-hidden">
              <div className="w-full h-full opacity-30 flex justify-around items-center">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="text-[8px] text-slate-400 font-mono">»</span>
                ))}
              </div>
            </div>

            {/* Alternating Sections and Joint Stations */}
            {sections.map((sec, idx) => {
              const jointData = allJoints[sec.joint];
              const status = getStatusBadge(jointData.healthScore, jointData.risk);
              const isSelected = selectedJointId === sec.joint;

              return (
                <React.Fragment key={sec.key}>
                  {/* Section Block */}
                  <div className="flex-1 flex flex-col items-center px-1 z-10">
                    <div className="bg-[#0b121e]/90 border border-[#1e2a40] px-2 py-1 rounded text-center shadow-xs">
                      <span className="text-[10px] font-mono font-bold text-slate-300 block">
                        {sec.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {sec.length}
                      </span>
                    </div>
                  </div>

                  {/* Joint Node Selector */}
                  <div className="flex flex-col items-center shrink-0 z-20 px-1">
                    <button
                      onClick={() => setSelectedJointId(sec.joint)}
                      className={`group relative flex flex-col items-center transition-all p-1.5 rounded-md ${
                        isSelected
                          ? 'bg-[#14233a] ring-2 ring-sky-400 scale-105 shadow-lg'
                          : 'bg-[#0e1624] hover:bg-[#121c2d] border border-[#1e2c45]'
                      }`}
                      title={`Click to inspect Joint ${sec.joint}`}
                    >
                      {/* Joint Node Diamond/Marker */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full ${status.dotClass}`} />
                        <span className="font-mono font-bold text-xs text-slate-100">
                          {sec.joint}
                        </span>
                      </div>

                      {/* Status Tag */}
                      <div
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${status.badgeClass}`}
                      >
                        {status.text}
                      </div>

                      {/* Health Score Pill */}
                      <div className="mt-1 text-[10px] font-mono font-semibold text-slate-300 bg-[#090d15] px-1 rounded border border-slate-800">
                        {jointData.healthScore}%
                      </div>

                      {/* Selection pointer */}
                      {isSelected && (
                        <div className="absolute -bottom-2.5 w-2 h-2 bg-sky-400 rotate-45" />
                      )}
                    </button>
                  </div>
                </React.Fragment>
              );
            })}

            {/* Tail Tension Pulley */}
            <div className="flex flex-col items-center shrink-0 z-10 ml-1">
              <div className="w-12 h-16 rounded bg-[#162030] border-2 border-slate-600 flex flex-col items-center justify-center text-center shadow-md">
                <div className="w-8 h-8 rounded-full border border-slate-500 bg-[#0d1522] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-300 mt-1">TAIL</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">Tension Drum</span>
            </div>
          </div>

          {/* Bottom Return Run Schematic Line */}
          <div className="relative mx-12 h-1.5 bg-slate-800 border-t border-slate-700 rounded-full flex items-center justify-around opacity-60 my-1">
            <span className="text-[8px] font-mono text-slate-500">« RETURN RUN (BELT UNDERSIDE) «</span>
          </div>

          {/* Quick Legend & Sensor Array Locations */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-[#141d2e] px-2">
            <div className="flex items-center gap-4">
              <span className="text-slate-500">SCHEMATIC LEGEND:</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> HEALTHY (80-100)
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> WARNING (60-79)
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400"></span> CRITICAL (0-59)
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Optic Scanner: Frame Pos #710m</span>
              <span className="text-slate-600">|</span>
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Piezo Stations: 5/5 Synchronized</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
