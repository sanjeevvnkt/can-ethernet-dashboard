export default function Panel({ title, subtitle, action, children, className = '' }) {
  return (
    <section
      className={`rounded-lg border border-hud-border bg-hud-panel/90 ${className}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-hud-border px-4 py-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hud-cyan">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[11px] text-hud-muted">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  )
}
