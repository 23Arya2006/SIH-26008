import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { DEMO_SCENARIO_STEPS } from '../data/scenarios';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2, Play } from 'lucide-react';

export const DemoScenarioGuide: React.FC = () => {
  const {
    scenarioGuideOpen,
    setScenarioGuideOpen,
    currentScenarioStep,
    goToScenarioStep,
    nextScenarioStep,
    prevScenarioStep
  } = useDashboard();

  if (!scenarioGuideOpen) return null;

  const currentStepData = DEMO_SCENARIO_STEPS.find((s) => s.step === currentScenarioStep) || DEMO_SCENARIO_STEPS[0];

  return (
    <div className="bg-[#0b121e] border-2 border-sky-500/60 rounded p-4 mb-3 shadow-2xl relative animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1c2940]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
            DEMO SCENARIO WALKTHROUGH — STEP {currentStepData.step} OF 7
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-600/60 text-sky-300 font-semibold">
            {currentStepData.title}
          </span>
        </div>

        <button
          onClick={() => setScenarioGuideOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          title="Close scenario guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Step Progress Stepper Bar */}
      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {DEMO_SCENARIO_STEPS.map((s) => {
          const isDone = s.step < currentScenarioStep;
          const isCurrent = s.step === currentScenarioStep;

          return (
            <button
              key={s.step}
              onClick={() => goToScenarioStep(s.step)}
              className={`py-1.5 px-1 rounded text-center font-mono text-[10px] font-bold border transition-all truncate ${
                isCurrent
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                  : isDone
                  ? 'bg-sky-950/60 border-sky-800 text-sky-300'
                  : 'bg-[#080d16] border-[#18253a] text-slate-500 hover:text-slate-300'
              }`}
            >
              Step {s.step}
            </button>
          );
        })}
      </div>

      {/* Main Step Description Card */}
      <div className="bg-[#070b13] border border-[#18273e] p-3 rounded mb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-1 max-w-3xl">
          <div className="text-xs font-mono font-bold text-sky-300 flex items-center gap-2">
            <span>Step {currentStepData.step}: {currentStepData.title}</span>
            <span className="text-[10px] font-normal text-slate-400">
              (Condition: <strong className="text-amber-400">{currentStepData.targetMode}</strong>, Focus: <strong className="text-sky-400">{currentStepData.targetJoint}</strong>)
            </span>
          </div>
          <p className="text-xs font-mono text-slate-200 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={prevScenarioStep}
            disabled={currentScenarioStep === 1}
            className="px-2.5 py-1.5 rounded bg-[#131c2d] hover:bg-[#1a273e] disabled:opacity-40 disabled:pointer-events-none border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextScenarioStep}
            disabled={currentScenarioStep === DEMO_SCENARIO_STEPS.length}
            className="px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-mono text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
