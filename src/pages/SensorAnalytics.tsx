import React, { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { JointId } from '../types';
import { generateTrendData, TimeFilter } from '../data/trends';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { LineChart as LineChartIcon, Activity, Flame, Zap, Gauge, SlidersHorizontal } from 'lucide-react';

export const SensorAnalytics: React.FC = () => {
  const {
    selectedJointId,
    setSelectedJointId,
    demoMode,
    timeFilter,
    setTimeFilter,
    allJoints
  } = useDashboard();

  const jointsList: JointId[] = ['J-01', 'J-02', 'J-03', 'J-04', 'J-05'];
  const timeFiltersList: TimeFilter[] = ['1H', '6H', '24H'];

  const trendData = useMemo(() => {
    return generateTrendData(selectedJointId, demoMode, timeFilter);
  }, [selectedJointId, demoMode, timeFilter]);

  const currentJoint = allJoints[selectedJointId];

  // Custom Chart Tooltip
  const CustomAnalyticsTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b121e] border border-[#1e2a40] p-2 rounded shadow-xl text-xs font-mono">
          <div className="text-slate-400 font-bold mb-1">
            TIME: {label} (Joint {selectedJointId})
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-200">
            <span>Value:</span>
            <span className="font-bold text-sky-400">{payload[0].value} {unit}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 pb-6 font-mono">
      {/* Page Header */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-sky-400" />
            <h2 className="font-bold text-base tracking-wider text-slate-100 uppercase">
              SENSOR ANALYTICS & TELEMETRY WORKBENCH
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized high-frequency multi-channel telemetry inspection
          </p>
        </div>

        {/* Joint Selector Pills + Time Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Joint Selector */}
          <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded text-xs">
            <span className="text-[10px] text-slate-500 uppercase px-2">JOINT:</span>
            {jointsList.map((jId) => (
              <button
                key={jId}
                onClick={() => setSelectedJointId(jId)}
                className={`px-2.5 py-1 rounded font-bold transition-colors ${
                  selectedJointId === jId
                    ? 'bg-[#1b2840] text-sky-300 border border-sky-600/60 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {jId}
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="flex items-center bg-[#070b13] border border-[#162033] p-0.5 rounded text-xs">
            {timeFiltersList.map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-2.5 py-1 rounded font-bold transition-colors ${
                  timeFilter === f
                    ? 'bg-[#1b2840] text-sky-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Dedicated Sensor Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* 1. VIBRATION TREND */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#182338]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="font-bold text-xs uppercase text-slate-200">
                1. VIBRATION TREND (RMS)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-sky-400">{currentJoint.sensors.vibration.value} mm/s</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 rounded">
                {currentJoint.sensors.vibration.status}
              </span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 15, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[0, 10]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={<CustomAnalyticsTooltip unit="mm/s" />} />
                <ReferenceLine y={6.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Crit 6.0', fill: '#ef4444', fontSize: 9 }} />
                <ReferenceLine y={3.5} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Warn 3.5', fill: '#f59e0b', fontSize: 9 }} />
                <Area type="monotone" dataKey="vibration" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#vibGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>IEPE Accelerometer (10 kHz Tri-Axial)</span>
            <span>Baseline: 1.2–2.0 mm/s</span>
          </div>
        </div>

        {/* 2. TEMPERATURE TREND */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#182338]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-xs uppercase text-slate-200">
                2. TEMPERATURE TREND
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-amber-400">{currentJoint.sensors.temperature.value} °C</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 rounded">
                {currentJoint.sensors.temperature.status}
              </span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 15, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[20, 80]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={<CustomAnalyticsTooltip unit="°C" />} />
                <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Crit 60°C', fill: '#ef4444', fontSize: 9 }} />
                <ReferenceLine y={48} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Warn 48°C', fill: '#f59e0b', fontSize: 9 }} />
                <Area type="monotone" dataKey="temperature" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#tempGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>Long-Wave Infrared Micro-Pyrometer Array</span>
            <span>Baseline: 32–40°C</span>
          </div>
        </div>

        {/* 3. MOTOR CURRENT TREND */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#182338]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <h3 className="font-bold text-xs uppercase text-slate-200">
                3. MOTOR CURRENT TREND
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-yellow-400">{currentJoint.sensors.current.value} A</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 rounded">
                {currentJoint.sensors.current.status}
              </span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 15, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="currGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a3e635" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[15, 60]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={<CustomAnalyticsTooltip unit="A" />} />
                <ReferenceLine y={40} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Crit 40A', fill: '#ef4444', fontSize: 9 }} />
                <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Warn 30A', fill: '#f59e0b', fontSize: 9 }} />
                <Area type="monotone" dataKey="current" stroke="#a3e635" strokeWidth={2} fillOpacity={1} fill="url(#currGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>Drive Inverter Hall-Effect Current Transducer</span>
            <span>Baseline: 22–26 A</span>
          </div>
        </div>

        {/* 4. BELT SPEED TREND */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#182338]">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase text-slate-200">
                4. BELT SPEED TREND
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-emerald-400">{currentJoint.sensors.speed.value} m/s</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 rounded">
                {currentJoint.sensors.speed.status}
              </span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 15, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="spdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162033" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[1.5, 3.5]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={<CustomAnalyticsTooltip unit="m/s" />} />
                <ReferenceLine y={2.4} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Slip 2.4', fill: '#f59e0b', fontSize: 9 }} />
                <Area type="monotone" dataKey="speed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#spdGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>Tail Pulley Rotary Optical Encoder (2048 PPR)</span>
            <span>Target: 2.8 m/s</span>
          </div>
        </div>

      </div>
    </div>
  );
};
