'use client'

import MapHeader from '@/components/ui/Header/Map'
import MapCanvas from '@/components/page/map/Canvas'
import MapControl from '@/components/page/map/Control'
import { APIProvider } from '@vis.gl/react-google-maps'

export default function MapPage() {
  return <>
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
      <MapHeader />
      <MapCanvas />
      <MapControl />
    </APIProvider>
  </>
}
