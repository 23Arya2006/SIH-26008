import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { AlertSeverity } from '../types';
import { Bell, AlertTriangle, AlertOctagon, Info, Check, ArrowRight } from 'lucide-react';

export const AlertList: React.FC = () => {
  const { alerts, acknowledgeAlert, setSelectedJointId, setActiveTab } = useDashboard();

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: <AlertOctagon className="w-3.5 h-3.5 text-red-400" />,
          badge: 'bg-red-950/90 border-red-600 text-red-300',
          dot: 'bg-red-400 animate-ping'
        };
      case 'WARNING':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
          badge: 'bg-amber-950/90 border-amber-600 text-amber-300',
          dot: 'bg-amber-400'
        };
      case 'INFO':
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-sky-400" />,
          badge: 'bg-sky-950/80 border-sky-700 text-sky-300',
          dot: 'bg-sky-400'
        };
    }
  };

  const handleJointClick = (jointId: any) => {
    setSelectedJointId(jointId);
  };

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
            RECENT ALERTS
          </h3>
        </div>

        <button
          onClick={() => setActiveTab('alerts')}
          className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline"
        >
          <span>View All Alarms ({alerts.length})</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Alerts Compact Table / Feed */}
      <div className="space-y-2">
        {alerts.slice(0, 4).map((alert) => {
          const style = getSeverityBadge(alert.severity);
          const isAcked = alert.status === 'ACKNOWLEDGED' || alert.status === 'RESOLVED';

          return (
            <div
              key={alert.id}
              className={`p-2.5 rounded border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
                alert.severity === 'CRITICAL' && !isAcked
                  ? 'bg-red-950/25 border-red-800/80'
                  : alert.severity === 'WARNING' && !isAcked
                  ? 'bg-amber-950/20 border-amber-800/80'
                  : 'bg-[#070b13] border-[#162033]'
              }`}
            >
              {/* Left Details: Severity + Joint Badge + Message */}
              <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                {/* Severity Badge */}
                <span
                  className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold uppercase flex items-center gap-1 shrink-0 ${style.badge}`}
                >
                  {style.icon}
                  <span>{alert.severity}</span>
                </span>

                {/* Joint ID pill (clickable) */}
                <button
                  onClick={() => handleJointClick(alert.jointId)}
                  className="px-2 py-0.5 rounded bg-[#131c2d] hover:bg-[#1a273e] border border-[#23334c] text-sky-300 font-mono text-xs font-bold shrink-0 transition-colors"
                  title="Click to focus joint"
                >
                  {alert.jointId}
                </button>

                {/* Message Text */}
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-200 truncate max-w-xl">
                    {alert.message}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    Signal: {alert.signal} • Section {alert.section}
                  </span>
                </div>
              </div>

              {/* Right: Timestamp & Action */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                  {alert.time}
                </span>

                {isAcked ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{alert.status}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="px-2.5 py-1 rounded bg-[#141f33] hover:bg-[#1b2b46] border border-[#233554] text-slate-300 hover:text-white font-mono text-[10px] font-bold transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
