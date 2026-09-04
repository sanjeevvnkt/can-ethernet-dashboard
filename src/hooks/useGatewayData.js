import { useEffect, useState } from 'react'
import * as gatewayClient from '../services/gatewayClient'

/**
 * Subscribes the dashboard to gateway telemetry.
 * Today this is dummy data. Later gatewayClient can point at FastAPI/WebSocket.
 */
export function useGatewayData() {
  const [snapshot, setSnapshot] = useState(null)

  useEffect(() => {
    const unsubscribe = gatewayClient.subscribe(setSnapshot)
    return unsubscribe
  }, [])

  return {
    snapshot,
    pause: gatewayClient.pause,
    resume: gatewayClient.resume,
    setPaused: gatewayClient.setPaused,
    clearCanLog: gatewayClient.clearCanLog,
    resetStatistics: gatewayClient.resetStatistics,
  }
}
