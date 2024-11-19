'use client'

import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useCallback, useContext, useMemo, useState } from 'react'
import { Flex, HStack } from '@cottons-kr/react-foundation'
import CameraSwitcherItem from './Item'
import cn from 'classnames'
import { motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

export default function CameraSwitcher() {
  const { data, dispatch } = useContext(CameraContext)
  const [dragStartPoint, setDragStartPoint] = useState(0)
  const [isDragEnd, setIsDragEnd] = useState(false)
  const shouldHide = useMemo(() => {
    return data.isRecording || data.isTakingFourCut
  }, [data.isRecording, data.isTakingFourCut])
  
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setDragStartPoint(e.touches[0].clientX)
    setIsDragEnd(false)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragEnd) return

    const diff = e.changedTouches[0].clientX - dragStartPoint
    let direction: 'left' | 'right'
    if (diff > 50) {
      direction = 'right'
    } else if (diff < -50) {
      direction = 'left'
    } else {
      return
    }
    const modes = [CameraMode.PHOTO, CameraMode.VIDEO, CameraMode.FOUR_CUT]
    const currentIndex = modes.indexOf(data.mode)
    let nextIndex = currentIndex
    if (direction === 'left') {
      nextIndex = currentIndex + 1
    } else {
      nextIndex = currentIndex - 1
    }
    if (nextIndex < 0) {
      nextIndex = modes.length - 1
    } else if (nextIndex >= modes.length) {
      nextIndex = 0
    }
    dispatch({ type: CameraActionType.SET_MODE, payload: modes[nextIndex] })
    setIsDragEnd(true)
  }, [data.mode, dragStartPoint])

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
      className={s.viewport} align='end' justify='center'
      fullWidth
      style={{ height: shouldHide ? '0' : '65px' }}
    />
    <motion.div
      className={s.container}
      variants={variants} transition={transition}
      animate={shouldHide ? 'hidden' : 'visible'}
    >
      <HStack
        className={cn(s.switcher, s[data.mode])}
        align='center' justify='center' gap={36}
        style={{ width: 'fit-content' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
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
