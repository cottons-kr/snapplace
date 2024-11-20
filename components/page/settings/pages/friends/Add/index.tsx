'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useCallback, useState } from 'react'

import s from './style.module.scss'

export default function SettingsFriendsAdd() {
  const [friendId, setFriendId] = useState('')

  const onClickAdd = useCallback(() => {
    if (!friendId) return
    alert(`친구 추가: ${friendId}`)
  }, [friendId])

  return <>
    <VStack gap={12}>
      <h2 className={s.title}>친구 추가</h2>
      <HStack className={s.input} align='center' gap={14}>
        <input
          type='text' placeholder='친구로 추가할 아이디를 입력해주세요'
          value={friendId} onChange={e => setFriendId(e.target.value)}
        />
        <Icon
          icon={IconName.ArrowForward} size={20}
          onClick={onClickAdd}
        />
      </HStack>
    </VStack>
  </>
}
