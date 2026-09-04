/**
 * websocketGatewayClient.js
 *
 * Placeholder for the future FastAPI/WebSocket backend.
 * Do not import this from the UI until the server exists.
 *
 * Suggested FastAPI endpoint:
 *   ws://<gateway-host>:8000/ws/telemetry
 *
 * The live client should emit the same snapshot object as dummyDataService
 * so Dashboard.jsx and hooks remain unchanged.
 */

export function subscribe() {
  throw new Error('WebSocket gateway client is not wired yet. Use dummyDataService via gatewayClient.js.')
}

export function pause() {}
export function resume() {}
export function setPaused() {}
export function clearCanLog() {}
export function resetStatistics() {}
