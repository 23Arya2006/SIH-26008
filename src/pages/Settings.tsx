import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Settings as SettingsIcon, Sliders, Bell, Cpu, Save, ShieldAlert, Radio } from 'lucide-react';

export const Settings: React.FC = () => {
  const { addToast } = useDashboard();

  const [pollingRate, setPollingRate] = useState<string>('100ms');
  const [buzzerEnabled, setBuzzerEnabled] = useState<boolean>(true);
  const [autoAcknowledgeInfo, setAutoAcknowledgeInfo] = useState<boolean>(false);
  const [vibrationWarnLimit, setVibrationWarnLimit] = useState<number>(3.5);
  const [vibrationCritLimit, setVibrationCritLimit] = useState<number>(6.0);
  const [tempWarnLimit, setTempWarnLimit] = useState<number>(48);
  const [tempCritLimit, setTempCritLimit] = useState<number>(60);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Configuration Saved',
      message: 'SCADA parameters and sensor threshold calibration updated successfully.'
    });
  };

  return (
    <div className="space-y-4 pb-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 flex items-center justify-between shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-sky-400" />
            <h2 className="font-bold text-base tracking-wider text-slate-100 uppercase">
              SCADA SYSTEM CONFIGURATION & CALIBRATION
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineering parameters, sensor thresholds, and network telemetry rates
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Section 1: Conveyor Specifications */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#182338]">
            <Cpu className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-xs uppercase text-slate-200">
              1. CONVEYOR ASSET DESIGNATION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">
                CONVEYOR FLIGHT ID
              </label>
              <input
                type="text"
                disabled
                value="CV-104 (Primary Iron Ore Line)"
                className="w-full bg-[#070b13] border border-[#1b273d] rounded px-3 py-1.5 text-slate-300 opacity-80"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">
                BELT CARCASS SPECIFICATION
              </label>
              <input
                type="text"
                disabled
                value="ST-4500 Heavy-Duty Steel Cord"
                className="w-full bg-[#070b13] border border-[#1b273d] rounded px-3 py-1.5 text-slate-300 opacity-80"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">
                FLIGHT LENGTH & SPLICE COUNT
              </label>
              <input
                type="text"
                disabled
                value="1,420 m Total Length • 5 Splices (J-01 to J-05)"
                className="w-full bg-[#070b13] border border-[#1b273d] rounded px-3 py-1.5 text-slate-300 opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Sensor Thresholds */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#182338]">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-xs uppercase text-slate-200">
              2. SENSOR ALARM THRESHOLDS & ISO LIMITS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Vibration */}
            <div className="bg-[#070b13] border border-[#162033] p-3 rounded space-y-2">
              <span className="font-bold text-sky-300 block">Vibration RMS Limits (ISO 10816 Zone B/C/D)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-amber-400 uppercase">Warning Limit (mm/s)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vibrationWarnLimit}
                    onChange={(e) => setVibrationWarnLimit(parseFloat(e.target.value))}
                    className="w-full bg-[#0b101b] border border-amber-600/60 rounded px-2.5 py-1 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-red-400 uppercase">Critical Limit (mm/s)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vibrationCritLimit}
                    onChange={(e) => setVibrationCritLimit(parseFloat(e.target.value))}
                    className="w-full bg-[#0b101b] border border-red-600/60 rounded px-2.5 py-1 text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-[#070b13] border border-[#162033] p-3 rounded space-y-2">
              <span className="font-bold text-amber-300 block">Splice Pyrometer Thermal Limits</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-amber-400 uppercase">Warning Limit (°C)</label>
                  <input
                    type="number"
                    step="1"
                    value={tempWarnLimit}
                    onChange={(e) => setTempWarnLimit(parseFloat(e.target.value))}
                    className="w-full bg-[#0b101b] border border-amber-600/60 rounded px-2.5 py-1 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-red-400 uppercase">Critical Limit (°C)</label>
                  <input
                    type="number"
                    step="1"
                    value={tempCritLimit}
                    onChange={(e) => setTempCritLimit(parseFloat(e.target.value))}
                    className="w-full bg-[#0b101b] border border-red-600/60 rounded px-2.5 py-1 text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Telemetry & Sound */}
        <div className="bg-[#0b101b] border border-[#1b273d] rounded p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#182338]">
            <Radio className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-xs uppercase text-slate-200">
              3. TELEMETRY REFRESH & SCADA BUZZER
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">
                TRANSDUCER POLLING RATE
              </label>
              <select
                value={pollingRate}
                onChange={(e) => setPollingRate(e.target.value)}
                className="w-full bg-[#070b13] border border-[#1b273d] rounded px-3 py-1.5 text-slate-200"
              >
                <option value="50ms">50 ms (High-Speed Line-Scan Synchronous)</option>
                <option value="100ms">100 ms (Standard Realtime SCADA)</option>
                <option value="500ms">500 ms (Balanced Network Bandwidth)</option>
                <option value="1000ms">1.0 s (Low-Bandwidth Remote Uplink)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="buzzer"
                checked={buzzerEnabled}
                onChange={(e) => setBuzzerEnabled(e.target.checked)}
                className="w-4 h-4 rounded bg-[#070b13] border-slate-700 text-sky-500"
              />
              <label htmlFor="buzzer" className="text-slate-300 select-none">
                Enable Audio Alarm Sounders on Critical Alarms
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="autoAck"
                checked={autoAcknowledgeInfo}
                onChange={(e) => setAutoAcknowledgeInfo(e.target.checked)}
                className="w-4 h-4 rounded bg-[#070b13] border-slate-700 text-sky-500"
              />
              <label htmlFor="autoAck" className="text-slate-300 select-none">
                Auto-Acknowledge Routine INFO Diagnostic Logs
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </div>
      </form>
    </div>
  );
};
