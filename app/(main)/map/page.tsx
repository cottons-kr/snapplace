'use client'

import MapHeader from '@/components/ui/Header/Map'
import MapCanvas from '@/components/page/map/Canvas'
import MapControl from '@/components/page/map/Control'
import { APIProvider } from '@vis.gl/react-google-maps'
import { getNearbyHistories } from '@/lib/actions/history'
import { useLocation } from '@/hooks/useLocation'
import { useEffect, useState } from 'react'

export default function MapPage() {
  const location = useLocation()
  const [data, setData] = useState<Awaited<ReturnType<typeof getNearbyHistories>>>([])

  useEffect(() => {
    if (location.isReady) {
      getNearbyHistories(location.latitude, location.longitude)
        .then(setData)
        .catch(err => {
          console.error(err)
          setData([])
          alert('근처의 기록을 불러오는 중 오류가 발생했습니다.')
        })
    }
  }, [location])

  return <>
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
      <MapHeader />
      <MapCanvas histories={data} />
      <MapControl />
    </APIProvider>
  </>
}
