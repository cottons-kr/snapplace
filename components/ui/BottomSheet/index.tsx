'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { ReactNode } from 'react'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import classNames from 'classnames'

import s from './style.module.scss'

type BottomSheetProps = {
  provider: ToggleProvider
  stickToBottom?: boolean
  darker?: boolean
  duration?: number
  children?: ReactNode
}
export default function BottomSheet(props: BottomSheetProps) {
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: props.duration || 0.3,
  }
  const backgroundVariants: Variants = {
    hidden: {
      background: 'linear-gradient(180deg, rgba(39, 39, 39, 0) 0%, rgba(39, 39, 39, 0) 100%)',
      backdropFilter: 'blur(0px)',
    },
    visible: {
      background: 'linear-gradient(180deg, rgba(39, 39, 39, 0.80) 0%, rgba(39, 39, 39, 0.10) 100%)',
      backdropFilter: 'blur(4px)',
    },
  }
  const containerVariants: Variants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
  }

  return <>
    <AnimatePresence>{
      props.provider.isOpen && (
        <motion.div
          className={classNames(s.background, {
            [s.stickToBottom]: props.stickToBottom,
          })}
          variants={backgroundVariants} transition={transition}
          initial='hidden' animate='visible' exit='hidden'
          onClick={e => {
            e.stopPropagation()
            props.provider.close()
          }}
        >
          <motion.div
            className={classNames(s.container, {
              [s.darker]: props.darker,
            })}
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
