'use client'

import { HStack } from '@cottons-kr/react-foundation'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import ProfileImage from '../Profile/Image'
import { useLocation } from '@/hooks/useLocation'
import { useSession } from 'next-auth/react'

import s from './style.module.scss'

export default function MapHeader() {
  const { data: session } = useSession()
  const { locationName } = useLocation()

  return <>
    <HStack
      className={s.map}
      align='center'
      style={{ height: '120px' }}
    >
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill />
        <p>{locationName}</p>
      </HStack>
      <ProfileImage
        path={session?.user.avatar}
        width={30} height={30}
      />
    </HStack>
  </>
}
