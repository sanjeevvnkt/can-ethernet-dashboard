import { Pause, Play, RotateCcw } from 'lucide-react'

export default function ControlBar({ paused, onTogglePause, onReset }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-hud-border bg-hud-panel px-4 py-3">
      <p className="text-xs text-hud-muted">
        Live dummy stream {paused ? 'paused' : 'running'} · 500 ms update interval
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onTogglePause}
          className="inline-flex items-center gap-2 rounded border border-hud-cyan/40 bg-hud-cyan/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-hud-cyan hover:bg-hud-cyan/20"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? 'Resume Live Data' : 'Pause Live Data'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded border border-hud-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-hud-muted hover:border-hud-amber hover:text-hud-amber"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Statistics
        </button>
      </div>
    </div>
  )
}
