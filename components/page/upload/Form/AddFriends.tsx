'use client'

import { HStack, VStack, Viewport } from '@cottons-kr/react-foundation'
import BottomSheet from '@/components/ui/BottomSheet'
import { ToggleProvider } from '@/hooks/useToggle'
import { useFetcher } from '@/hooks/useFetcher/Client'
import { getFriends } from '@/lib/actions/friends'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useCallback, useContext } from 'react'
import { UploadActionType, UploadContext } from '@/lib/contexts/upload'
import { Account } from '@prisma/client'
import DefaultImage from '@/assets/default.png'
import Image from 'next/image'
import CheckOn from '@/assets/check_on.svg'
import CheckOff from '@/assets/check_off.svg'

import s from './style.module.scss'

type UploadFormAddFriendsProps = {
  provider: ToggleProvider
}
export default function UploadFormAddFriends(props: UploadFormAddFriendsProps) {
  const { data: friends } = useFetcher('', () => (
    getFriends()
  ))
  
  const onClickAdd = useCallback(() => {
    props.provider.close()
  }, [])

  return <>
    <BottomSheet
      stickToBottom
      duration={0.4}
      provider={props.provider}
    >
      <VStack
        className={s['friends-add']}
        gap={14}
        style={{ height: '50dvh' }}
      >
        <HStack
          className={s.search}
          align='center' gap={4}
          style={{ height: '44px' }}
        >
          <input type='text' placeholder='친구 이름을 입력해주세요' />
          <Icon icon={IconName.Search} />
        </HStack>
        <Viewport direction='column' fullHeight>{
          (friends || []).map(f => <Item key={f.uuid} data={f} />)
        }</Viewport>
        <button onClick={onClickAdd}>추가하기</button>
      </VStack>
    </BottomSheet>
  </>
}

type ItemProps = {
  data: Account
}
function Item(props: ItemProps) {
  const { data, dispatch } = useContext(UploadContext)

  const onClick = useCallback(() => {
    const friend = data.friends.find(f => f.uuid === props.data.uuid)
    dispatch({
      type: UploadActionType.SET_FRIENDS,
      payload: friend
        ? data.friends.filter(f => f.uuid !== props.data.uuid)
        : [...data.friends, props.data]
    })
  }, [data.friends])

  return <>
    <HStack className={s.item} align='center' gap={12} onClick={onClick}>
      <Image src={DefaultImage} alt='프사' />
      <VStack>
        <h4>{props.data.nickname}</h4>
        <p>{props.data.id}</p>
      </VStack>
      <Image
        width={28}
        height={28}
        src={data.friends.find(f => f.uuid === props.data.uuid) ? CheckOn : CheckOff}
        alt={data.friends.find(f => f.uuid === props.data.uuid) ? '체크됨' : '체크안됨'}
      />
    </HStack>
  </>
}
