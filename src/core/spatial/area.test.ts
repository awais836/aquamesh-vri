import { describe, expect, it } from 'vitest'
import { hectaresForPolygon } from './area'

describe('zone area', () => {
  it('calculates polygon area in hectares with Turf', () => {
    const ring = [[-96.706, 40.819], [-96.697, 40.819], [-96.697, 40.824], [-96.706, 40.824], [-96.706, 40.819]]
    expect(hectaresForPolygon(ring)).toBeCloseTo(42.2, 0)
  })
})
