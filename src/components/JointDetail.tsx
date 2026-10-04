import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Layers, ShieldCheck, AlertTriangle, AlertOctagon, Clock, MapPin, Wrench } from 'lucide-react';

export const JointDetail: React.FC = () => {
  const { currentJoint, selectedJointId } = useDashboard();

  const getStatusBadge = () => {
    if (currentJoint.healthScore >= 80) {
      return {
        label: 'HEALTHY',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300',
        icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      };
    }
    if (currentJoint.healthScore >= 60) {
      return {
        label: 'WARNING',
        color: 'text-amber-400',
        bg: 'bg-amber-950/90 border-amber-600/80 text-amber-300',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
      };
    }
    return {
      label: 'CRITICAL',
      color: 'text-red-400',
      bg: 'bg-red-950/90 border-red-600/80 text-red-300 animate-pulse',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
    };
  };

  const status = getStatusBadge();

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              SELECTED JOINT
            </h3>
          </div>
          <div className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold flex items-center gap-1 ${status.bg}`}>
            {status.icon}
            <span>{status.label}</span>
          </div>
        </div>

        {/* Primary Identification Strip */}
        <div className="flex items-baseline justify-between bg-[#070b13] border border-[#162033] p-2.5 rounded mb-3">
          <div>
            <div className="text-[10px] font-mono text-slate-400">JOINT IDENTIFIER</div>
            <div className="font-mono text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <span>{currentJoint.id}</span>
              <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded">
                Section {currentJoint.section}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400">HEALTH SCORE</div>
            <div className={`font-mono text-xl font-extrabold tracking-tight ${status.color}`}>
              {currentJoint.healthScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
        </div>

        {/* Technical Attributes Grid */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between py-1 border-b border-[#152033]">
            <span className="text-slate-400">Section:</span>
            <span className="text-slate-200 font-semibold">{currentJoint.section}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#152033]">
            <span className="text-slate-400">Health:</span>
            <span className={`font-semibold ${status.color}`}>{currentJoint.healthScore} / 100</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#152033]">
            <span className="text-slate-400">Risk:</span>
            <span
              className={`font-semibold uppercase ${
                currentJoint.risk === 'LOW'
                  ? 'text-emerald-400'
                  : currentJoint.risk === 'MEDIUM'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {currentJoint.risk}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#152033]">
            <span className="text-slate-400">Severity:</span>
            <span className="text-slate-200 font-semibold uppercase">{currentJoint.severity}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#152033]">
            <span className="text-slate-400">Condition:</span>
            <span className="text-slate-200 font-medium truncate max-w-[170px]" title={currentJoint.condition}>
              {currentJoint.condition}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              Last assessment:
            </span>
            <span className="text-slate-300">{currentJoint.lastAssessment}</span>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="mt-3 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-500" />
          {currentJoint.positionMeters}m from head
        </span>
        <span className="text-slate-400 truncate max-w-[120px]" title={currentJoint.spliceType}>
          {currentJoint.spliceType}
        </span>
      </div>
    </div>
  );
};
