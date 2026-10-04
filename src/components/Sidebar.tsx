import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  Layers,
  LineChart,
  Bell,
  Settings,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, alerts, demoMode } = useDashboard();

  const activeAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;
  const criticalAlertsCount = alerts.filter((a) => a.status === 'ACTIVE' && a.severity === 'CRITICAL').length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'joint-health',
      label: 'Joint Health',
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'sensor-analytics',
      label: 'Sensor Analytics',
      icon: <LineChart className="w-4 h-4" />
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: <Bell className="w-4 h-4" />,
      badge: activeAlertsCount > 0 ? (
        <span
          className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded ${
            criticalAlertsCount > 0
              ? 'bg-red-950 text-red-300 border border-red-700/80 animate-pulse'
              : 'bg-amber-950 text-amber-300 border border-amber-700/80'
          }`}
        >
          {activeAlertsCount}
        </span>
      ) : null
    }
  ];

  return (
    <aside className="w-56 bg-[#090d16] border-r border-[#1a2436] flex flex-col justify-between shrink-0 select-none min-h-[calc(100vh-53px)]">
      {/* Primary Navigation */}
      <div className="p-3">
        <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase px-2 mb-2">
          OPERATIONAL VIEWS
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-[#152033] text-sky-300 border-l-2 border-sky-400 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f1624]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-sky-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge}
              </button>
            );
          })}
        </nav>

        {/* Live Subsystem Indicator Block */}
        <div className="mt-6 pt-4 border-t border-[#182335] space-y-2">
          <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase px-2">
            SUBSYSTEM STATUS
          </div>
          
          <div className="bg-[#0b121e] border border-[#17243a] p-2 rounded text-[11px] font-mono space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-sky-400" />
                Line Scan Cam:
              </span>
              <span className="text-emerald-400 text-[10px]">SYNC (100fps)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <LineChart className="w-3 h-3 text-sky-400" />
                Piezo Array:
              </span>
              <span className="text-emerald-400 text-[10px]">ONLINE (10kHz)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-sky-400" />
                Thermal Nip:
              </span>
              <span className="text-emerald-400 text-[10px]">LOCKED</span>
            </div>
          </div>
        </div>

        {/* Condition Banner */}
        <div className="mt-4">
          <div
            className={`p-2 rounded border text-xs font-mono flex items-center gap-2 ${
              demoMode === 'CRITICAL'
                ? 'bg-red-950/40 border-red-800/60 text-red-300'
                : demoMode === 'WARNING'
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
            }`}
          >
            {demoMode === 'CRITICAL' ? (
              <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            ) : demoMode === 'WARNING' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <div>
              <div className="font-bold text-[11px] uppercase">STATE: {demoMode}</div>
              <div className="text-[10px] opacity-80">
                {demoMode === 'CRITICAL'
                  ? 'Urgent Action Required'
                  : demoMode === 'WARNING'
                  ? 'Monitoring Warning'
                  : 'All Nominal'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Settings & Engineering Disclosure */}
      <div className="p-3 border-t border-[#182335] space-y-2">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-mono transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#152033] text-sky-300 border-l-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f1624]'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span>Settings</span>
        </button>

        {/* Engineering Simulation Disclaimer (Transparent prototype notice) */}
        <div className="pt-2 border-t border-[#152030] text-[10px] text-slate-500 font-mono text-center leading-tight">
          <p>Prototype Interface</p>
          <p className="text-slate-600">Simulated Sensor Data</p>
        </div>
      </div>
    </aside>
  );
};
