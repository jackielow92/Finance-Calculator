// PCB Table data - lazy loaded
// This file will be code-split by Vite
// Source: LHDN Schedule of Monthly Tax Deductions (Effective 2018)

export const PCB_BASE = 3141
export const PCB_STEP = 5
export const PCB_MAX = 60000

export const PCB_COLUMNS = [
  'B',
  'K2',
  'KA1_2',
  'KA2_2',
  'KA3_2',
  'KA4_2',
  'KA5_2',
  'KA6_2',
  'KA7_2',
  'KA8_2',
  'KA9_2',
  'KA10_2',
  'K3',
  'KA1_3',
  'KA2_3',
  'KA3_3',
  'KA4_3',
  'KA5_3',
  'KA6_3',
  'KA7_3',
  'KA8_3',
  'KA9_3',
  'KA10_3',
] as const

export type PcbColumn = (typeof PCB_COLUMNS)[number]

// The actual PCB_TABLE_TEXT data will be loaded from the original file
// This is re-exported from the legacy file for backward compatibility
export { PCB_TABLE_TEXT } from './pcb-raw-data'
