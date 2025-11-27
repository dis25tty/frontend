import React from 'react';

const statusStyles = {
  active: {
    label: 'Active',
    classes: 'border-lime-300/60 bg-lime-300/15 text-lime-100 shadow-[0_0_12px_rgba(190,242,100,0.35)]',
    dot: 'bg-lime-300',
  },
  warning: {
    label: 'Warning',
    classes: 'border-amber-400/50 bg-amber-400/15 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.35)]',
    dot: 'bg-amber-300',
  },
  offline: {
    label: 'Offline',
    classes: 'border-slate-500/50 bg-slate-700/30 text-slate-200 shadow-[0_0_12px_rgba(148,163,184,0.2)]',
    dot: 'bg-slate-400',
  },
};

const StatusBadge = ({ status }) => {
  const variant = statusStyles[status] || statusStyles.offline;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variant.classes}`}
    >
      <span className={`h-2 w-2 rounded-full ${variant.dot}`} aria-hidden="true" />
      <span>{variant.label}</span>
    </span>
  );
};

export default StatusBadge;
