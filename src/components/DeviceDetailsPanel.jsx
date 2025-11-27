import React from 'react';
import StatusBadge from './StatusBadge';

const DeviceDetailsPanel = ({ device, onClose }) => {
  if (!device) return null;

  const detailItems = [
    { label: 'Device ID', value: device.deviceId ?? 'N/A', monospace: true },
    { label: 'Status', value: device.status ? device.status.charAt(0).toUpperCase() + device.status.slice(1) : 'N/A' },
    { label: 'Temperature', value: device.temperature ?? 'N/A', suffix: device.temperature !== null && device.temperature !== undefined ? ' °C' : '' },
    { label: 'Voltage', value: device.voltage ?? 'N/A', suffix: device.voltage !== null && device.voltage !== undefined ? ' V' : '' },
  ];

  return (
    <div className="fixed inset-0 z-30 flex items-stretch justify-end bg-black/50 backdrop-blur">
      <div className="flex h-full w-full max-w-md flex-col border-l border-emerald-500/20 bg-slate-950 shadow-2xl shadow-emerald-500/10">
        <header className="flex items-start justify-between border-b border-emerald-500/20 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">Device Details</p>
            <h3 className="text-lg font-semibold text-white">{device.name}</h3>
            <p className="font-mono text-xs text-slate-500">{device.deviceId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-emerald-500/30 bg-slate-900 p-2 text-emerald-200 transition hover:border-emerald-400 hover:text-white"
            aria-label="Close details"
          >
            ×
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <StatusBadge status={device.status} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {detailItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-emerald-500/20 bg-slate-900/70 px-3 py-2 shadow-inner shadow-emerald-500/5"
              >
                <div className="text-[10px] uppercase tracking-wide text-slate-500">{item.label}</div>
                <div className={`${item.monospace ? 'font-mono' : 'font-medium'} text-sm text-white`}>
                  {item.value}
                  {item.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailsPanel;
