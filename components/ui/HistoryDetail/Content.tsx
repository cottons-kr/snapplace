import { Account, History, Like } from '@prisma/client'
import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import DefaultImage from '@/assets/default.png'
import Image from 'next/image'

import s from './style.module.scss'

type HistoryDetailContentProps = {
  data: History & {
    friends: Array<Account>
    likes: Array<Like>
  }
}
export default function HistoryDetailContent(props: HistoryDetailContentProps) {
  return <>
    <VStack className={s.content} gap={12}>
      <HStack gap={30}>
        <h1>{props.data.title}</h1>
        <HStack className={s.likes} align='center' gap={4} width='fit-content'>
          {props.data.likes.length}
          <Icon icon={IconName.Favorite} size={16} />
        </HStack>
      </HStack>

      <p className={s.description}>{props.data.content}</p>
      <pre className={s.date}>{props.data.createdAt.toLocaleDateString('ko-KR')}</pre>

      <HStack wrap='wrap' gap={8}>{
        props.data.friends.map(f => (
          <HStack key={f.uuid} className={s.friend} align='center' gap={6} width='fit-content'>
            <Image src={DefaultImage} alt='프시' width={28} height={28} />
            <p>{f.nickname}({f.id})</p>
          </HStack>
        ))
      }</HStack>
    </VStack>
  </>
}
