'use client'

import Flex from '@/components/layout/Flex'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { calculateImageFilter } from '@/utils/filter'
import classNames from 'classnames'
import { useState, useEffect, useContext } from 'react'

import s from './style.module.scss'

type Orientation = 'landscape' | 'portrait' | 'square' | null

type AssetSlideItemProps = {
  data: File
}
export default function AssetSlideItem(props: AssetSlideItemProps) {
  const { data } = useContext(AdjustmentContext)
  const [orientation, setOrientation] = useState<Orientation>(null)

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
        filter: calculateImageFilter(data.adjustments[data.assets[data.currentIndex].name.split('.')[0]]),
      }}
    >
      <img
        className={classNames(s.image, orientation && s[orientation])}
        src={URL.createObjectURL(props.data)}
      />
    </Flex>
  </>
}

