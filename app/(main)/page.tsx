import { Spacer, VStack, Viewport } from '@cottons-kr/react-foundation'
import HomeNewHistory from '@/components/page/home/New'
import LocationHeader from '@/components/ui/Header/Location'
import HomeList from '@/components/page/home/List'

import s from './page.module.scss'

export default function IndexPage() {
  return <>
    <VStack className={s.page} fullHeight gap={36}>
      <LocationHeader />
      <Viewport fullHeight direction='column'>
        <VStack gap={40}>
          <HomeNewHistory />
          <HomeList
            title='인근에서 찍은 사진'
            data={null}
          />
          <HomeList
            title='N년 전 오늘'
            data={null} 
          />
          <Spacer height='100px' />
        </VStack>
      </Viewport>
    </VStack>
  </>
}
