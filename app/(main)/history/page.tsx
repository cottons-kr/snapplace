import LocationHeader from '@/components/ui/Header/Location'
import { VStack, Viewport, Spacer } from '@cottons-kr/react-foundation'
import Tab from '@/components/ui/Tab'

import s from './page.module.scss'

export default function HistoryPage() {
  return <>
    <VStack className={s.page} fullHeight gap={12}>
      <LocationHeader />
      <Viewport fullHeight direction='column'>
        <VStack gap={40}>
          <Tab items={[
            { label: '내 기록', value: 'my' },
            { label: '단체 기록', value: 'group' }
          ]}></Tab>
          <Spacer height='100px' />
        </VStack>
      </Viewport>
    </VStack>
  </>
}
