import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { X, Calendar, Wrench, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { JointId } from '../types';

export const WorkOrderModal: React.FC = () => {
  const {
    workOrderModalOpen,
    setWorkOrderModalOpen,
    selectedJointId,
    currentJoint,
    createWorkOrder
  } = useDashboard();

  const [jointToInspect, setJointToInspect] = useState<JointId>(selectedJointId);
  const [priority, setPriority] = useState<string>(
    currentJoint.risk === 'CRITICAL' ? 'EMERGENCY' : currentJoint.risk === 'MEDIUM' ? 'PRIORITY' : 'ROUTINE'
  );
  const [maintenanceTeam, setMaintenanceTeam] = useState<string>('Belt Splice Tech Crew A (Mechanical)');
  const [scheduledWindow, setScheduledWindow] = useState<string>('Next Scheduled Shift Window (22:00 - 06:00)');
  const [notes, setNotes] = useState<string>(
    `Ultrasonic scan + optical verification required on Joint ${currentJoint.id} (Section ${currentJoint.section}) due to elevated vibration (4.2 mm/s RMS) and splice step gap dilation.`
  );

  if (!workOrderModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createWorkOrder(jointToInspect, priority, notes);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0b121e] border-2 border-[#1e2e4a] rounded-lg max-w-xl w-full shadow-2xl overflow-hidden font-mono">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 bg-[#080d16] border-b border-[#1b2a42]">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-sm tracking-wider text-slate-100 uppercase">
              SCHEDULE INSPECTION & WORK ORDER DISPATCH
            </h3>
          </div>
          <button
            onClick={() => setWorkOrderModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            {/* Target Joint */}
            <div>
              <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                TARGET JOINT
              </label>
              <select
                value={jointToInspect}
                onChange={(e) => setJointToInspect(e.target.value as JointId)}
                className="w-full bg-[#070b13] border border-[#1b2a42] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="J-01">J-01 (Section B1 — Healthy)</option>
                <option value="J-02">J-02 (Section B2 — Healthy)</option>
                <option value="J-03">J-03 (Section B3 — Warning)</option>
                <option value="J-04">J-04 (Section B4 — Healthy)</option>
                <option value="J-05">J-05 (Section B5 — Critical)</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                DISPATCH PRIORITY
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#070b13] border border-[#1b2a42] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="ROUTINE">ROUTINE (Standard Shift Inspection)</option>
                <option value="PRIORITY">PRIORITY (Next Maintenance Window)</option>
                <option value="EMERGENCY">EMERGENCY (Immediate Conveyor Lockout)</option>
              </select>
            </div>
          </div>

          {/* Assigned Crew */}
          <div>
            <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
              ASSIGNED CREW
            </label>
            <input
              type="text"
              value={maintenanceTeam}
              onChange={(e) => setMaintenanceTeam(e.target.value)}
              className="w-full bg-[#070b13] border border-[#1b2a42] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Scheduled Window */}
          <div>
            <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
              MAINTENANCE WINDOW
            </label>
            <input
              type="text"
              value={scheduledWindow}
              onChange={(e) => setScheduledWindow(e.target.value)}
              className="w-full bg-[#070b13] border border-[#1b2a42] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Inspection Notes */}
          <div>
            <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
              INSPECTION PROTOCOL / SENSOR EVIDENCE NOTES
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#070b13] border border-[#1b2a42] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#18263e]">
            <button
              type="button"
              onClick={() => setWorkOrderModalOpen(false)}
              className="px-3 py-1.5 rounded bg-[#101826] hover:bg-[#162236] border border-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DISPATCH WORK ORDER</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
