# CAN-to-Ethernet Gateway Dashboard

Frontend monitoring interface for the college project **Real-Time Automotive CAN-to-Ethernet Zonal Gateway**.

This is a **React dashboard only**. It currently uses **generated dummy data**. It is not connected to CAN, MCP2515, QNX, SPI, Ethernet drivers, or Raspberry Pi hardware.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Replace dummy data with FastAPI / WebSocket

UI code reads from `src/services/gatewayClient.js`.

Today:

`components / hooks` → `gatewayClient.js` → `dummyDataService.js`

Later:

`components / hooks` → `gatewayClient.js` → FastAPI WebSocket → QNX Raspberry Pi gateway

Keep the snapshot shape from `dummyDataService.js` (`createSnapshot`) when you add a live client in `src/services/websocketGatewayClient.js`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repo, open **Settings → Pages**.
3. Set source to **GitHub Actions** or **Deploy from a branch**.
4. `vite.config.js` uses `base: './'` so built assets work from `https://<user>.github.io/<repo>/`.

Example using the `gh-pages` package:

```bash
npm install -D gh-pages
```

Add to `package.json` scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:

```bash
npm run deploy
```

If the site is served from a project page (`/<repo>/`), `base: './'` is already configured.
