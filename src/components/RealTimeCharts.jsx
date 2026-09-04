import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Panel from './Panel'

function chartTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-GB', {
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  })
}

function tooltipStyle() {
  return {
    backgroundColor: '#101820',
    border: '1px solid #1c2d3d',
    borderRadius: 6,
    fontSize: 12,
    color: '#d7e6f2',
  }
}

function SparkChart({ data, color, unit }) {
  const series = data.map((point) => ({
    time: chartTime(point.t),
    value: point.v,
  }))

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fill: '#7d93a8', fontSize: 10 }} minTickGap={24} />
          <YAxis
            tick={{ fill: '#7d93a8', fontSize: 10 }}
            width={46}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={tooltipStyle()}
            formatter={(value) => [`${Number(value).toFixed(1)} ${unit}`, 'Value']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function RealTimeCharts({ charts }) {
  return (
    <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      <Panel title="Vehicle Speed" subtitle="km/h vs time (simulated)">
        <SparkChart data={charts.speed} color="#00d4ff" unit="km/h" />
      </Panel>
      <Panel title="Engine RPM" subtitle="RPM vs time (simulated)">
        <SparkChart data={charts.rpm} color="#f5a623" unit="RPM" />
      </Panel>
      <Panel title="CAN Traffic Rate" subtitle="frames/sec vs time (simulated)">
        <SparkChart data={charts.canRate} color="#34d399" unit="fps" />
      </Panel>
      <Panel title="Gateway Latency" subtitle="ms vs time (simulated)">
        <SparkChart data={charts.latency} color="#fb7185" unit="ms" />
      </Panel>
    </section>
  )
}
