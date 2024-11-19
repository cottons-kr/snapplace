'use client'

import { HStack, VStack, Viewport } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useContext } from 'react'
import { UploadActionType as ActionType, UploadContext } from '@/lib/contexts/upload'
import classNames from 'classnames'
import { useToggle } from '@/hooks/useToggle'
import UploadFormAddFriends from './AddFriends'
import DefaultImage from '@/assets/default.png'
import Image from 'next/image'

import s from './style.module.scss'

export default function UploadForm() {
  const { data, dispatch } = useContext(UploadContext)
  const addFriendsToggle = useToggle()

  return <>
    <Viewport direction='column' fullHeight>
      <VStack gap={20}>
        <label className={s.label}>
          <span>제목</span>
          <input
            type='text'
            placeholder='제목을 입력해주세요'
            value={data.title}
            onChange={e => dispatch({ type: ActionType.SET_TITLE, payload: e.target.value })}
          />
        </label>

        <label className={s.label}>
          <span>내용</span>
          <textarea
            placeholder='내용을 입력해주세요'
            value={data.content}
            onChange={e => dispatch({ type: ActionType.SET_CONTENT, payload: e.target.value })}
          />
        </label>

        <label className={s.label} onClick={addFriendsToggle.open}>
          <span>같이 찍은 친구</span>
          <HStack className={s['friends-list']} wrap align='center' gap={8}>
            {
              data.friends.map(f => (
                <HStack
                  key={f.uuid} className={s.item}
                  align='center' gap={6}
                  style={{ width: 'fit-content' }}
                >
                  <Image src={DefaultImage} alt='프사' width={28} height={28} />
                  <p>{f.nickname}({f.id})</p>
                </HStack>
              ))
            }
            <Icon icon={IconName.GroupAdd} size={20} />
          </HStack>
        </label>

        <label
          className={classNames(s.check, data.private && s.checked)}
          onClick={() => dispatch({ type: ActionType.SET_PRIVATE, payload: !data.private })}
        >
          <Icon icon={IconName.Priority} size={24} fill={data.private} />
          <p>비공개 게시물로 올리기</p>
        </label>
      </VStack>
    </Viewport>

    <UploadFormAddFriends provider={addFriendsToggle} />
  </>
}
