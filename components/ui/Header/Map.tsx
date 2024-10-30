'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { useEffect, useState } from 'react'
import { getLocationName } from '@/lib/location'
import ProfileImage from '../Profile/Image'

import s from './style.module.scss'

export default function MapHeader() {
  const [location, setLocation] = useState('')

  useEffect(() => {
    getLocationName().then(setLocation)
  }, [])

  return <>
    <HStack className={s.map} align='center' height='120px'>
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill />
        <p>{location}</p>
      </HStack>
      <ProfileImage width={30} height={30} />
    </HStack>
  </>
}
