'use client'

import { useEffect, useRef } from 'react'
import { getCurrentPosition } from '@/lib/location'

import s from './style.module.scss'

export default function MapCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    getCurrentPosition()
      .then(({ coords }) => {
        const options = {
          center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
          level: 2,
        }

        new kakao.maps.Map(canvasRef.current, options)
      })
  }, [canvasRef])

  return <>
    <div ref={canvasRef} className={s.canvas} />
  </>
}
