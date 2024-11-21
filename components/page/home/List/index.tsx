'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import { DetailedHistory } from '../../map/Marker/Group'
import Skeleton from '@/components/ui/Skeleton'

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
              <></> :
              <p className={s.empty}>기록이 없습니다</p>
          ) :
          <>
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
            <Skeleton width='calc(100% / 3 - 10px)' height='198px' />
          </>
      }</HStack>
    </VStack>
  </>
}
