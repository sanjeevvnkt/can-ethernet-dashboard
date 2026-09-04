import { Gauge, RotateCw, CircleStop, Hash, Network, Activity, Timer, Clock } from 'lucide-react'
import { formatNumber, formatUptime } from '../utils/format'

function MetricCard({ icon: Icon, label, value, unit, tone = 'cyan' }) {
  const tones = {
    cyan: 'text-hud-cyan border-hud-cyan/20',
    amber: 'text-hud-amber border-hud-amber/20',
    green: 'text-emerald-400 border-emerald-400/20',
    red: 'text-rose-400 border-rose-400/20',
  }

  return (
    <article className="rounded-lg border border-hud-border bg-hud-panel p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-hud-muted">
          {label}
        </p>
        <span className={`rounded border p-1.5 ${tones[tone]}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold text-white">
        {value}
        {unit ? <span className="ml-1 text-sm font-medium text-hud-muted">{unit}</span> : null}
      </p>
    </article>
  )
}

export default function VehicleDataCards({ vehicle }) {
  const brakeOn = vehicle.brakeStatus === 'ON'

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={Gauge} label="Vehicle Speed" value={vehicle.speedKmh} unit="km/h" />
      <MetricCard icon={RotateCw} label="Engine RPM" value={formatNumber(vehicle.engineRpm)} unit="RPM" tone="amber" />
      <MetricCard
        icon={CircleStop}
        label="Brake Status"
        value={vehicle.brakeStatus}
        tone={brakeOn ? 'red' : 'green'}
      />
      <MetricCard
        icon={Hash}
        label="CAN Frames Received"
        value={formatNumber(vehicle.canFramesReceived)}
      />
      <MetricCard
        icon={Network}
        label="Ethernet Packets"
        value={formatNumber(vehicle.ethernetPackets)}
      />
      <MetricCard
        icon={Activity}
        label="CAN Traffic Rate"
        value={vehicle.canTrafficRate}
        unit="frames/sec"
        tone="amber"
      />
      <MetricCard
        icon={Timer}
        label="Gateway Latency"
        value={vehicle.gatewayLatencyMs.toFixed(1)}
        unit="ms"
      />
      <MetricCard
        icon={Clock}
        label="System Uptime"
        value={formatUptime(vehicle.uptimeSeconds)}
      />
    </section>
  )
}
