'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import AssetSlide from '@/components/ui/AssetSlide'
import classNames from 'classnames'
import { UploadContext } from '@/lib/contexts/upload'
import { useContext, useState } from 'react'

import s from './style.module.scss'

export default function UploadPreview() {
  const { data } = useContext(UploadContext)
  const [currentIndex, setCurrentIndex] = useState(0)

  return <>
    <VStack align='center' gap={6}>
      <AssetSlide
        assets={data.assets}
        onSlideChange={setCurrentIndex}
      />
      <HStack className={s.pagination} justify='center' gap={4}>{
        data.assets.map((asset, index) => (
          <span key={asset.path} className={classNames(s.dot, currentIndex === index && s.active)} />
        ))
      }</HStack>
    </VStack>
  </>
}
