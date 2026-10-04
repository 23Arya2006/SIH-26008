import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { AlertSeverity, AlertStatus, JointId } from '../types';
import { Bell, AlertTriangle, AlertOctagon, Info, Check, CheckCheck, Eye, Filter, RefreshCw } from 'lucide-react';

export const Alerts: React.FC = () => {
  const {
    alerts,
    acknowledgeAlert,
    resolveAlert,
    acknowledgeAllAlerts,
    setSelectedJointId,
    setActiveTab
  } = useDashboard();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter !== 'ALL' && alert.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && alert.status !== statusFilter) return false;
    return true;
  });

  const getSeverityStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: <AlertOctagon className="w-3.5 h-3.5 text-red-400" />,
          badge: 'bg-red-950/90 border-red-600 text-red-300'
        };
      case 'WARNING':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
          badge: 'bg-amber-950/90 border-amber-600 text-amber-300'
        };
      case 'INFO':
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-sky-400" />,
          badge: 'bg-sky-950/80 border-sky-700 text-sky-300'
        };
    }
  };

  const handleViewJoint = (jointId: JointId) => {
    setSelectedJointId(jointId);
    setActiveTab('overview');
  };

  return (
    <div className="space-y-4 pb-6 font-mono">
      {/* Page Header & SCADA Action Strip */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-sky-400" />
            <h2 className="font-bold text-base tracking-wider text-slate-100 uppercase">
              SCADA ALARM CONSOLE & EVENT LOG
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational alarms, threshold breaches, and audit history
          </p>
        </div>

        {/* Batch Acknowledge Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={acknowledgeAllAlerts}
            className="px-3 py-1.5 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Acknowledge All ({alerts.filter((a) => a.status === 'ACTIVE').length})</span>
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Severity Filter */}
          <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded">
            <span className="text-[10px] text-slate-500 uppercase px-2">SEVERITY:</span>
            {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  severityFilter === sev
                    ? 'bg-[#1b2840] text-sky-300 font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded">
            <span className="text-[10px] text-slate-500 uppercase px-2">STATUS:</span>
            {['ALL', 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-[#1b2840] text-sky-300 font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-slate-400 text-xs">
          Showing <strong className="text-slate-200">{filteredAlerts.length}</strong> of {alerts.length} events
        </div>
      </div>

      {/* Alarms Table */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070b13] border-b border-[#182338] text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-3">Joint</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-4">Signal</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#152033]">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No alarms match the specified filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => {
                  const style = getSeverityStyle(alert.severity);

                  return (
                    <tr
                      key={alert.id}
                      className="bg-[#0b101b] hover:bg-[#0e1624] transition-colors"
                    >
                      {/* Time */}
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        <div className="font-bold text-slate-200">{alert.timestamp}</div>
                        <div className="text-[10px] text-slate-500">{alert.time}</div>
                      </td>

                      {/* Joint ID */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <button
                          onClick={() => handleViewJoint(alert.jointId)}
                          className="px-2 py-0.5 rounded bg-[#131c2d] hover:bg-[#1a273e] border border-[#23334c] text-sky-300 font-bold text-xs"
                          title="View on conveyor schematic"
                        >
                          {alert.jointId} (Sec {alert.section})
                        </button>
                      </td>

                      {/* Severity */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase inline-flex items-center gap-1 ${style.badge}`}
                        >
                          {style.icon}
                          <span>{alert.severity}</span>
                        </span>
                      </td>

                      {/* Signal */}
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        <span className="bg-[#070b13] border border-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {alert.signal}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-4 text-slate-200 max-w-md leading-snug">
                        <div>{alert.message}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Protocol: {alert.recommendedAction}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            alert.status === 'ACTIVE'
                              ? 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                              : alert.status === 'ACKNOWLEDGED'
                              ? 'bg-sky-950/80 border-sky-600/60 text-sky-300'
                              : 'bg-emerald-950/80 border-emerald-600/60 text-emerald-300'
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {alert.status === 'ACTIVE' && (
                            <button
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="px-2 py-1 rounded bg-[#141f33] hover:bg-[#1b2b46] border border-[#233554] text-slate-300 hover:text-white text-[11px] font-bold"
                            >
                              Acknowledge
                            </button>
                          )}

                          {alert.status === 'ACKNOWLEDGED' && (
                            <button
                              onClick={() => resolveAlert(alert.id)}
                              className="px-2 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 text-[11px] font-bold"
                            >
                              Resolve
                            </button>
                          )}

                          <button
                            onClick={() => handleViewJoint(alert.jointId)}
                            className="p-1 rounded bg-[#10192a] hover:bg-[#162238] border border-[#233552] text-sky-400 hover:text-white"
                            title="View joint in Overview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
