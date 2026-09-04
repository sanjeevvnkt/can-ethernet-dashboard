import Panel from './Panel'
import { formatNumber } from '../utils/format'

function Stat({ label, value }) {
  return (
    <div className="rounded border border-hud-border bg-hud-panel-2 px-3 py-3">
      <p className="text-[10px] uppercase tracking-[0.16em] text-hud-muted">{label}</p>
      <p className="mt-2 font-mono text-lg text-white">{value}</p>
    </div>
  )
}

export default function EthernetMonitor({ ethernet }) {
  return (
    <Panel title="Ethernet Monitor" subtitle="Gateway-side packet counters (simulated)">
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Packets Transmitted" value={formatNumber(ethernet.packetsTx)} />
        <Stat label="Packets Received" value={formatNumber(ethernet.packetsRx)} />
        <Stat label="Data Rate" value={`${formatNumber(ethernet.dataRateKbps)} kbps`} />
        <Stat label="Average Latency" value={`${ethernet.avgLatencyMs.toFixed(1)} ms`} />
      </div>
      <div className="mt-3 flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm">
        <span className="text-hud-muted">Connection Status</span>
        <span className="font-mono font-semibold text-emerald-400">
          {ethernet.connectionStatus}
        </span>
      </div>
    </Panel>
  )
}
