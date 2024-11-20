'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import ProfileImage from '@/components/ui/Profile/Image'

import s from './style.module.scss'

export default function SettingsFriendsRequests() {
  return <>
    <VStack gap={12}>
      <h2 className={s.title}>친구 요청</h2>
      <VStack>
        <Item />
        <Item />
      </VStack>
    </VStack>
  </>
}

function Item() {
  return <>
    <HStack className={s.item} gap={14}>
      <ProfileImage width={46} height={46} />
      <VStack>
        <h3 className={s.name}>홍길동</h3>
        <p className={s.id}>asd</p>
      </VStack>
      <HStack
        className={s.buttons}
        align='center' gap={6}
        style={{ width: 'fit-content' }}
      >
        <button className={s.accept}>수락</button>
        <button className={s.reject}>거절</button>
      </HStack>
    </HStack>
  </>
}
