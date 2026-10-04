import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { DemoMode } from '../types';
import { ShieldCheck, AlertTriangle, AlertOctagon, HelpCircle, Sparkles } from 'lucide-react';

export const DemoControls: React.FC = () => {
  const {
    demoMode,
    setDemoMode,
    scenarioGuideOpen,
    setScenarioGuideOpen
  } = useDashboard();

  const conditions: { mode: DemoMode; label: string; desc: string; icon: React.ReactNode; activeColor: string }[] = [
    {
      mode: 'NORMAL',
      label: 'NORMAL',
      desc: 'All 5 joints healthy (>90%). Sensors in green envelope.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      activeColor: 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/40'
    },
    {
      mode: 'WARNING',
      label: 'WARNING',
      desc: 'J-03 degradation (72%). Elevated vibration (4.2 mm/s) & current.',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      activeColor: 'bg-amber-950/90 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/40'
    },
    {
      mode: 'CRITICAL',
      label: 'CRITICAL',
      desc: 'J-05 rupture threat (38%). Sensor surge (8.4 mm/s) & cord tear.',
      icon: <AlertOctagon className="w-4 h-4 text-red-400" />,
      activeColor: 'bg-red-950/90 border-red-500 text-red-200 shadow-md ring-1 ring-red-500/40'
    }
  ];

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#182338]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
            DEMO CONDITION
          </h3>
          <span className="text-[10px] font-mono text-slate-400 bg-[#070b13] px-1.5 py-0.2 rounded border border-slate-800">
            Interactive Test Driver
          </span>
        </div>

        <button
          onClick={() => setScenarioGuideOpen(!scenarioGuideOpen)}
          className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{scenarioGuideOpen ? 'Close Scenario Walkthrough' : 'Step-by-Step Scenario'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {conditions.map((item) => {
          const isActive = demoMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => setDemoMode(item.mode)}
              className={`p-2.5 rounded border text-left transition-all ${
                isActive
                  ? item.activeColor
                  : 'bg-[#070b13] border-[#182338] hover:bg-[#0e1624] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-xs flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {isActive && (
                  <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-black/40 border border-white/20">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono leading-tight opacity-90">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
