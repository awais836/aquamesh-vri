export type IrrigationStatus = 'nominal' | 'warning' | 'critical'

export function applicationDepth(deficitMm: number, efficiency: number): number {
  if (efficiency <= 0 || efficiency > 1) {
    throw new Error('Efficiency must be between 0 and 1')
  }

  return Number((deficitMm / efficiency).toFixed(1))
}

export function irrigationStatus(depletionPercent: number): IrrigationStatus {
  if (depletionPercent >= 60) return 'critical'
  if (depletionPercent >= 40) return 'warning'
  return 'nominal'
}
