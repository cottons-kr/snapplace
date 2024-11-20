import { VStack } from '@cottons-kr/react-foundation'
import { getFriendRequests } from '@/lib/actions/friends'
import Item from './Item'

import s from './style.module.scss'

export default async function SettingsFriendsRequests() {
  const requests = await getFriendRequests()

  return <>
    <VStack gap={12}>
      <h2 className={s.title}>친구 요청</h2>
      <VStack>{
        requests.length <= 0 ?
          <p className={s.empty}>친구 요청이 없습니다.</p> :
          requests.map(request => <Item key={request.uuid} data={request} />)
      }</VStack>
    </VStack>
  </>
}
