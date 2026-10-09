import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// @ts-ignore
import MapWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker?worker'
import type { FeatureCollection, Polygon } from 'geojson'

// Configure Vite Web Worker for MapLibre
// @ts-ignore
maplibregl.workerClass = MapWorker

const fieldZones: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { zone: 'North Bench', rate: 18, color: '#10b981' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-96.706, 40.817],
            [-96.698, 40.817],
            [-96.698, 40.813],
            [-96.706, 40.813],
            [-96.706, 40.817],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { zone: 'Central Loam', rate: 22, color: '#0ea5e9' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-96.706, 40.813],
            [-96.698, 40.813],
            [-96.698, 40.809],
            [-96.706, 40.809],
            [-96.706, 40.813],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { zone: 'South Clay', rate: 12, color: '#f59e0b' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-96.706, 40.809],
            [-96.698, 40.809],
            [-96.698, 40.805],
            [-96.706, 40.805],
            [-96.706, 40.809],
          ],
        ],
      },
    },
  ],
}

export function FieldMap() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

    const map = new maplibregl.Map({
      container: container.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-96.7015, 40.8155],
      zoom: 13.6,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.AttributionControl({ compact: true }))

    map.on('load', () => {
      map.addSource('vri-zones', { type: 'geojson', data: fieldZones })
      map.addLayer({
        id: 'zone-fill',
        type: 'fill',
        source: 'vri-zones',
        paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.6 },
      })
      map.addLayer({
        id: 'zone-line',
        type: 'line',
        source: 'vri-zones',
        paint: { 'line-color': '#e0f2fe', 'line-width': 2 },
      })
      map.fitBounds(
        [
          [-96.708, 40.805],
          [-96.695, 40.826],
        ],
        { padding: 42, duration: 0 }
      )
    })

    return () => map.remove()
  }, [])

  return (
    <div
      ref={container}
      className="h-[410px] w-full bg-hydrolab-900"
      aria-label="VRI field zone map"
    />
  )
}