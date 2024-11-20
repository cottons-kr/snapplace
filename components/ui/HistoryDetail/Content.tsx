'use client'

import { Account, History, Like } from '@prisma/client'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import ProfileImage from '../Profile/Image'
import { useEffect, useState } from 'react'
import { addLike, removeLike } from '@/lib/actions/like'
import { Session } from 'next-auth'

import s from './style.module.scss'

type HistoryDetailContentProps = {
  data: History & {
    owner: Account
    friends: Array<Account>
    likes: Array<Like>
  }
  session: Session
}
export default function HistoryDetailContent(props: HistoryDetailContentProps) {
  const people = [props.data.owner, ...props.data.friends]
  const [isLiked, setIsLiked] = useState(!!props.data.likes.find(f => f.accountUUID === props.session.user.uuid))
  const [likeCount, setLikeCount] = useState(props.data.likes.length)

  const onClickLike = async () => {
    const prevLikedState = isLiked
    const prevLikeCount = likeCount

    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)

    try {
      if (isLiked) {
        await removeLike(props.data.uuid)
      } else {
        await addLike(props.data.uuid)
      }
    } catch (err) {
      console.error(err)
      alert('처리 중 오류가 발생했습니다.')

      setIsLiked(prevLikedState)
      setLikeCount(prevLikeCount)
    }
  }

  useEffect(() => {
    setIsLiked(!!props.data.likes.find(f => f.accountUUID === props.session.user.uuid))
    setLikeCount(props.data.likes.length)
  }, [props.data])

  return <>
    <VStack className={s.content} gap={12}>
      <HStack gap={30}>
        <h1>{props.data.title}</h1>
        <HStack
          className={s.likes}
          align='center' gap={4}
          style={{ width: 'fit-content' }}
        >
          {likeCount}
          <Icon
            icon={IconName.Favorite} size={16}
            fill={isLiked} color={isLiked ? '#FF3B3B' : undefined}
            onClick={onClickLike}
          />
        </HStack>
      </HStack>

      <pre className={s.description}>{props.data.content}</pre>
      <p className={s.date}>{props.data.createdAt.toLocaleDateString('ko-KR')}</p>

      <HStack wrap='wrap' gap={8}>{
        people.map(f => (
          <HStack
            key={f.uuid} className={s.friend}
            align='center' gap={6}
            style={{ width: 'fit-content' }}
          >
            <ProfileImage
              path={f.avatar}
              width={28} height={28}
            />
            <p>{f.nickname}({f.id})</p>
            {f.uuid === props.data.owner.uuid && (
              <Icon icon={IconName.Star} fill size={16} />
            )}
          </HStack>
        ))
      }</HStack>
    </VStack>
  </>
}
