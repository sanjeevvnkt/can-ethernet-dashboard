/**
 * gatewayClient.js
 *
 * UI-facing data interface. Components and hooks should import from here,
 * never from dummyDataService.js directly.
 *
 * Current source: dummyDataService (generated telemetry).
 *
 * To connect a FastAPI/WebSocket backend later:
 *  1. Create `websocketGatewayClient.js` that speaks the same function names
 *     and snapshot shape as dummyDataService.
 *  2. Point `activeClient` at that module.
 *  3. Leave dashboard components unchanged.
 *
 * Expected live path:
 *   dummyDataService  ->  FastAPI / WebSocket  ->  QNX Raspberry Pi Gateway
 */

import * as dummyDataService from './dummyDataService'

// Swap this assignment when the backend is ready, for example:
// import * as websocketGatewayClient from './websocketGatewayClient'
const activeClient = dummyDataService

export const subscribe = activeClient.subscribe
export const pause = activeClient.pause
export const resume = activeClient.resume
export const setPaused = activeClient.setPaused
export const clearCanLog = activeClient.clearCanLog
export const resetStatistics = activeClient.resetStatistics
