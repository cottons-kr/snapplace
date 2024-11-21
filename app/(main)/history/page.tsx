'use client'

import LocationHeader from '@/components/ui/Header/Location'
import { VStack, Viewport, HStack } from '@cottons-kr/react-foundation'
import Tab from '@/components/ui/Tab'
import { getJoinedHistories, getMyHistories } from '@/lib/actions/history'
import TabContent from '@/components/ui/Tab/Content'
import { useFetcher } from '@/hooks/useFetcher/Client'
import HistoryItemSkeleton from '@/components/ui/HistoryItem/Skeleton'
import HistoryItem from '@/components/ui/HistoryItem'

import s from './page.module.scss'

export default function HistoryPage() {
  const { data: myHistories } = useFetcher('',
    () => getMyHistories(),
  )
  const { data: joinedHistories } = useFetcher('',
    () => getJoinedHistories(),
  )

  return <>
    <VStack className={s.page} fullHeight gap={12}>
      <LocationHeader />
      <Tab items={[
        { label: '내 기록', value: 'my' },
        { label: '단체 기록', value: 'group' }
      ]}>
        <Viewport fullHeight direction='column'>
          <TabContent value='my'>
            <HStack wrap gap={15}>{
              myHistories ?
                (
                  myHistories.length > 0 ?
                    myHistories.map((h, i) => <HistoryItem key={h.uuid} index={i} data={h} />) :
                    <p className={s.empty}>기록이 없습니다.</p>
                ) :
                <>
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                </>
            }</HStack>
          </TabContent>

          <TabContent value='group'>
          <HStack wrap gap={15}>{
              joinedHistories ?
                (
                  joinedHistories.length > 0 ?
                  joinedHistories.map((h, i) => <HistoryItem key={h.uuid} index={i} data={h} />) :
                    <p className={s.empty}>기록이 없습니다.</p>
                ) :
                <>
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                  <HistoryItemSkeleton />
                </>
            }</HStack>
          </TabContent>
        </Viewport>
      </Tab>
    </VStack>
  </>
}
