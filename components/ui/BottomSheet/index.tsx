'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { ReactNode } from 'react'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

type BottomSheetProps = {
  provider: ToggleProvider
  children?: ReactNode
}
export default function BottomSheet(props: BottomSheetProps) {
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const backgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const containerVariants: Variants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
  }

  return <>
    <AnimatePresence>{
      props.provider.isOpen && (
        <motion.div
          className={s.background}
          variants={backgroundVariants} transition={transition}
          initial='hidden' animate='visible' exit='hidden'
          onClick={e => {
            e.stopPropagation()
            props.provider.close()
          }}
        >
          <motion.div
            className={s.container}
            variants={containerVariants} transition={transition}
            onClick={e => e.stopPropagation()}
          >
            <span className={s.line} />
            {props.children}
          </motion.div>
        </motion.div>
      )
    }</AnimatePresence>
  </>
}
