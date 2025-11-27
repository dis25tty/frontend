import React from 'react';
import DevicesPage from './pages/DevicesPage';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-emerald-500/20 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">EMO-ENERGY</p>
            <h1 className="text-2xl font-semibold">EV Device Monitoring Dashboard</h1>
          </div>
          <div className="hidden text-sm text-emerald-200 sm:block">
            Monitoring health of connected EV devices
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        <DevicesPage />
      </main>
    </div>
  );
};

export default App;
