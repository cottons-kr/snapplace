'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import { DetailedHistory } from '../../map/Marker/Group'
import HistoryItem from '@/components/ui/HistoryItem'
import HistoryItemSkeleton from '@/components/ui/HistoryItem/Skeleton'

import s from './style.module.scss'

type HomeListProps = {
  title: string
  data: Array<DetailedHistory> | null
}
export default function HomeList(props: HomeListProps) {
  return <>
    <VStack gap={15}>
      <h2 className={s.title}>{props.title}</h2>
      <HStack wrap gap={15}>{
        Array.isArray(props.data) ?
          (
            props.data.length > 0 ?
              props.data.map(h => <HistoryItem key={h.uuid} data={h} />) :
              <p className={s.empty}>기록이 없습니다</p>
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
    </VStack>
  </>
}
