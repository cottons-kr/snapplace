'use client'

import ProfileImage from '@/components/ui/Profile/Image'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import { Account, FriendRequest } from '@prisma/client'
import { acceptFriendRequest, rejectFriendRequest } from '@/lib/actions/friends'

import s from './style.module.scss'

type SettingsFriendsRequestsItemProps = {
  data: FriendRequest & { from: Account }
}
export default function SettingsFriendsRequestsItem(props: SettingsFriendsRequestsItemProps) {
  const onClickAccept = async () => {
    try {
      await acceptFriendRequest(props.data.uuid)
    } catch (err) {
      console.error(err)
      alert('친구 요청을 수락하는데 실패했습니다.')
    }
  }

  const onClickReject = async () => {
    try {
      await rejectFriendRequest(props.data.uuid)
    } catch (err) {
      console.error(err)
      alert('친구 요청을 거절하는데 실패했습니다.')
    }
  }

  return <>
    <HStack className={s.item} gap={14}>
      <ProfileImage
        path={props.data.from.avatar}
        width={46} height={46}
      />
      <VStack>
        <h3 className={s.name}>{props.data.from.nickname}</h3>
        <p className={s.id}>{props.data.from.id}</p>
      </VStack>
      <HStack
        className={s.buttons}
        align='center' gap={6}
        style={{ width: 'fit-content' }}
      >
        <button className={s.accept} onClick={onClickAccept}>수락</button>
        <button className={s.reject} onClick={onClickReject}>거절</button>
      </HStack>
    </HStack>
  </>
}

