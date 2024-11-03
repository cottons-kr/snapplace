'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { CameraContext } from '@/lib/contexts/camera'
import { useContext } from 'react'
import { Transition, Variants, motion } from 'framer-motion'

import s from './style.module.scss'

export default function CameraHeader() {
  const { data } = useContext(CameraContext)

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4,
  }
  const variants: Variants = {
    hidden: { opacity: 0, x: 15, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  }

  return <>
    <HStack
      className={s.camera}
      align='center' justify='space-between'
      height='54px'
    >
      <Icon icon={IconName.ChevronBackward} />
      <Icon icon={IconName.FlashlightOff} size={20} color='var(--Gray-5)' />

      {data.savedContent.length > 0 && (
        <motion.div
          className={s.complete}
          transition={transition} variants={variants}
          initial='hidden' animate='visible'
        >완료</motion.div>
      )}
    </HStack>
  </>
}
