import React from 'react';
import DevicesPage from './pages/DevicesPage';

const App = () => {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-10 border-b border-lime-400/20 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-lime-300/90">EMO-ENERGY</p>
            <h1 className="text-2xl font-semibold text-white">EV Device Monitoring Dashboard</h1>
          </div>
          <div className="hidden text-sm text-lime-200 sm:block">
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
