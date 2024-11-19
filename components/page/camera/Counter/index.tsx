'use client'

import { VStack, Flex } from '@cottons-kr/react-foundation'
import { CameraContext } from '@/lib/contexts/camera'
import { useContext, useMemo } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

export default function CameraContentCounter() {
  const { data } = useContext(CameraContext)
  const isMax = useMemo(() => data.savedContent.length >= data.MAX_COUNT, [data.savedContent.length, data.MAX_COUNT])

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4,
    delay: 0.1,
  }
  const alertVariants: Variants = {
    hidden: { opacity: 0, y: -5, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }
  const counterVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return <>
    <AnimatePresence initial={false}>{
      !data.isRecording && (
        <motion.div
          transition={transition} variants={counterVariants}
          initial='hidden' animate='visible' exit='hidden'
        >
          <VStack className={cn(s.counter, isMax && s.expand)} align='center' gap={8}>
            <Flex
              className={s.block}
              align='center' justify='center'
              style={{ width: '70px' }}
            >{data.savedContent.length} / {data.MAX_COUNT}</Flex>
            {isMax && (
              <motion.div
                className={s.block}
                transition={transition} variants={alertVariants}
                initial='hidden' animate='visible'
              >최대 촬영 횟수는 {data.MAX_COUNT}회입니다.</motion.div>
            )}
          </VStack>
        </motion.div>
      )
    }</AnimatePresence>
  </>
}
