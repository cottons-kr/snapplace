'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useCallback, useContext } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

export default function CameraCapture() {
  const { data, dispatch } = useContext(CameraContext)

  const onClickCapture = useCallback(() => {
    switch (data.mode) {
      case CameraMode.PHOTO:
        console.log('Capture photo')
        break
      case CameraMode.VIDEO:
        dispatch({ type: CameraActionType.SET_RECORDING, payload: !data.isRecording })
        break
      default:
        break
    }
  }, [data])

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return <>
    <HStack align='center' justify='center' gap={60} width='272px'>
      <AnimatePresence>{
        !data.isRecording && (
          <motion.div
            className={s.button}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
          >
            <Icon icon={IconName.Image} fill />
          </motion.div>
        )
      }</AnimatePresence>

      <div
        className={cn(
          s.shutter,
          data.mode === CameraMode.VIDEO ? s.video : s.photo,
          { [s.recording]: data.isRecording }
        )}
        onClick={onClickCapture}
      />

      <AnimatePresence>{
        !data.isRecording && (
          <motion.div
            className={s.button}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
          >
            <Icon icon={IconName.Cached} fill />
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  </>
}
