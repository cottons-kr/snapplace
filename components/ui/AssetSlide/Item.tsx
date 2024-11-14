'use client'

import Flex from '@/components/layout/Flex'
import { AdjustMentData } from '@/lib/contexts/adjustment'
import { calculateImageFilter } from '@/utils/filter'
import classNames from 'classnames'
import { useState, useEffect, useMemo } from 'react'

import s from './style.module.scss'

type Orientation = 'landscape' | 'portrait' | 'square' | null

type AssetSlideItemProps = {
  data: File
  adjustment: AdjustMentData
}
export default function AssetSlideItem(props: AssetSlideItemProps) {
  const [orientation, setOrientation] = useState<Orientation>(null)
  const isVideo = props.data.type.includes('video')

  const childrenProps = useMemo(() => ({
    className: classNames(s.image, orientation && s[orientation]),
    src: URL.createObjectURL(props.data),
  }), [orientation, props.data])

  useEffect(() => {
    const image = new Image()
    image.src = URL.createObjectURL(props.data)
    image.onload = () => {
      const { width, height } = image
      setOrientation(width > height ? 'landscape' : width < height ? 'portrait' : 'square')
    }
  }, [props.data])

  return <>
    <Flex
      className={s.item}
      align='center' justify='center'
      width='fit-content' height='209px'
      style={{
        filter: calculateImageFilter(props.adjustment),
      }}
    >{
      isVideo ? 
        <video {...childrenProps} autoPlay muted controls={false} loop /> :
        <img {...childrenProps} />
    }</Flex>
  </>
}

