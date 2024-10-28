'use client'

import { CameraContext } from '@/lib/contexts/camera'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'

import s from './style.module.scss'

export default function CameraTimer() {
  const { data, dispatch } = useContext(CameraContext)
  const [time, setTime] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (data.isRecording) {
      const id = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
      setIntervalId(id)
    } else {
      clearInterval(intervalId)
      setTime(0)
    }
    return () => clearInterval(intervalId)
  }, [data.isRecording])

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, [])

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }

  return <>
    <AnimatePresence>{
      data.isRecording && (
        <motion.div
          className={s.timer}
          variants={variants} transition={transition}
          initial='hidden' animate='visible' exit='hidden'

        >{formatTime(time)}</motion.div>
      )
    }</AnimatePresence>
  </>
}
