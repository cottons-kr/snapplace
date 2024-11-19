'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
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
        assets={data.files}
        adjustments={data.adjustments}
        onSlideChange={setCurrentIndex}
      />
      <HStack className={s.pagination} justify='center' gap={4}>{
        data.files.map((f, i) => (
          <span key={f.name} className={classNames(s.dot, currentIndex === i && s.active)} />
        ))
      }</HStack>
    </VStack>
  </>
}
