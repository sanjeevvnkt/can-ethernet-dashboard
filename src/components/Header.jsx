import { Activity, Cable, Cpu, Radio } from 'lucide-react'
import StatusPill from './StatusPill'

export default function Header({ header }) {
  return (
    <header className="border-b border-hud-border bg-hud-panel/95">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded border border-hud-cyan/40 bg-hud-cyan/10">
            <Radio className="h-5 w-5 text-hud-cyan" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-hud-amber">
              Zonal Gateway Monitor
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
              CAN-to-Ethernet Gateway
            </h1>
            <p className="mt-1 text-sm text-hud-muted">
              Real-Time Automotive Communication Monitor
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatusPill label="Gateway Status" value={header.gatewayStatus} tone="green" />
          <StatusPill label="QNX Status" value={header.qnxStatus} tone="cyan" />
          <StatusPill
            label="CAN Bus Status"
            value={header.canBusStatus}
            tone={header.canBusStatus === 'ACTIVE' ? 'green' : 'red'}
          />
          <StatusPill label="Ethernet Status" value={header.ethernetStatus} tone="cyan" />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-hud-border bg-amber-500/10 px-5 py-2 text-[11px] text-amber-200">
        <Activity className="h-3.5 w-3.5" />
        Simulated telemetry only — frontend dummy data. Not connected to CAN, MCP2515, QNX, SPI, or Ethernet hardware.
        <span className="ml-auto hidden items-center gap-4 text-hud-muted sm:flex">
          <span className="inline-flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5" /> QNX / Raspberry Pi
          </span>
          <span className="inline-flex items-center gap-1">
            <Cable className="h-3.5 w-3.5" /> CAN 2.0 / Ethernet
          </span>
        </span>
      </div>
    </header>
  )
}
