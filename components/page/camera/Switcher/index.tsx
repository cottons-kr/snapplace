'use client'

import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useContext, useMemo } from 'react'
import { HStack } from '@/components/layout/Flex/Stack'
import CameraSwitcherItem from './Item'
import Flex from '@/components/layout/Flex'
import cn from 'classnames'
import { motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

export default function CameraSwitcher() {
  const { data, dispatch } = useContext(CameraContext)
  const shouldHide = useMemo(() => {
    return data.isRecording || data.isTakingFourCut
  }, [data.isRecording, data.isTakingFourCut])
  
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  }

  return <>
    <Flex
      className={s.viewport} align='flex-end' justify='center'
      width='100%' height={shouldHide ? '0' : '65px'}
    />
    <motion.div
      className={s.container}
      variants={variants} transition={transition}
      animate={shouldHide ? 'hidden' : 'visible'}
    >
      <HStack
        className={cn(s.switcher, s[data.mode])}
        align='center' justify='center' gap={36}
        width='fit-content'
      >
        <CameraSwitcherItem
          label='PHOTO'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.PHOTO })}
          isActive={data.mode === CameraMode.PHOTO}
        />
        <CameraSwitcherItem
          label='VIDEO'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.VIDEO })}
          isActive={data.mode === CameraMode.VIDEO}
        />
        <CameraSwitcherItem
          label='4CUT'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.FOUR_CUT })}
          isActive={data.mode === CameraMode.FOUR_CUT}
        />
      </HStack>
    </motion.div>
  </>
}
