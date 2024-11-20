'use client'

import { AdvancedMarker, ColorScheme, Map } from '@vis.gl/react-google-maps'
import PersonPinCircle from '@/assets/person_pin_circle.svg'
import Image from 'next/image'
import { getNearbyHistories } from '@/lib/actions/history'
import MapMarker from '../Marker'
import { useLocation } from '@/hooks/useLocation'
import { useMemo, useState } from 'react'
import { getThresholdsByZoomLevel, isWithinThreshold, getAveragePosition } from '@/lib/location'
import { GroupedHistory } from '../shared'
import MapGroupMarker from '../Marker/Group'

import s from './style.module.scss'

type MapCanvasProps = {
  histories: Awaited<ReturnType<typeof getNearbyHistories>>
}
export default function MapCanvas(props: MapCanvasProps) {
  const { latitude, longitude, isReady } = useLocation()
  const [currentZoomLevel, setCurrentZoomLevel] = useState(16)
  const thresholds = useMemo(() => getThresholdsByZoomLevel(currentZoomLevel), [currentZoomLevel])
  const markers = useMemo(() => {
    return props.histories.reduce((acc, h) => {
      const group = acc.find(g => isWithinThreshold(h, g, thresholds))
      if (group) {
        group.histories.push(h)
        const averagePosition = getAveragePosition(group.histories)
        group.latitude = averagePosition.latitude
        group.longitude = averagePosition.longitude
      } else {
        acc.push({ histories: [h], latitude: h.latitude, longitude: h.longitude })
      }
      return acc
    }, [] as Array<GroupedHistory>)
  }, [props.histories, thresholds])

  return <>
    <div className={s.container}>{
      isReady ?
        <Map
          mapId='17fb06fee9fb737f'
          className={s.map}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={16}
          disableDefaultUI
          minZoom={11}
          maxZoom={18}
          colorScheme={ColorScheme.DARK}
          onClick={e => e.stop()}
          onZoomChanged={e => setCurrentZoomLevel(e.detail.zoom)}
        >
          <AdvancedMarker
            position={{ lat: latitude, lng: longitude }}
            clickable={false}
            draggable={false}
            onClick={e => e.stop()}
          >
            <Image src={PersonPinCircle} alt='현재 위치' />
          </AdvancedMarker>

          {markers.map((m, i) => (
            m.histories.length === 1 ? 
              <MapMarker key={i} data={m.histories[0]} /> :
              <MapGroupMarker key={i} data={m} />
          ))}
        </Map> :
        <div className={s.retry}>다시 시도</div>
    }</div>
  </>
}
