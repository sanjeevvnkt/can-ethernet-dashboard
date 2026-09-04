import Header from '../components/Header'
import ControlBar from '../components/ControlBar'
import VehicleDataCards from '../components/VehicleDataCards'
import RealTimeCharts from '../components/RealTimeCharts'
import CanFrameMonitor from '../components/CanFrameMonitor'
import EthernetMonitor from '../components/EthernetMonitor'
import AnomalyMonitor from '../components/AnomalyMonitor'
import SystemStatus from '../components/SystemStatus'
import { useGatewayData } from '../hooks/useGatewayData'

export default function Dashboard() {
  const { snapshot, setPaused, clearCanLog, resetStatistics } = useGatewayData()

  if (!snapshot) {
    return (
      <div className="flex min-h-screen items-center justify-center text-hud-muted">
        Initializing dummy telemetry...
      </div>
    )
  }

  return (
    <div className="hud-grid min-h-screen">
      <Header header={snapshot.header} />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5">
        <ControlBar
          paused={snapshot.paused}
          onTogglePause={() => setPaused(!snapshot.paused)}
          onReset={resetStatistics}
        />
        <VehicleDataCards vehicle={snapshot.vehicle} />
        <RealTimeCharts charts={snapshot.charts} />
        <CanFrameMonitor frames={snapshot.canFrames} onClear={clearCanLog} />
        <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <EthernetMonitor ethernet={snapshot.ethernet} />
          <AnomalyMonitor anomaly={snapshot.anomaly} rate={snapshot.vehicle.canTrafficRate} />
          <SystemStatus items={snapshot.systemHealth} />
        </section>
      </main>
    </div>
  )
}
