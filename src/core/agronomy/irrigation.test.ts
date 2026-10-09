import { describe, expect, it } from 'vitest'
import { applicationDepth, irrigationStatus } from './irrigation'

describe('irrigation planning', () => {
  it('calculates application depth from soil deficit and efficiency', () => {
    expect(applicationDepth(18, 0.9)).toBe(20)
  })

  it('classifies zone urgency by available water depletion', () => {
    expect(irrigationStatus(28)).toBe('nominal')
    expect(irrigationStatus(46)).toBe('warning')
    expect(irrigationStatus(62)).toBe('critical')
  })

  it('rejects invalid efficiency', () => {
    expect(() => applicationDepth(18, 0)).toThrow('Efficiency must be between 0 and 1')
  })
})
