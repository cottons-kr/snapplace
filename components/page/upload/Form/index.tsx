'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useContext } from 'react'
import { UploadActionType as ActionType, UploadContext } from '@/lib/contexts/upload'
import classNames from 'classnames'

import s from './style.module.scss'

export default function UploadForm() {
  const { data, dispatch } = useContext(UploadContext)

  return <>
    <Viewport direction='column' height='100%'>
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
        <label
          className={classNames(s.check, data.private && s.checked)}
          onClick={() => dispatch({ type: ActionType.SET_PRIVATE, payload: !data.private })}
        >
          <Icon icon={IconName.Priority} size={24} fill={data.private} />
          <p>비공개 게시물로 올리기</p>
        </label>
      </VStack>
    </Viewport>
  </>
}
