const TONE = {
  cyan: 'text-hud-cyan',
  amber: 'text-hud-amber',
  green: 'text-emerald-400',
  red: 'text-rose-400',
}

export default function StatusPill({ label, value, tone = 'cyan' }) {
  return (
    <div className="min-w-[132px] rounded border border-hud-border bg-hud-panel-2 px-3 py-2">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-hud-muted">
        {label}
      </p>
      <p className={`mt-1 font-mono text-sm font-semibold ${TONE[tone] ?? TONE.cyan}`}>
        {value}
      </p>
    </div>
  )
}
