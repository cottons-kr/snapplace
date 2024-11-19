'use client'

import ProfileImage from '@/components/ui/Profile/Image'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import { Session } from 'next-auth'

import s from './style.module.scss'

type SettingsAccountProfileProps = {
  session: Session
}
export default function SettingsAccountProfile(props: SettingsAccountProfileProps) {
  return <>
    <HStack className={s.profile} align='center' justify='between' gap={22}>
      <ProfileImage width={78} height={78} />
      <VStack>
        <h1>{props.session.user.nickname}</h1>
        <p>{props.session.user.id}</p>
      </VStack>
    </HStack>
  </>
}
