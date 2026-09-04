import { AlertTriangle, ShieldCheck, Siren } from 'lucide-react'
import Panel from './Panel'

const STYLES = {
  normal: {
    box: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    Icon: ShieldCheck,
  },
  warning: {
    box: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    Icon: AlertTriangle,
  },
  critical: {
    box: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    Icon: Siren,
  },
}

export default function AnomalyMonitor({ anomaly, rate }) {
  const style = STYLES[anomaly.level] ?? STYLES.normal
  const Icon = style.Icon

  return (
    <Panel title="Anomaly Monitor" subtitle="Dummy threshold logic on simulated CAN rate">
      <div className={`flex items-start gap-3 rounded border px-3 py-3 ${style.box}`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">{anomaly.message}</p>
          <p className="mt-1 text-xs opacity-80">{anomaly.detail}</p>
        </div>
      </div>
      <p className="mt-3 font-mono text-xs text-hud-muted">
        Simulated CAN rate: {rate} frames/sec
      </p>
    </Panel>
  )
}
