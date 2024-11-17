'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { DetailedHistory } from './Group'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'

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
    hidden: {
      background: 'linear-gradient(180deg, rgba(39, 39, 39, 0) 0%, rgba(39, 39, 39, 0) 100%)',
      backdropFilter: 'blur(0px)',
    },
    visible: {
      background: 'linear-gradient(180deg, rgba(39, 39, 39, 0.80) 0%, rgba(39, 39, 39, 0.10) 100%)',
      backdropFilter: 'blur(4px)'
    },
  }
  const containerVariants: Variants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
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
          ></motion.div>
        </motion.div>
      )
    }</AnimatePresence>
  </>
}
