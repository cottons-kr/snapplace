'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { CameraContext } from '@/lib/contexts/camera'
import { useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'
import { uploadAssets } from '@/lib/actions/asset'
import { dataToFormData } from '@/utils/validator'
import { CreateHistory } from '@/lib/schemas/history/CreateHistory.dto'
import { blobToFile } from '@/utils/file'
import { getCurrentPosition, getLocationName } from '@/lib/location'

import s from './style.module.scss'

export default function CameraHeader() {
  const { data } = useContext(CameraContext)
  const shouldShowComplete = useMemo(() => data.savedContent.length > 0 && !data.isRecording, [data.savedContent.length, data.isRecording])
  const [isUploading, setIsUploading] = useState(false)

  const onClickUpload = useCallback(async () => {
    setIsUploading(true)

    const position = await getCurrentPosition()

    const formData = dataToFormData({
      assets: data.savedContent.map(blobToFile),
      locationName: await getLocationName(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } satisfies CreateHistory)

    await uploadAssets(formData)

    setIsUploading(false)
  }, [data.savedContent])

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
        >{isUploading ? <span /> : '완료'}</motion.div>
      )
    }</AnimatePresence>
  </>
}
