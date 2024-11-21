'use client'

import { ToggleProvider, useToggle } from '@/hooks/useToggle'
import { DetailedHistory } from './Group'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import { VStack } from '@cottons-kr/react-foundation'
import { useThumbnail } from '@/hooks/useThumbnail'
import HistoryDetail from '@/components/ui/HistoryDetail'

import s from './style.module.scss'

type MapMarkerSelectionListProps = {
  provider: ToggleProvider
  data: Array<DetailedHistory>
}
export default function MapMarkerSelectionList(props: MapMarkerSelectionListProps) {
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const backgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const containerVariants: Variants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
    },
  }

  return <>
    <AnimatePresence>{
      props.provider.isOpen && (
        <motion.div
          className={s.background}
          variants={backgroundVariants} transition={transition}
          initial='hidden' animate='visible' exit='hidden'
          onClick={props.provider.close}
        >
          <motion.div
            className={s.container}
            variants={containerVariants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
            onClick={e => e.stopPropagation()}
          >{
            props.data.map(d => <Item key={d.uuid} data={d} />)
          }</motion.div>
        </motion.div>
      )
    }</AnimatePresence>
  </>
}

type ItemProps = {
  data: DetailedHistory
}
function Item(props: ItemProps) {
  const thumbnail = useThumbnail(props.data.images[0].path)
  const detailToggle = useToggle()
  
  return <>
    <VStack
      className={s.item}
      justify='end' gap={4}
      style={{ width: 'calc(50% - 5px)', height: '200px' }}
      onClick={detailToggle.open}
    >
      {thumbnail && <img src={thumbnail} alt={props.data.title} />}
      <h4>{props.data.title}</h4>
      <p>{props.data.createdAt.toLocaleDateString('ko-KR')}</p>
    </VStack>

    <HistoryDetail
      uuid={props.data.uuid}
      provider={detailToggle}
    />
  </>
}
