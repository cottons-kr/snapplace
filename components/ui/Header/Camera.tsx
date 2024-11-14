'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useCallback, useContext, useMemo } from 'react'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FileStorage } from '@/lib/storage'
import { blobToFile } from '@/utils/file'

import s from './style.module.scss'

export default function CameraHeader() {
  const { data } = useContext(CameraContext)
  const shouldShowComplete = useMemo(() => {
    if (data.isTakingFourCut) {
      return data.savedContent.length >= 4
    } else {
      return !data.isRecording && data.savedContent.length > 0
    }
  }, [data])
  const router = useRouter()

  const onClickUpload = useCallback(async () => {
    const fileStorage = new FileStorage()
    await fileStorage.init()

    for (const content of data.savedContent) {
      const file = blobToFile(content)
      console.log('file', file)
      await fileStorage.saveFile(file.name, file)
    }

    if (data.mode === CameraMode.FOUR_CUT) {
      localStorage.setItem(CameraMode.FOUR_CUT, 'true')
    } else {
      localStorage.removeItem(CameraMode.FOUR_CUT)
    }

    router.push('/camera/confirm')
  }, [data])

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
    </HStack>

    <AnimatePresence>{
      shouldShowComplete && (
        <motion.div
          className={s.complete}
          transition={transition} variants={variants}
          initial='hidden' animate='visible' exit='hidden'
          onClick={onClickUpload}
        >완료</motion.div>
      )
    }</AnimatePresence>
  </>
}
