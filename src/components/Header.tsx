import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Radio, Activity, HelpCircle, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    demoMode,
    setDemoMode,
    systemTime,
    scenarioGuideOpen,
    setScenarioGuideOpen
  } = useDashboard();

  return (
    <header className="bg-[#090d16] border-b border-[#1b2538] px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Brand & Industrial Designation */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#131d2e] border border-[#233550] flex items-center justify-center text-sky-400 font-mono font-bold text-base shadow-inner">
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono font-bold text-lg tracking-wider text-slate-100 uppercase">
                JOINTGUARD
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                SCADA v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Conveyor Health Monitoring
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="hidden md:block h-7 w-[1px] bg-slate-800 mx-2" />

        {/* Conveyor Line Tag */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono bg-[#0e1726] border border-[#1d2d46] px-2.5 py-1 rounded">
          <span className="text-slate-500">LINE:</span>
          <span className="text-slate-200 font-semibold">CV-104 (Primary Iron Ore)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">SPEC:</span>
          <span className="text-slate-300">ST-4500 (1,420m)</span>
        </div>
      </div>

      {/* Right: Telemetry Status, Demo Condition, SCADA Clock */}
      <div className="flex items-center gap-3">
        {/* Scenario Guide Toggle Button */}
        <button
          onClick={() => setScenarioGuideOpen(!scenarioGuideOpen)}
          className={`px-2.5 py-1 text-xs font-mono rounded border flex items-center gap-1.5 transition-all ${
            scenarioGuideOpen
              ? 'bg-sky-950/80 border-sky-500/50 text-sky-300 shadow-sm'
              : 'bg-[#111827] border-[#223049] text-slate-300 hover:border-slate-600'
          }`}
          title="Open interactive 7-step demo scenario walkthrough"
        >
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Scenario Guide</span>
        </button>

        {/* Demo Mode Selector Strip */}
        <div className="flex items-center bg-[#0d1422] border border-[#1f2e47] p-0.5 rounded">
          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase px-2 hidden sm:inline">
            DEMO:
          </span>
          <button
            onClick={() => setDemoMode('NORMAL')}
            className={`px-2 py-0.5 text-xs font-mono font-medium rounded transition-colors flex items-center gap-1 ${
              demoMode === 'NORMAL'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-600/60 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>NORMAL</span>
          </button>
          <button
            onClick={() => setDemoMode('WARNING')}
            className={`px-2 py-0.5 text-xs font-mono font-medium rounded transition-colors flex items-center gap-1 ${
              demoMode === 'WARNING'
                ? 'bg-amber-950/90 text-amber-300 border border-amber-600/60 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>WARNING</span>
          </button>
          <button
            onClick={() => setDemoMode('CRITICAL')}
            className={`px-2 py-0.5 text-xs font-mono font-medium rounded transition-colors flex items-center gap-1 ${
              demoMode === 'CRITICAL'
                ? 'bg-red-950/90 text-red-300 border border-red-600/60 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertOctagon className="w-3 h-3 text-red-400" />
            <span>CRITICAL</span>
          </button>
        </div>

        {/* System Online SCADA Beacon */}
        <div className="flex items-center gap-2 bg-[#0c1626] border border-[#1b2f4d] px-2.5 py-1 rounded">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
            SYSTEM ONLINE
          </span>
          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300 ml-1 hidden sm:inline">
            DEMO MODE
          </span>
        </div>

        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-[#0d121c] border border-slate-800 px-2 py-1 rounded">
          <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
          <span>{systemTime} UTC</span>
        </div>
      </div>
    </header>
  );
};
