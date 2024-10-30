'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import { useEffect, useState } from 'react'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { getLocationName } from '@/lib/location'
import ProfileImage from '../Profile/Image'

import s from './style.module.scss'

export default function LocationHeader() {
  const [location, setLocation] = useState<string | null>(null)

  useEffect(() => {
    getLocationName()
      .then(setLocation)
      .catch(err => {
        console.error(err)
        alert('위치 정보를 가져올 수 없습니다.')
      })
  }, [])

  return <>
    <HStack className={s.container} align='center' justify='space-between'>
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill size={20} />
        <p>{location}</p>
      </HStack>
      <ProfileImage width={30} height={30} />
    </HStack>
  </>
}
