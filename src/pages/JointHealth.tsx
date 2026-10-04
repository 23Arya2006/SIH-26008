import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { JointId } from '../types';
import { Layers, ShieldCheck, AlertTriangle, AlertOctagon, ArrowRight, Eye, Wrench, Calendar, Search } from 'lucide-react';

export const JointHealth: React.FC = () => {
  const {
    allJoints,
    selectedJointId,
    setSelectedJointId,
    setActiveTab,
    setWorkOrderModalOpen
  } = useDashboard();

  const jointsList = Object.values(allJoints);

  const getStatusBadge = (score: number) => {
    if (score >= 80) {
      return {
        text: 'LOW',
        badgeClass: 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300',
        icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      };
    }
    if (score >= 60) {
      return {
        text: 'MEDIUM',
        badgeClass: 'bg-amber-950/90 border-amber-600/80 text-amber-300',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
      };
    }
    return {
      text: 'CRITICAL',
      badgeClass: 'bg-red-950/90 border-red-600/80 text-red-300 animate-pulse',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
    };
  };

  const handleRowClick = (id: JointId) => {
    setSelectedJointId(id);
  };

  const handleInspect = (id: JointId) => {
    setSelectedJointId(id);
    setActiveTab('overview');
  };

  const handleSchedule = (id: JointId) => {
    setSelectedJointId(id);
    setWorkOrderModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Page Header */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <h2 className="font-mono font-bold text-base tracking-wider text-slate-100 uppercase">
              JOINT HEALTH MATRIX
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Full longitudinal conveyor splice inventory & degradation assessment
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Total Splices: <strong className="text-slate-200">5</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">
            Healthy: <strong>{jointsList.filter((j) => j.healthScore >= 80).length}</strong>
          </span>
          <span className="text-amber-400">
            Warning: <strong>{jointsList.filter((j) => j.healthScore >= 60 && j.healthScore < 80).length}</strong>
          </span>
          <span className="text-red-400">
            Critical: <strong>{jointsList.filter((j) => j.healthScore < 60).length}</strong>
          </span>
        </div>
      </div>

      {/* Main Joint Health Table */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            {/* Table Header */}
            <thead className="bg-[#070b13] border-b border-[#182338] text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Joint</th>
                <th className="py-3 px-3">Section</th>
                <th className="py-3 px-3">Splice Type</th>
                <th className="py-3 px-3">Health Score</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-4">Primary Signal</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#152033]">
              {jointsList.map((joint) => {
                const status = getStatusBadge(joint.healthScore);
                const isSelected = selectedJointId === joint.id;

                return (
                  <tr
                    key={joint.id}
                    onClick={() => handleRowClick(joint.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#121c2e] hover:bg-[#152238]'
                        : 'bg-[#0b101b] hover:bg-[#0e1624]'
                    }`}
                  >
                    {/* Joint ID */}
                    <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${joint.healthScore >= 80 ? 'bg-emerald-400' : joint.healthScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} />
                      <span className="text-sky-300 font-extrabold">{joint.id}</span>
                      {isSelected && (
                        <span className="text-[9px] bg-sky-950 border border-sky-600/60 text-sky-300 px-1 rounded">
                          FOCUSED
                        </span>
                      )}
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-3 font-semibold text-slate-300">
                      {joint.section}
                    </td>

                    {/* Splice Type */}
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                      {joint.spliceType}
                    </td>

                    {/* Health Score */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-extrabold text-sm ${
                            joint.healthScore >= 80
                              ? 'text-emerald-400'
                              : joint.healthScore >= 60
                              ? 'text-amber-400'
                              : 'text-red-400'
                          }`}
                        >
                          {joint.healthScore}
                        </span>
                        <div className="w-16 h-1.5 bg-[#162033] rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              joint.healthScore >= 80
                                ? 'bg-emerald-500'
                                : joint.healthScore >= 60
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${joint.healthScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Risk Level */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase inline-flex items-center gap-1 ${status.badgeClass}`}
                      >
                        {status.icon}
                        <span>{joint.risk}</span>
                      </span>
                    </td>

                    {/* Primary Signal */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="bg-[#070b13] border border-slate-800 px-2 py-0.5 rounded text-[11px]">
                        {joint.primarySignal}
                      </span>
                    </td>

                    {/* Recommended Action */}
                    <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-xs truncate" title={joint.recommendedAction}>
                      {joint.recommendedAction}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleInspect(joint.id)}
                          className="p-1.5 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-slate-300 hover:text-white"
                          title="Open in Overview console"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-400" />
                        </button>
                        <button
                          onClick={() => handleSchedule(joint.id)}
                          className="p-1.5 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-slate-300 hover:text-white"
                          title="Schedule inspection"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Joint Deep Breakdown Drawer */}
      {selectedJointId && allJoints[selectedJointId] && (
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between pb-2 mb-3 border-b border-[#182338] gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-sky-300">
                DEEP DIAGNOSTICS: JOINT {allJoints[selectedJointId].id} (SECTION {allJoints[selectedJointId].section})
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Position: {allJoints[selectedJointId].positionMeters}m from drive head
              </span>
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-[#0e1726] border border-[#1e2d46] px-2.5 py-1 rounded"
            >
              <span>Inspect in Overview Console</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded">
              <span className="text-slate-500 block text-[10px]">VIBRATION RMS</span>
              <span className="text-slate-100 font-bold text-base">
                {allJoints[selectedJointId].sensors.vibration.value} mm/s
              </span>
              <span className="text-slate-400 block text-[10px] mt-0.5">
                Status: {allJoints[selectedJointId].sensors.vibration.status}
              </span>
            </div>

            <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded">
              <span className="text-slate-500 block text-[10px]">TEMPERATURE</span>
              <span className="text-slate-100 font-bold text-base">
                {allJoints[selectedJointId].sensors.temperature.value} °C
              </span>
              <span className="text-slate-400 block text-[10px] mt-0.5">
                Status: {allJoints[selectedJointId].sensors.temperature.status}
              </span>
            </div>

            <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded">
              <span className="text-slate-500 block text-[10px]">MOTOR CURRENT</span>
              <span className="text-slate-100 font-bold text-base">
                {allJoints[selectedJointId].sensors.current.value} A
              </span>
              <span className="text-slate-400 block text-[10px] mt-0.5">
                Status: {allJoints[selectedJointId].sensors.current.status}
              </span>
            </div>

            <div className="bg-[#070b13] border border-[#162033] p-2.5 rounded">
              <span className="text-slate-500 block text-[10px]">BELT VELOCITY</span>
              <span className="text-slate-100 font-bold text-base">
                {allJoints[selectedJointId].sensors.speed.value} m/s
              </span>
              <span className="text-slate-400 block text-[10px] mt-0.5">
                Status: {allJoints[selectedJointId].sensors.speed.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
