import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { FeatureCollection, Polygon } from 'geojson'

// Provide worker via blob loader to prevent Vite dev server worker crashes
if (typeof window !== 'undefined' && maplibregl) {
  try {
    const workerBlob = new Blob(
      ['importScripts("https://unpkg.com/maplibre-gl/dist/maplibre-gl-csp-worker.js");'],
      { type: 'application/javascript' }
    )
    // @ts-ignore
    maplibregl.workerUrl = URL.createObjectURL(workerBlob)
  } catch (err) {
    console.warn('Worker fallback initialized', err)
  }
}

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
      center: [-96.702, 40.811],
      zoom: 14.3,
      style: {
        version: 8,
        sources: {
          'esri-dark': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution: '&copy; Esri',
          },
          'vri-zones': {
            type: 'geojson',
            data: fieldZones,
          },
        },
        layers: [
          {
            id: 'esri-dark-tiles',
            type: 'raster',
            source: 'esri-dark',
            minzoom: 0,
            maxzoom: 18,
          },
          {
            id: 'zone-fill',
            type: 'fill',
            source: 'vri-zones',
            paint: {
              'fill-color': ['get', 'color'],
              'fill-opacity': 0.65,
            },
          },
          {
            id: 'zone-line',
            type: 'line',
            source: 'vri-zones',
            paint: {
              'line-color': '#ffffff',
              'line-width': 2,
            },
          },
        ],
      },
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    // Pin zone indicator badges directly over the field coordinates
    const zoneLabels = [
      { name: 'North Bench · 18 mm', color: '#10b981', coords: [-96.702, 40.815] as [number, number] },
      { name: 'Central Loam · 22 mm', color: '#0ea5e9', coords: [-96.702, 40.811] as [number, number] },
      { name: 'South Clay · 12 mm', color: '#f59e0b', coords: [-96.702, 40.807] as [number, number] },
    ]

    zoneLabels.forEach((label) => {
      const el = document.createElement('div')
      el.className = 'px-2.5 py-1 rounded text-xs font-semibold text-white shadow-lg pointer-events-none'
      el.style.backgroundColor = label.color
      el.style.border = '1px solid rgba(255, 255, 255, 0.4)'
      el.innerText = label.name

      new maplibregl.Marker({ element: el })
        .setLngLat(label.coords)
        .addTo(map)
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