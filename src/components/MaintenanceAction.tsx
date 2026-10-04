import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Wrench, Eye, CheckCircle2, Calendar, AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

export const MaintenanceAction: React.FC = () => {
  const {
    currentJoint,
    alerts,
    acknowledgeAlert,
    setWorkOrderModalOpen,
    setActiveTab,
    addToast
  } = useDashboard();

  // Find related active alert if any
  const relatedAlert = alerts.find(
    (a) => a.jointId === currentJoint.id && a.status === 'ACTIVE'
  );

  const getReasonsList = () => {
    const list: string[] = [];
    if (currentJoint.sensors.vibration.status !== 'NORMAL') {
      list.push(`Elevated vibration (${currentJoint.sensors.vibration.value} mm/s RMS @ 24Hz transit harmonic)`);
    }
    if (currentJoint.sensors.current.status !== 'NORMAL') {
      list.push(`Increased motor current (+${currentJoint.sensors.current.value - 24}A dynamic surge)`);
    }
    if (currentJoint.defectMarker.hasDefect) {
      list.push(`Visual irregularity (${currentJoint.defectMarker.description})`);
    }
    if (currentJoint.sensors.temperature.status !== 'NORMAL') {
      list.push(`Increasing thermal gradient (${currentJoint.sensors.temperature.value}°C on pyrometer array)`);
    }
    if (list.length === 0) {
      list.push('All sensory streams within baseline operational envelope');
      list.push('No visual splice core separation or surface fraying detected');
      list.push('Continuous automated health indexing verified');
    }
    return list;
  };

  const reasons = getReasonsList();

  const handleAcknowledge = () => {
    if (relatedAlert) {
      acknowledgeAlert(relatedAlert.id);
    } else {
      addToast({
        type: 'info',
        title: 'Status Verified',
        message: `Joint ${currentJoint.id} operational status verified by operator.`
      });
    }
  };

  const handleViewJoint = () => {
    setActiveTab('joint-health');
    addToast({
      type: 'info',
      title: 'Navigating to Joint Health Matrix',
      message: `Inspecting full splice diagnostic telemetry for Joint ${currentJoint.id}.`
    });
  };

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              RECOMMENDED ACTION
            </h3>
          </div>
          <div
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
              currentJoint.risk === 'LOW'
                ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                : currentJoint.risk === 'MEDIUM'
                ? 'bg-amber-950/90 border-amber-600/80 text-amber-300'
                : 'bg-red-950/90 border-red-600/80 text-red-300 animate-pulse'
            }`}
          >
            Risk: {currentJoint.risk}
          </div>
        </div>

        {/* Primary Recommendation Banner */}
        <div
          className={`p-3 rounded border mb-3 ${
            currentJoint.risk === 'LOW'
              ? 'bg-[#071318] border-emerald-800/60 text-emerald-200'
              : currentJoint.risk === 'MEDIUM'
              ? 'bg-[#181308] border-amber-800/60 text-amber-200'
              : 'bg-[#1a0b0e] border-red-800/60 text-red-200'
          }`}
        >
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
            PRESCRIPTIVE MAINTENANCE PROTOCOL
          </div>
          <p className="font-mono text-xs font-semibold leading-relaxed">
            "{currentJoint.recommendedAction}"
          </p>
        </div>

        {/* Reasons Breakdown List */}
        <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded mb-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1.5">
            PRIMARY SIGNALS & DRIVERS:
          </div>
          <ul className="space-y-1 text-xs font-mono text-slate-300">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold shrink-0">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Operational Action Buttons */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#182338]">
          {/* 1. VIEW JOINT */}
          <button
            onClick={handleViewJoint}
            className="px-3 py-2 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>VIEW JOINT</span>
          </button>

          {/* 2. ACKNOWLEDGE ALERT */}
          <button
            onClick={handleAcknowledge}
            className="px-3 py-2 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACKNOWLEDGE</span>
          </button>

          {/* 3. SCHEDULE INSPECTION */}
          <button
            onClick={() => setWorkOrderModalOpen(true)}
            className="px-3 py-2 rounded bg-sky-950 hover:bg-sky-900 border border-sky-600/70 text-sky-200 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-300" />
            <span>SCHEDULE</span>
          </button>
        </div>

        <div className="mt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Maintenance Window: Shift 2 (22:00 - 06:00)</span>
          <span>Lead Time: 4.5 hrs</span>
        </div>
      </div>
    </div>
  );
};
