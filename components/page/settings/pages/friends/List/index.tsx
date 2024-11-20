import { HStack, VStack } from '@cottons-kr/react-foundation'
import ProfileImage from '@/components/ui/Profile/Image'
import { getFriends } from '@/lib/actions/friends'
import { Account } from '@prisma/client'

import s from './style.module.scss'

export default async function SettingsFriendsList() {
  const friends = await getFriends()

  return <>
    <VStack gap={12}>
      <h2 className={s.title}>친구 목록</h2>
      <VStack>{
        friends.length <= 0 ?
          <p className={s.empty}>친구가 없습니다.</p> :
          friends.map(friend => <Item key={friend.id} data={friend} />)
      }</VStack>
    </VStack>
  </>
}

type ItemProps = {
  data: Account
}
function Item(props: ItemProps) {
  return <>
    <HStack className={s.item} gap={12}>
      <ProfileImage
        path={props.data.avatar}
        width={46} height={46}
      />
      <VStack>
        <h3 className={s.name}>{props.data.nickname}</h3>
        <p className={s.id}>{props.data.id}</p>
      </VStack>
    </HStack>
  </>
}
