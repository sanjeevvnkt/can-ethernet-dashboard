/**
 * dummyDataService.js
 *
 * Simulated CAN-to-Ethernet gateway telemetry.
 *
 * THIS IS FRONTEND DUMMY DATA ONLY.
 * It is not connected to MCP2515, QNX, SPI, CAN, Ethernet, or Raspberry Pi hardware.
 *
 * Future replacement path:
 *   dummyDataService  ->  FastAPI / WebSocket  ->  QNX Raspberry Pi Gateway
 *
 * Keep the snapshot shape in `createSnapshot()` stable so the UI can switch
 * sources without rewriting components. See `gatewayClient.js`.
 */

import { CAN_CATALOG, CAN_IDS } from '../data/canCatalog'
import { clamp, encodeLittleU16, formatClock, toHexByte } from '../utils/format'

const TICK_MS = 500
const CHART_POINTS = 40
const MAX_CAN_FRAMES = 28

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function pushPoint(series, timestamp, value) {
  const next = [...series, { t: timestamp, v: Number(value.toFixed(2)) }]
  return next.length > CHART_POINTS ? next.slice(next.length - CHART_POINTS) : next
}

function padBytes(bytes, length = 8) {
  const next = [...bytes]
  while (next.length < length) next.push(0)
  return next.slice(0, length)
}

function bytesToDataString(bytes) {
  return padBytes(bytes)
    .map(toHexByte)
    .join(' ')
}

function createCanFrame(timestamp, canId, payload, status = 'OK') {
  const meta = CAN_CATALOG[canId]
  return {
    id: `${timestamp}-${canId}-${Math.random().toString(16).slice(2, 8)}`,
    timestamp,
    timeLabel: formatClock(timestamp),
    canId,
    dlc: meta?.dlc ?? payload.length,
    data: bytesToDataString(payload),
    messageType: meta?.type ?? 'Unknown',
    status,
  }
}

function createInitialCharts(now) {
  const empty = { speed: [], rpm: [], canRate: [], latency: [] }
  let charts = empty
  for (let i = CHART_POINTS; i >= 0; i -= 1) {
    const t = now - i * TICK_MS
    charts = {
      speed: pushPoint(charts.speed, t, 78),
      rpm: pushPoint(charts.rpm, t, 2400),
      canRate: pushPoint(charts.canRate, t, 40),
      latency: pushPoint(charts.latency, t, 2.4),
    }
  }
  return charts
}

function generateInitialFrames(now) {
  return [
    createCanFrame(now - 1200, '0x101', encodeLittleU16(80)),
    createCanFrame(now - 900, '0x102', encodeLittleU16(2500)),
    createCanFrame(now - 600, '0x103', [0, 0, 0, 0, 0, 0, 0, 0]),
    createCanFrame(now - 300, '0x301', [0xa5, 0x01, 0x01, 0x00]),
  ]
}

function createInitialState() {
  const now = Date.now()
  return {
    startedAt: now,
    lastTick: now,
    paused: false,
    tick: 0,
    speed: 80,
    rpm: 2500,
    brakeOn: false,
    canFramesReceived: 18420,
    ethernetPackets: 12680,
    canTrafficRate: 42,
    gatewayLatencyMs: 2.4,
    packetsTx: 6400,
    packetsRx: 6280,
    dataRateKbps: 118,
    charts: createInitialCharts(now),
    canFrames: generateInitialFrames(now),
    systemHealth: {
      gateway: 'green',
      qnx: 'green',
      spi: 'green',
      mcp2515: 'green',
      canBus: 'green',
      ethernet: 'green',
      backend: 'yellow',
    },
  }
}

let state = createInitialState()
const listeners = new Set()

function classifyAnomaly(rate) {
  if (rate >= 95) {
    return {
      level: 'critical',
      message: 'Possible CAN Traffic Anomaly',
      detail: 'Simulated burst exceeds the dummy safety threshold.',
    }
  }
  if (rate >= 68) {
    return {
      level: 'warning',
      message: 'High CAN Traffic Detected',
      detail: 'Simulated CAN frame rate is elevated.',
    }
  }
  return {
    level: 'normal',
    message: 'CAN Traffic Normal',
    detail: 'Simulated bus load is within the expected range.',
  }
}

function healthLabel(stateKey) {
  if (stateKey === 'green') return 'Active'
  if (stateKey === 'yellow') return 'Warning'
  return 'Offline'
}

function nextHealth(rate, latency) {
  return {
    gateway: 'green',
    qnx: 'green',
    spi: latency > 4.2 ? 'yellow' : 'green',
    mcp2515: rate > 100 ? 'yellow' : 'green',
    canBus: rate > 110 ? 'red' : rate > 90 ? 'yellow' : 'green',
    ethernet: 'green',
    // Dashboard backend is dummy in this frontend-only build.
    backend: 'yellow',
  }
}

function generateFrames(now, speed, rpm, brakeOn, rate) {
  const frames = []
  const speedBytes = encodeLittleU16(speed)
  const rpmBytes = encodeLittleU16(rpm)
  const burst = rate > 70 ? 3 : 1

  frames.push(createCanFrame(now, '0x101', speedBytes))
  frames.push(createCanFrame(now + 1, '0x102', rpmBytes))
  frames.push(
    createCanFrame(now + 2, '0x103', [brakeOn ? 1 : 0, 0, 0, 0, 0, 0, 0, 0]),
  )

  if (burst > 1) {
    frames.push(
      createCanFrame(
        now + 3,
        '0x201',
        [
          ...encodeLittleU16(speed * 9.8),
          ...encodeLittleU16(speed * 10.1),
          ...encodeLittleU16(speed * 9.9),
          ...encodeLittleU16(speed * 10),
        ],
      ),
    )
  }

  if (state.tick % 4 === 0) {
    frames.push(createCanFrame(now + 4, '0x301', [0xA5, state.tick & 0xff, 0x01, 0x00]))
  }

  if (rate > 95) {
    frames.push(
      createCanFrame(
        now + 5,
        '0x3F0',
        [0xff, 0xff, 0x00, 0x01, 0xaa, 0x55, 0x00, 0x00],
        'ANOMALY',
      ),
    )
  }

  return frames
}

function createSnapshot() {
  const now = state.lastTick
  const uptimeSeconds = Math.floor((now - state.startedAt) / 1000)
  const anomaly = classifyAnomaly(state.canTrafficRate)
  const health = state.systemHealth

  return {
    generated: true,
    source: 'dummyDataService',
    timestamp: now,
    paused: state.paused,
    header: {
      gatewayStatus: 'ONLINE',
      qnxStatus: 'RUNNING',
      canBusStatus: health.canBus === 'red' ? 'FAULT' : 'ACTIVE',
      ethernetStatus: 'CONNECTED',
    },
    vehicle: {
      speedKmh: Number(state.speed.toFixed(0)),
      engineRpm: Number(state.rpm.toFixed(0)),
      brakeStatus: state.brakeOn ? 'ON' : 'OFF',
      canFramesReceived: state.canFramesReceived,
      ethernetPackets: state.ethernetPackets,
      canTrafficRate: Number(state.canTrafficRate.toFixed(0)),
      gatewayLatencyMs: Number(state.gatewayLatencyMs.toFixed(1)),
      uptimeSeconds,
    },
    charts: state.charts,
    canFrames: state.canFrames,
    ethernet: {
      packetsTx: state.packetsTx,
      packetsRx: state.packetsRx,
      dataRateKbps: Number(state.dataRateKbps.toFixed(0)),
      avgLatencyMs: Number(state.gatewayLatencyMs.toFixed(1)),
      connectionStatus: 'CONNECTED',
    },
    anomaly,
    systemHealth: [
      { id: 'gateway', name: 'Raspberry Pi / Gateway', state: health.gateway, label: healthLabel(health.gateway) },
      { id: 'qnx', name: 'QNX', state: health.qnx, label: healthLabel(health.qnx) },
      { id: 'spi', name: 'SPI', state: health.spi, label: healthLabel(health.spi) },
      { id: 'mcp2515', name: 'MCP2515', state: health.mcp2515, label: healthLabel(health.mcp2515) },
      { id: 'canBus', name: 'CAN Bus', state: health.canBus, label: healthLabel(health.canBus) },
      { id: 'ethernet', name: 'Ethernet', state: health.ethernet, label: healthLabel(health.ethernet) },
      { id: 'backend', name: 'Dashboard Backend', state: health.backend, label: 'Dummy Data' },
    ],
    catalogSize: CAN_IDS.length,
  }
}

function emit() {
  const snapshot = createSnapshot()
  listeners.forEach((listener) => listener(snapshot))
}

function tick() {
  if (state.paused) return

  const now = Date.now()
  const dt = Math.max(0.25, (now - state.lastTick) / 1000)
  state.lastTick = now
  state.tick += 1

  const cruise = 76 + Math.sin(state.tick / 18) * 10
  const bump = Math.sin(state.tick / 7) * 4
  const nextSpeed = clamp(cruise + bump + randomBetween(-1.2, 1.2), 0, 140)
  const slowing = nextSpeed < state.speed - 0.8
  state.brakeOn = slowing && Math.random() > 0.35
  state.speed = nextSpeed
  state.rpm = clamp(900 + state.speed * 22 + randomBetween(-80, 120), 800, 4500)

  const burstWindow = state.tick % 48
  let rate = 34 + Math.sin(state.tick / 9) * 8 + randomBetween(-2, 3)
  if (burstWindow > 36 && burstWindow < 42) rate += 32
  if (burstWindow >= 42 && burstWindow < 45) rate += 68
  state.canTrafficRate = clamp(rate, 12, 130)

  const latencyBase = 2.1 + Math.sin(state.tick / 11) * 0.4
  const latencySpike = state.canTrafficRate > 90 ? randomBetween(0.8, 2.4) : randomBetween(-0.2, 0.3)
  state.gatewayLatencyMs = clamp(latencyBase + latencySpike, 1.2, 8)

  const newCanFrames = Math.max(1, Math.round(state.canTrafficRate * dt))
  const newEthPackets = Math.max(1, Math.round(newCanFrames * 0.72 + randomBetween(0, 4)))
  state.canFramesReceived += newCanFrames
  state.ethernetPackets += newEthPackets
  state.packetsTx += Math.round(newEthPackets * 0.52)
  state.packetsRx += Math.round(newEthPackets * 0.48)
  state.dataRateKbps = clamp(80 + state.canTrafficRate * 1.4 + randomBetween(-6, 8), 40, 320)

  state.charts = {
    speed: pushPoint(state.charts.speed, now, state.speed),
    rpm: pushPoint(state.charts.rpm, now, state.rpm),
    canRate: pushPoint(state.charts.canRate, now, state.canTrafficRate),
    latency: pushPoint(state.charts.latency, now, state.gatewayLatencyMs),
  }

  const incoming = generateFrames(now, state.speed, state.rpm, state.brakeOn, state.canTrafficRate)
  state.canFrames = [...incoming, ...state.canFrames].slice(0, MAX_CAN_FRAMES)
  state.systemHealth = nextHealth(state.canTrafficRate, state.gatewayLatencyMs)

  emit()
}

let intervalId = null

function ensureLoop() {
  if (intervalId != null) return
  intervalId = window.setInterval(tick, TICK_MS)
}

export function subscribe(listener) {
  listeners.add(listener)
  ensureLoop()
  listener(createSnapshot())
  return () => listeners.delete(listener)
}

export function pause() {
  state.paused = true
  emit()
}

export function resume() {
  state.paused = false
  state.lastTick = Date.now()
  emit()
}

export function setPaused(paused) {
  if (paused) pause()
  else resume()
}

export function clearCanLog() {
  state.canFrames = []
  emit()
}

export function resetStatistics() {
  const charts = state.charts
  const emptyCharts = {
    speed: charts.speed.map((p) => ({ ...p, v: 0 })),
    rpm: charts.rpm.map((p) => ({ ...p, v: 0 })),
    canRate: charts.canRate.map((p) => ({ ...p, v: 0 })),
    latency: charts.latency.map((p) => ({ ...p, v: 0 })),
  }
  state.canFramesReceived = 0
  state.ethernetPackets = 0
  state.packetsTx = 0
  state.packetsRx = 0
  state.dataRateKbps = 0
  state.charts = emptyCharts
  emit()
}
