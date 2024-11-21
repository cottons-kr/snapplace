'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import { DetailedHistory } from '../../map/Marker/Group'
import Skeleton from '@/components/ui/Skeleton'
import { isVideoExtension } from '@/utils/file'
import { calculateImageFilter } from '@/utils/filter'
import { useToggle } from '@/hooks/useToggle'
import HistoryDetail from '@/components/ui/HistoryDetail'

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
              props.data.map(h => <Item key={h.uuid} data={h} />) :
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

type ItemProps = {
  data: DetailedHistory
}
function Item(props: ItemProps) {
  const isVideo = isVideoExtension(props.data.images[0].path)
  const filteredStyle = {
    filter: calculateImageFilter(props.data.images[0])
  }
  const detailToggle = useToggle()

  return <>
    <VStack
      className={s.item}
      gap={8}
      style={{ width: 'calc(100% / 3 - 10px)', height: 198 }}
      onClick={detailToggle.open}
    >
      {
        isVideo ?
          <video
            src={props.data.images[0].path} autoPlay playsInline muted loop
            style={filteredStyle}
          /> :
          <img src={props.data.images[0].path} style={filteredStyle} />
      }
      <VStack gap={4}>
        <h4>{props.data.title}</h4>
        <p>{props.data.createdAt.toLocaleDateString('ko-KR')}</p>
      </VStack>
    </VStack>

    <HistoryDetail
      uuid={props.data.uuid}
      provider={detailToggle}
    />
  </>
}
