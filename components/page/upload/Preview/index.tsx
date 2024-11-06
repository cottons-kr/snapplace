'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import AssetSlide from '@/components/ui/AssetSlide'
import { AdjustMentData } from '@/lib/contexts/adjustment'
import classNames from 'classnames'
import { useState } from 'react'

import s from './style.module.scss'

type UploadPreviewProps = {
  assets: Array<AdjustMentData>
}
export default function UploadPreview(props: UploadPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return <>
    <VStack align='center' gap={6}>
      <AssetSlide
        assets={props.assets}
        onSlideChange={setCurrentIndex}
      />
      <HStack className={s.pagination} justify='center' gap={4}>{
        props.assets.map((asset, index) => (
          <span key={asset.uuid} className={classNames(s.dot, currentIndex === index && s.active)} />
        ))
      }</HStack>
    </VStack>
  </>
}
