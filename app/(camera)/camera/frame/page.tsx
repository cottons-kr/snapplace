'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import ColorSelector from '@/components/page/frame/ColorSelector'
import { useState } from 'react'
import FramePreview from '@/components/page/frame/Preview'
import FrameSubmit from '@/components/page/frame/Submit'
import { FrameBackground } from '@/components/page/frame/shared'

import s from './page.module.scss'

export default function CameraFourCutFramePage() {
  const [frameType, setFrameType] = useState(FrameBackground.DEFAULT)

  return <>
    <VStack className={s.page} gap={13} height='100dvh'>
      <FramePreview frameType={frameType} />
      <ColorSelector
        frameType={frameType}
        setFrameType={setFrameType}
      />
      <FrameSubmit />
    </VStack>
  </>
}
