'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import ProfileImage from '@/components/ui/Profile/Image'

import s from './style.module.scss'

export default function SettingsFriendsList() {
  return <>
    <VStack gap={12}>
      <h2 className={s.title}>친구 목록</h2>
      <VStack>
        <Item />
        <Item />
        <Item />
      </VStack>
    </VStack>
  </>
}

function Item() {
  return <>
    <HStack className={s.item} gap={12}>
      <ProfileImage width={46} height={46} />
      <VStack>
        <h3 className={s.name}>홍길동</h3>
        <p className={s.id}>asd</p>
      </VStack>
    </HStack>
  </>
}
