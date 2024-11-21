'use client'

import { DetailedHistory } from '@/components/page/map/Marker/Group'
import { useToggle } from '@/hooks/useToggle'
import { isVideoExtension } from '@/utils/file'
import { calculateImageFilter } from '@/utils/filter'
import { VStack } from '@cottons-kr/react-foundation'
import HistoryDetail from '../HistoryDetail'
import { Transition, Variants, motion } from 'framer-motion'

import s from './style.module.scss'

type HistoryItemProps = {
  data: DetailedHistory
  index: number
}
export default function HistoryItem(props: HistoryItemProps) {
  const isVideo = isVideoExtension(props.data.images[0].path)
  const filteredStyle = {
    filter: calculateImageFilter(props.data.images[0])
  }
  const detailToggle = useToggle()

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4,
    delay: props.index * 0.035 + 0.1,
  }
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    }
  }

  return <>
    <motion.div
      className={s.item}
      transition={transition} variants={variants}
      initial='hidden' animate='visible'
    >
      <VStack
        fullHeight gap={8}
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
    </motion.div>

    <HistoryDetail
      uuid={props.data.uuid}
      provider={detailToggle}
    />
  </>
}
