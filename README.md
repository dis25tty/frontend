# EV Device Monitoring Dashboard (Frontend)

A Vite + React + Tailwind dashboard for monitoring EV devices. It fetches data from the backend (default `http://localhost:5000`) and shows status, metrics, and details in a modern UI.

## Visuals

## Prerequisites
- Node.js 18+
- Backend API running at `http://localhost:5000` (or your custom `VITE_API_BASE_URL`)

## Setup
1) Install dependencies:
```bash
npm install
```

2) Environment
- `.env` is already included with:
  - `VITE_API_BASE_URL=http://localhost:5000`
  - `VITE_API_KEY=emoenergy123`

## Development
Run the dev server:
```bash
npm run dev
```
Then open the provided localhost URL (typically `http://localhost:5173`).


## Project Structure
- `src/App.jsx` – Layout shell
- `src/pages/DevicesPage.jsx` – Fetches/filter devices, manages loading/error, details panel
- `src/components/DeviceCard.jsx` – Device summary card
- `src/components/StatusBadge.jsx` – Status pill (Active/Warning/Offline)
- `src/components/DeviceDetailsPanel.jsx` – Side drawer with device info
- `src/styles/index.css` – Tailwind entry + theme styling

## API Endpoints Used
- `GET /health`
- `GET /api/devices`
- `GET /api/devices?status=active|warning|offline`

## Notes
- Uses `VITE_API_BASE_URL` at build/runtime; ensure the backend allows CORS for the frontend origin.
- Loading, error, and empty states are included; clicking a card opens the details panel.

## Screenshots
![Dashboard]([frontend-ui-images/dashboard.png](https://github.com/dis25tty/frontend/blob/main/frontend-ui-images/Screenshot%202025-11-27%20at%209.50.31%E2%80%AFPM.png))
![Device Cards](frontend-ui-images/cards-light.png)
![Details Panel](frontend-ui-images/details.png)
