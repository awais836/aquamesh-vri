import { area, polygon } from '@turf/turf'

export function hectaresForPolygon(ring: number[][]): number {
  return area(polygon([ring])) / 10_000
}
