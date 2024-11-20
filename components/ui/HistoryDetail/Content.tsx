import { Account, History, Like } from '@prisma/client'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import ProfileImage from '../Profile/Image'

import s from './style.module.scss'

type HistoryDetailContentProps = {
  data: History & {
    owner: Account
    friends: Array<Account>
    likes: Array<Like>
  }
}
export default function HistoryDetailContent(props: HistoryDetailContentProps) {
  const people = [props.data.owner, ...props.data.friends]

  return <>
    <VStack className={s.content} gap={12}>
      <HStack gap={30}>
        <h1>{props.data.title}</h1>
        <HStack
          className={s.likes}
          align='center' gap={4}
          style={{ width: 'fit-content' }}
        >
          {props.data.likes.length}
          <Icon icon={IconName.Favorite} size={16} />
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
