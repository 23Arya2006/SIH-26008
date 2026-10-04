import React, { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { HEALTH_HISTORY_CURVES } from '../data/trends';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { History, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const HealthHistory: React.FC = () => {
  const { selectedJointId, demoMode, currentJoint } = useDashboard();

  const historyData = useMemo(() => {
    const modeCurves = HEALTH_HISTORY_CURVES[demoMode] || HEALTH_HISTORY_CURVES['WARNING'];
    return modeCurves[selectedJointId] || modeCurves['J-03'];
  }, [demoMode, selectedJointId]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      let zone = 'HEALTHY';
      let zoneColor = 'text-emerald-400';
      if (score < 60) {
        zone = 'CRITICAL';
        zoneColor = 'text-red-400';
      } else if (score < 80) {
        zone = 'WARNING';
        zoneColor = 'text-amber-400';
      }

      return (
        <div className="bg-[#0b121e] border border-[#1e2a40] p-2 rounded shadow-xl text-xs font-mono">
          <div className="text-slate-400 font-bold mb-1">
            INTERVAL: {label} (Shift Progression)
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-300">Health Index:</span>
            <span className="font-bold text-slate-100">{score} / 100</span>
          </div>
          <div className="flex items-center justify-between gap-3 mt-0.5">
            <span className="text-slate-400">Operating Zone:</span>
            <span className={`font-bold ${zoneColor}`}>{zone}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              JOINT HEALTH HISTORY
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-[#070b13] px-1.5 py-0.2 rounded border border-slate-800">
              {selectedJointId} Degradation Curve
            </span>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400">80-100 Healthy</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400">60-79 Warning</span>
            <span className="text-slate-600">|</span>
            <span className="text-red-400">0-59 Critical</span>
          </div>
        </div>

        {/* Degradation Line Chart with Colored Reference Areas */}
        <div className="h-64 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
              {/* Shaded Threshold Zones */}
              <ReferenceArea y1={80} y2={100} fill="#10b981" fillOpacity={0.06} />
              <ReferenceArea y1={60} y2={80} fill="#f59e0b" fillOpacity={0.08} />
              <ReferenceArea y1={0} y2={60} fill="#ef4444" fillOpacity={0.12} />

              <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />

              <XAxis
                dataKey="shift"
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                tickLine={{ stroke: '#1e293b' }}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                tickLine={{ stroke: '#1e293b' }}
              />

              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.7} />
              <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.7} />

              <Line
                type="monotone"
                dataKey="score"
                name="Health Score"
                stroke={
                  currentJoint.healthScore >= 80
                    ? '#10b981'
                    : currentJoint.healthScore >= 60
                    ? '#f59e0b'
                    : '#ef4444'
                }
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: '#0b101b',
                  strokeWidth: 2,
                  stroke:
                    currentJoint.healthScore >= 80
                      ? '#10b981'
                      : currentJoint.healthScore >= 60
                      ? '#f59e0b'
                      : '#ef4444'
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mandatory Label from requirement #13 */}
      <div className="mt-2 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="text-slate-400 font-bold uppercase tracking-wider">
          SIMULATED PROTOTYPE DATA
        </span>
        <span className="text-slate-500">7-Shift Longitudinal Splice History</span>
      </div>
    </div>
  );
};
