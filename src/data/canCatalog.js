/**
 * Static CAN ID catalog used for labeling dummy frames.
 * Replace or extend this map when live DBC-style definitions are available.
 */
export const CAN_CATALOG = {
  '0x101': { type: 'Vehicle Speed', dlc: 8 },
  '0x102': { type: 'Engine RPM', dlc: 8 },
  '0x103': { type: 'Brake Status', dlc: 8 },
  '0x201': { type: 'Wheel Speeds', dlc: 8 },
  '0x301': { type: 'Gateway Heartbeat', dlc: 8 },
  '0x3F0': { type: 'Diagnostic Keep-Alive', dlc: 8 },
}

export const CAN_IDS = Object.keys(CAN_CATALOG)
