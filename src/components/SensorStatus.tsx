import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { SensorStatusType } from '../types';
import { Radio, Gauge, Flame, Zap, Activity } from 'lucide-react';

export const SensorStatus: React.FC = () => {
  const { currentJoint } = useDashboard();
  const { vibration, temperature, current, speed } = currentJoint.sensors;

  const getStatusStyle = (status: SensorStatusType) => {
    switch (status) {
      case 'NORMAL':
        return {
          textColor: 'text-emerald-400',
          badge: 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300',
          barColor: 'bg-emerald-500',
          dot: 'bg-emerald-400'
        };
      case 'SLIGHTLY ELEVATED':
        return {
          textColor: 'text-amber-400',
          badge: 'bg-amber-950/80 border-amber-600/70 text-amber-300',
          barColor: 'bg-amber-500',
          dot: 'bg-amber-400'
        };
      case 'ELEVATED':
        return {
          textColor: 'text-amber-400',
          badge: 'bg-amber-950/90 border-amber-500/80 text-amber-300',
          barColor: 'bg-amber-500',
          dot: 'bg-amber-400 animate-pulse'
        };
      case 'CRITICAL':
        return {
          textColor: 'text-red-400',
          badge: 'bg-red-950/90 border-red-500/80 text-red-300 animate-pulse',
          barColor: 'bg-red-500',
          dot: 'bg-red-400 animate-ping'
        };
      default:
        return {
          textColor: 'text-slate-300',
          badge: 'bg-slate-800 text-slate-300',
          barColor: 'bg-slate-500',
          dot: 'bg-slate-400'
        };
    }
  };

  const sensorsList = [
    {
      key: 'vibration',
      title: 'VIBRATION',
      sublabel: 'Tri-Axial RMS',
      metric: vibration,
      icon: <Activity className="w-4 h-4 text-sky-400" />,
      gaugePercent: Math.min(100, Math.round((vibration.value / 8.0) * 100))
    },
    {
      key: 'temperature',
      title: 'TEMPERATURE',
      sublabel: 'Splice Pyrometer',
      metric: temperature,
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      gaugePercent: Math.min(100, Math.round(((temperature.value - 20) / 60) * 100))
    },
    {
      key: 'current',
      title: 'MOTOR CURRENT',
      sublabel: 'Drive Inverter',
      metric: current,
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      gaugePercent: Math.min(100, Math.round(((current.value - 15) / 35) * 100))
    },
    {
      key: 'speed',
      title: 'BELT SPEED',
      sublabel: 'Tail Encoder',
      metric: speed,
      icon: <Gauge className="w-4 h-4 text-emerald-400" />,
      gaugePercent: Math.min(100, Math.round((speed.value / 3.2) * 100))
    }
  ];

  return (
    <div className="bg-[#0b101b] border border-[#1b273d] rounded p-3.5 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182338]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-100 uppercase">
              SENSOR STATUS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-[#070b13] px-2 py-0.5 rounded border border-[#162033]">
            {currentJoint.id} Real-time Array
          </span>
        </div>

        {/* 4 Sensor Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {sensorsList.map((item) => {
            const style = getStatusStyle(item.metric.status);
            return (
              <div
                key={item.key}
                className="bg-[#070b13] border border-[#162033] rounded p-2.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                {/* Header: Title + Status Badge */}
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {item.icon}
                    <span className="text-[10px] font-mono font-bold text-slate-300">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase whitespace-nowrap ${style.badge}`}
                  >
                    {item.metric.status}
                  </span>
                </div>

                {/* Main Readout Value */}
                <div className="my-1">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-lg font-black tracking-tight ${style.textColor}`}>
                      {item.metric.value}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">
                      {item.metric.unit}
                    </span>
                  </div>
                </div>

                {/* Visual Indicator: Gauge Bar + Baseline */}
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 w-full bg-[#121a28] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${style.barColor}`}
                      style={{ width: `${item.gaugePercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>Base: {item.metric.baseline}</span>
                    <span className="text-slate-400">{item.metric.trend}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsystem Sync Tag */}
      <div className="mt-3 pt-2 border-t border-[#162033] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>Transducer Bus: CANopen / Modbus RTU</span>
        <span className="text-emerald-400">● 100% Signal Integrity</span>
      </div>
    </div>
  );
};
