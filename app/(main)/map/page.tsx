'use client'

import MapHeader from '@/components/ui/Header/Map'
import MapCanvas from '@/components/page/map/Canvas'
import MapControl from '@/components/page/map/Control'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useFetcher } from '@/hooks/useFetcher/Client'
import { getMyHistories } from '@/lib/actions/history'

export default function MapPage() {
  const { data } = useFetcher('', () => getMyHistories())

  return <>
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
      <MapHeader />
      <MapCanvas histories={data || []} />
      <MapControl />
    </APIProvider>
  </>
}
