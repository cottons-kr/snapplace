'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useCallback, useState } from 'react'
import { sendFriendRequest } from '@/lib/actions/friends'

import s from './style.module.scss'

export default function SettingsFriendsAdd() {
  const [friendId, setFriendId] = useState('')

  const onClickAdd = useCallback(async () => {
    if (!friendId) return
    try {
      await sendFriendRequest(friendId)
      alert('친구 요청을 보냈습니다.')
      setFriendId('')
    } catch (err) {
      console.error(err)
      alert('친구 추가에 실패했습니다.')
    }
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
