import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Activity, ShieldAlert, Gauge, AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

export const HealthSummary: React.FC = () => {
  const { conveyorMetrics, demoMode } = useDashboard();

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return {
          textColor: 'text-emerald-400',
          bgBadge: 'bg-emerald-950/80 border-emerald-600/60 text-emerald-300',
          subtext: 'Operational bounds stable'
        };
      case 'MEDIUM':
        return {
          textColor: 'text-amber-400',
          bgBadge: 'bg-amber-950/80 border-amber-600/60 text-amber-300',
          subtext: 'Degradation detected (J-03)'
        };
      case 'HIGH':
      case 'CRITICAL':
        return {
          textColor: 'text-red-400',
          bgBadge: 'bg-red-950/80 border-red-600/60 text-red-300 animate-pulse',
          subtext: 'Severe rupture threat (J-05)'
        };
      default:
        return {
          textColor: 'text-slate-300',
          bgBadge: 'bg-slate-800 text-slate-300',
          subtext: 'Standard operations'
        };
    }
  };

  const riskStyle = getRiskStyle(conveyorMetrics.currentRisk);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-3">
      {/* 1. OVERALL HEALTH */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 flex items-center justify-between shadow-xs">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
            OVERALL HEALTH
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-mono text-2xl font-black tracking-tight ${
                conveyorMetrics.overallHealth >= 80
                  ? 'text-emerald-400'
                  : conveyorMetrics.overallHealth >= 60
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {conveyorMetrics.overallHealth}
            </span>
            <span className="text-xs font-mono text-slate-500 font-medium">/ 100</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            {conveyorMetrics.overallHealth >= 80
              ? 'Zone A (Healthy)'
              : conveyorMetrics.overallHealth >= 60
              ? 'Zone B (Warning threshold)'
              : 'Zone C (Critical risk)'}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${
            conveyorMetrics.overallHealth >= 80
              ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
              : conveyorMetrics.overallHealth >= 60
              ? 'bg-amber-950/50 border-amber-800 text-amber-400'
              : 'bg-red-950/50 border-red-800 text-red-400'
          }`}
        >
          <Activity className="w-5 h-5" />
        </div>
      </div>

      {/* 2. CURRENT RISK */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 flex items-center justify-between shadow-xs">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
            CURRENT RISK
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xl font-black uppercase ${riskStyle.textColor}`}>
              {conveyorMetrics.currentRisk}
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            {riskStyle.subtext}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${
            conveyorMetrics.currentRisk === 'LOW'
              ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
              : conveyorMetrics.currentRisk === 'MEDIUM'
              ? 'bg-amber-950/50 border-amber-800 text-amber-400'
              : 'bg-red-950/50 border-red-800 text-red-400'
          }`}
        >
          {conveyorMetrics.currentRisk === 'LOW' ? (
            <ShieldCheck className="w-5 h-5" />
          ) : conveyorMetrics.currentRisk === 'MEDIUM' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <AlertOctagon className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* 3. BELT SPEED */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 flex items-center justify-between shadow-xs">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
            BELT SPEED
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-black text-slate-100 tracking-tight">
              {conveyorMetrics.beltSpeed.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-400 font-medium">m/s</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            Nominal target: 2.8 m/s
          </div>
        </div>
        <div className="w-10 h-10 rounded bg-[#101826] border border-slate-700 flex items-center justify-center text-sky-400 shrink-0">
          <Gauge className="w-5 h-5" />
        </div>
      </div>

      {/* 4. ACTIVE ALERTS */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 flex items-center justify-between shadow-xs">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
            ACTIVE ALERTS
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono text-2xl font-black tracking-tight ${
                conveyorMetrics.activeAlertsCount === 0
                  ? 'text-emerald-400'
                  : conveyorMetrics.activeAlertsCount === 1
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {conveyorMetrics.activeAlertsCount}
            </span>
            <span className="text-[10px] font-mono text-slate-400">UNRESOLVED</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            {conveyorMetrics.activeAlertsCount > 0 ? 'Action required' : 'No active alarm events'}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${
            conveyorMetrics.activeAlertsCount === 0
              ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
              : 'bg-red-950/50 border-red-800 text-red-400'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
