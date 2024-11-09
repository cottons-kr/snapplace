'use client'

import { useEffect, useState } from 'react'
import { getCurrentPosition } from '@/lib/location'
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import PersonPinCircle from '@/assets/person_pin_circle.svg'
import Image from 'next/image'
import { getMyHistories } from '@/lib/actions/history'

import s from './style.module.scss'
import MapMarker from '../Marker'

type MapCanvasProps = {
  histories: Awaited<ReturnType<typeof getMyHistories>>
}
export default function MapCanvas(props: MapCanvasProps) {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)

  useEffect(() => {
    getCurrentPosition()
      .then(({ coords }) => setCoords(coords))
  }, [])

  useEffect(() => {
    console.log(props.histories)
  }, [props.histories])

  return <>
    <div className={s.container}>{
      coords && (
        <Map
          mapId='17fb06fee9fb737f'
          className={s.map}
          defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
          defaultZoom={16}
          disableDefaultUI
          minZoom={11}
          maxZoom={18}
          onClick={e => e.stop()}
        >
          <AdvancedMarker
            position={{ lat: coords.latitude, lng: coords.longitude }}
            clickable={false}
            draggable={false}
            onClick={e => e.stop()}
          >
            <Image src={PersonPinCircle} alt='현재 위치' />
          </AdvancedMarker>
          {
            props.histories.map(h => (
              <MapMarker
                key={h.uuid}
                historyId={h.uuid}
                latitude={h.latitude}
                longitude={h.longitude}
                previewURL={h.images[0].path}
              />
            ))
          }
        </Map>
      )
    }</div>
  </>
}
