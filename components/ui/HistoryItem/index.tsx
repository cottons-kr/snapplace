'use client'

import { DetailedHistory } from '@/components/page/map/Marker/Group'
import { useToggle } from '@/hooks/useToggle'
import { isVideoExtension } from '@/utils/file'
import { calculateImageFilter } from '@/utils/filter'
import { VStack } from '@cottons-kr/react-foundation'
import HistoryDetail from '../HistoryDetail'

import s from './style.module.scss'

type HistoryItemProps = {
  data: DetailedHistory
}
export default function HistoryItem(props: HistoryItemProps) {
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
