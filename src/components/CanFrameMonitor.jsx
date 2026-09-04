import Panel from './Panel'

export default function CanFrameMonitor({ frames, onClear }) {
  return (
    <Panel
      title="CAN Frame Monitor"
      subtitle="Generated frames for dashboard demonstration"
      action={
        <button
          type="button"
          onClick={onClear}
          className="rounded border border-hud-border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-hud-muted hover:border-hud-cyan hover:text-hud-cyan"
        >
          Clear CAN Log
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.14em] text-hud-muted">
            <tr className="border-b border-hud-border">
              <th className="pb-2 font-medium">Timestamp</th>
              <th className="pb-2 font-medium">CAN ID</th>
              <th className="pb-2 font-medium">DLC</th>
              <th className="pb-2 font-medium">Data</th>
              <th className="pb-2 font-medium">Message Type</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {frames.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-hud-muted">
                  CAN log empty. Live dummy frames will appear while data is running.
                </td>
              </tr>
            ) : (
              frames.map((frame) => (
                <tr key={frame.id} className="border-b border-hud-border/70">
                  <td className="py-2 text-hud-muted">{frame.timeLabel}</td>
                  <td className="py-2 text-hud-cyan">{frame.canId}</td>
                  <td className="py-2">{frame.dlc}</td>
                  <td className="py-2 tracking-wider text-hud-text">{frame.data}</td>
                  <td className="py-2 font-sans text-hud-text">{frame.messageType}</td>
                  <td className="py-2">
                    <span
                      className={
                        frame.status === 'ANOMALY'
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }
                    >
                      {frame.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
