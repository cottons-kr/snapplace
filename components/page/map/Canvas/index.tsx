'use client'

import { useEffect, useState } from 'react'
import { getCurrentPosition } from '@/lib/location'
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import PersonPinCircle from '@/assets/person_pin_circle.svg'
import Image from 'next/image'

import s from './style.module.scss'

export default function MapCanvas() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)

  useEffect(() => {
    getCurrentPosition()
      .then(({ coords }) => setCoords(coords))
  }, [])

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
        </Map>
      )
    }</div>
  </>
}
