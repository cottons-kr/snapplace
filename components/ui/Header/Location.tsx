'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import { useEffect, useState } from 'react'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'

import s from './style.module.scss'

declare global {
  namespace globalThis {
    const kakao: any
  }
}

export default function LocationHeader() {
  const [location, setLocation] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = process.env.KAKAO_API_JAVASCRIPT_KEY
    if (navigator.geolocation && apiKey) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.coord2RegionCode(longitude, latitude, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address_name
            setLocation(address)
          }
        })
      })
    } else {
      alert('위치 정보를 가져올 수 없습니다.')
    }
  }, [])

  return <>
    <HStack className={s.container} align='center' justify='space-between'>
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill size={20} />
        <p>{location}</p>
      </HStack>
    </HStack>
  </>
}
