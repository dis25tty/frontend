import React from 'react';
import StatusBadge from './StatusBadge';

const formatValue = (value, suffix) => {
  if (value === null || value === undefined) return 'N/A';
  return `${value}${suffix}`;
};

const DeviceCard = ({ device, onClick }) => {
  const hasTemp = device.temperature !== null && device.temperature !== undefined;
  const hasVoltage = device.voltage !== null && device.voltage !== undefined;
  const hasMetrics = hasTemp || hasVoltage;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full flex-col gap-3 overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 px-4 py-4 text-left shadow-lg transition-all hover:-translate-y-0.5 hover:border-lime-300/40 hover:shadow-[0_10px_28px_rgba(132,204,22,0.12)]"
    >
      <span className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-lime-300/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-white">{device.name}</div>
          <div className="font-mono text-xs text-slate-500">{device.deviceId}</div>
        </div>
        <StatusBadge status={device.status} />
      </div>

      {hasMetrics ? (
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
          <div className="rounded-lg border border-lime-300/20 bg-slate-950/80 px-3 py-2 shadow-inner shadow-lime-300/5">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Temperature</div>
            <div className="text-sm font-medium">{formatValue(device.temperature, ' °C')}</div>
          </div>
          <div className="rounded-lg border border-lime-300/20 bg-slate-950/80 px-3 py-2 shadow-inner shadow-lime-300/5">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Voltage</div>
            <div className="text-sm font-medium">{formatValue(device.voltage, ' V')}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-lime-300/20 bg-slate-950/80 px-3 py-2 text-sm text-slate-400 shadow-inner shadow-lime-300/5">
          No live metrics available.
        </div>
      )}
    </button>
  );
};

export default DeviceCard;
