'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import BottomSheet from '@/components/ui/BottomSheet'
import { ToggleProvider } from '@/hooks/useToggle'
import { useFetcher } from '@/hooks/useFetcher/Client'
import { getFriends } from '@/lib/actions/friends'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import Viewport from '@/components/layout/Viewport'
import { useCallback, useContext } from 'react'
import { UploadContext } from '@/lib/contexts/upload'
import { Account } from '@prisma/client'
import DefaultImage from '@/assets/default.png'
import Image from 'next/image'

import s from './style.module.scss'

type UploadFormAddFriendsProps = {
  provider: ToggleProvider
}
export default function UploadFormAddFriends(props: UploadFormAddFriendsProps) {
  const { data, dispatch } = useContext(UploadContext)
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
      <VStack className={s['friends-add']} gap={14} height='50dvh'>
        <HStack className={s.search} align='center' gap={4} height='44px'>
          <input type='text' placeholder='친구 이름을 입력해주세요' />
          <Icon icon={IconName.Search} />
        </HStack>
        <Viewport direction='column' height='100%'>{
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
  return <>
    <HStack className={s.item} gap={12}>
      <Image src={DefaultImage} alt='프사' />
      <VStack>
        <h4>{props.data.nickname}</h4>
      </VStack>
    </HStack>
  </>
}
