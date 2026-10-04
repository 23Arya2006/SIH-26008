import React, { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { generateTrendData, TimeFilter } from '../data/trends';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { LineChart as LineChartIcon, SlidersHorizontal } from 'lucide-react';

export const SensorTrend: React.FC = () => {
  const { selectedJointId, demoMode, timeFilter, setTimeFilter } = useDashboard();

  const trendData = useMemo(() => {
    return generateTrendData(selectedJointId, demoMode, timeFilter);
  }, [selectedJointId, demoMode, timeFilter]);

  const timeFiltersList: TimeFilter[] = ['1H', '6H', '24H'];

  // Custom Dark SCADA Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b121e] border border-[#1e2a40] p-2.5 rounded shadow-xl text-xs font-mono">
          <div className="text-slate-400 font-bold mb-1.5 pb-1 border-b border-slate-800">
            TIME: {label} (Joint {selectedJointId})
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-sky-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> Vibration:
              </span>
              <span className="font-bold">{payload[0]?.value} mm/s</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-amber-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Temperature:
              </span>
              <span className="font-bold">{payload[1]?.value} °C</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-yellow-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Motor Current:
              </span>
              <span className="font-bold">{payload[2]?.value} A</span>
            </div>
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
        <div className="flex flex-wrap items-center justify-between pb-2 mb-3 border-b border-[#182338] gap-2">
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              SENSOR TRENDS
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-[#070b13] px-1.5 py-0.2 rounded border border-slate-800">
              Joint {selectedJointId}
            </span>
          </div>

          {/* Time Filter Toggle Buttons: 1H, 6H, 24H */}
          <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded text-xs font-mono">
            {timeFiltersList.map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-2.5 py-0.5 rounded transition-colors font-medium ${
                  timeFilter === filter
                    ? 'bg-[#1a2538] text-sky-300 font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Series Recharts Line Graph */}
        <div className="h-64 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />
              
              <XAxis
                dataKey="time"
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                tickLine={{ stroke: '#1e293b' }}
              />
              
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                tickLine={{ stroke: '#1e293b' }}
                domain={[0, 'auto']}
              />

              <Tooltip content={<CustomTooltip />} />
              
              <Legend
                wrapperStyle={{
                  paddingTop: '8px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: '#94a3b8'
                }}
              />

              {/* Threshold reference lines */}
              <ReferenceLine
                y={6.0}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: 'Critical (6 mm/s)',
                  fill: '#ef4444',
                  fontSize: 9,
                  position: 'insideTopRight'
                }}
              />
              <ReferenceLine
                y={3.5}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: 'Warning (3.5 mm/s)',
                  fill: '#f59e0b',
                  fontSize: 9,
                  position: 'insideTopRight'
                }}
              />

              {/* Vibration Line (Sky Blue) */}
              <Line
                type="monotone"
                dataKey="vibration"
                name="Vibration (mm/s)"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#38bdf8' }}
              />

              {/* Temperature Line (Amber) */}
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature (°C)"
                stroke="#fbbf24"
                strokeWidth={1.75}
                dot={false}
                activeDot={{ r: 4, fill: '#fbbf24' }}
              />

              {/* Motor Current Line (Yellow-Green) */}
              <Line
                type="monotone"
                dataKey="current"
                name="Motor Current (A)"
                stroke="#a3e635"
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, fill: '#a3e635' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-2 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>Sampling interval: {timeFilter === '1H' ? '5m' : timeFilter === '6H' ? '20m' : '60m'}</span>
        <span className="text-slate-400">Natural signal noise & harmonic fluctuations active</span>
      </div>
    </div>
  );
};
