import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useDashboard();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none font-mono">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`p-3 rounded border shadow-xl flex items-start gap-2.5 pointer-events-auto transition-all animate-slideUp ${
              isError
                ? 'bg-[#1a0c10] border-red-600/80 text-red-200'
                : isWarning
                ? 'bg-[#181308] border-amber-600/80 text-amber-200'
                : isSuccess
                ? 'bg-[#071712] border-emerald-600/80 text-emerald-200'
                : 'bg-[#0b1320] border-sky-600/80 text-sky-200'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isError ? (
                <AlertOctagon className="w-4 h-4 text-red-400" />
              ) : isWarning ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-sky-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs uppercase tracking-wide">
                  {toast.title}
                </span>
                <span className="text-[9px] text-slate-400">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
