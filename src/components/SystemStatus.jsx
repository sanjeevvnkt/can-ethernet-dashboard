import Panel from './Panel'

const DOT = {
  green: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
  yellow: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
  red: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
}

export default function SystemStatus({ items }) {
  return (
    <Panel title="System Status" subtitle="GREEN Active · YELLOW Warning · RED Offline">
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded border border-hud-border bg-hud-panel-2 px-3 py-2"
          >
            <span className="text-sm text-hud-text">{item.name}</span>
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-hud-muted">
              <span className={`h-2.5 w-2.5 rounded-full ${DOT[item.state]}`} />
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
