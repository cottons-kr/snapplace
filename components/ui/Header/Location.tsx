'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import ProfileImage from '../Profile/Image'
import { useLocation } from '@/hooks/useLocation'

import s from './style.module.scss'

export default function LocationHeader() {
  const { locationName } = useLocation()

  return <>
    <HStack className={s.container} align='center' justify='space-between'>
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill size={20} />
        <p>{locationName}</p>
      </HStack>
      <ProfileImage width={30} height={30} />
    </HStack>
  </>
}
