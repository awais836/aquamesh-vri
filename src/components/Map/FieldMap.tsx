import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const zones = [
  {
    id: 'north-bench',
    name: 'North Bench',
    rate: '18 mm · Nominal',
    color: '#10b981',
    coords: [-96.702, 40.816] as [number, number],
  },
  {
    id: 'central-loam',
    name: 'Central Loam',
    rate: '22 mm · Priority',
    color: '#0ea5e9',
    coords: [-96.702, 40.811] as [number, number],
  },
  {
    id: 'south-clay',
    name: 'South Clay',
    rate: '12 mm · Restricted',
    color: '#f59e0b',
    coords: [-96.702, 40.806] as [number, number],
  },
]

export function FieldMap() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

    const map = new maplibregl.Map({
      container: container.current,
      center: [-96.702, 40.811],
      zoom: 14.4,
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
        },
        layers: [
          {
            id: 'esri-dark-tiles',
            type: 'raster',
            source: 'esri-dark',
            minzoom: 0,
            maxzoom: 18,
          },
        ],
      },
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    // Render the three VRI management zones directly on the field
    zones.forEach((zone) => {
      const el = document.createElement('div')
      el.className = 'rounded-lg p-3 shadow-2xl transition-transform hover:scale-105 select-none'
      el.style.width = '260px'
      el.style.backgroundColor = `${zone.color}25` // 15% opacity zone tint
      el.style.border = `2px solid ${zone.color}`
      el.style.backdropFilter = 'blur(4px)'
      el.style.cursor = 'default'

      el.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
          <span style="font-weight: 700; font-size: 12px; color: #ffffff; letter-spacing: 0.5px;">${zone.name}</span>
          <span style="font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 4px; background-color: ${zone.color}; color: #ffffff;">${zone.rate}</span>
        </div>
        <div style="font-size: 10px; color: #94a3b8;">VRI Prescription Active</div>
      `

      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(zone.coords)
        .addTo(map)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div
      ref={container}
      className="h-[410px] w-full bg-hydrolab-900"
      aria-label="VRI field zone map"
    />
  )
}