'use client'

import { HStack } from '@cottons-kr/react-foundation'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import ProfileImage from '../Profile/Image'
import { useLocation } from '@/hooks/useLocation'
import { useSession } from 'next-auth/react'

import s from './style.module.scss'

export default function LocationHeader() {
  const { data: session } = useSession()
  const { locationName } = useLocation()

  return <>
    <HStack className={s.container} align='center' justify='between'>
      <HStack align='center' gap={10}>
        <Icon icon={IconName.LocationOn} fill size={20} />
        <p>{locationName}</p>
      </HStack>
      <ProfileImage
        path={session?.user.avatar}
        width={30} height={30}
      />
    </HStack>
  </>
}
