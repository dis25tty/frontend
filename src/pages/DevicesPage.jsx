import React, { useEffect, useMemo, useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import DeviceDetailsPanel from '../components/DeviceDetailsPanel';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Warning', value: 'warning' },
  { label: 'Offline', value: 'offline' },
];

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [healthStatus, setHealthStatus] = useState('checking');
  const [healthMessage, setHealthMessage] = useState('');
  const [healthError, setHealthError] = useState('');

  const fetchUrl = useMemo(() => {
    if (!API_BASE_URL) return '';
    const base = API_BASE_URL.replace(/\/$/, '');
    if (statusFilter) {
      return `${base}/api/devices?status=${statusFilter}`;
    }
    return `${base}/api/devices`;
  }, [statusFilter, API_BASE_URL]);

  useEffect(() => {
    let cancelled = false;

    const fetchDevices = async () => {
      if (!fetchUrl) {
        setError('API base URL is not configured. Set VITE_API_BASE_URL in your .env.');
        setDevices([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch(fetchUrl, {
          headers: { accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch devices (${response.status})`);
        }

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error('Unexpected response format from devices endpoint.');
        }
        if (!cancelled) {
          setDevices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'An unexpected error occurred.');
          setDevices([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDevices();

    return () => {
      cancelled = true;
    };
  }, [fetchUrl]);

  useEffect(() => {
    let cancelled = false;

    const fetchHealth = async () => {
      if (!API_BASE_URL) {
        setHealthStatus('unhealthy');
        setHealthMessage('');
        setHealthError('API base URL is not configured. Set VITE_API_BASE_URL in your .env.');
        return;
      }

      setHealthError('');
      try {
        const base = API_BASE_URL.replace(/\/$/, '');
        const response = await fetch(`${base}/health`, {
          headers: { accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Health check failed (${response.status})`);
        }
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error('Unexpected response format from health endpoint.');
        }
        if (!cancelled) {
          setHealthStatus(data.status || 'ok');
          setHealthMessage(data.message || 'Healthy');
        }
      } catch (err) {
        if (!cancelled) {
          setHealthStatus('unhealthy');
          setHealthMessage('');
          setHealthError(err.message || 'Health check failed.');
        }
      }
    };

    fetchHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleCardClick = (device) => {
    setSelectedDevice(device);
  };

  const handleCloseDetails = () => {
    setSelectedDevice(null);
  };

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 px-4 py-5 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">Backend</p>
            <p className="mt-1 break-all text-sm text-slate-200">{API_BASE_URL || 'Not configured'}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-100 shadow-[0_0_0_6px_rgba(16,185,129,0.05)]">
            <span
              className={`h-2 w-2 rounded-full ${
                healthError ? 'bg-red-400' : healthStatus === 'ok' ? 'bg-emerald-400' : 'bg-amber-300'
              }`}
            />
            <span>{healthError ? 'Unreachable' : healthStatus === 'ok' ? 'Healthy' : 'Degraded'}</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {healthError || healthMessage || 'Monitoring service connectivity.'}
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-emerald-500/20 bg-slate-900/70 px-4 py-5 shadow-lg shadow-emerald-500/5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">Devices</h2>
          <p className="text-sm text-emerald-100/80">Monitor device health, status, and vitals in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm text-slate-400">Status</label>
          <select
            id="status"
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm shadow-emerald-500/10 focus:border-emerald-400 focus:outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-md shadow-emerald-500/5">
          <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/30 border-b-transparent" aria-hidden="true" />
          <span>Loading devices…</span>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow shadow-red-500/10">
          {error}
        </div>
      )}

      {!loading && !error && devices.length === 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-6 text-center text-sm text-slate-400">
          No devices found.
        </div>
      )}

      {!loading && devices.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard key={device.deviceId} device={device} onClick={() => handleCardClick(device)} />
          ))}
        </div>
      )}

      <DeviceDetailsPanel device={selectedDevice} onClose={handleCloseDetails} />
    </section>
  );
};

export default DevicesPage;
