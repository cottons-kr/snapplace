'use client'

import Flex from '@/components/layout/Flex'
import { AdjustMentData } from '@/lib/contexts/adjustment'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { calculateImageFilter } from '@/utils/filter'

import s from './style.module.scss'

type Orientation = 'landscape' | 'portrait' | 'square' | null

type AdjustmentPreviewItemProps = {
  data: AdjustMentData
}
export default function AdjustmentPreviewItem(props: AdjustmentPreviewItemProps) {
  const [orientation, setOrientation] = useState<Orientation>(null)

  useEffect(() => {
    const image = new Image()
    image.src = props.data.path
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
        filter: calculateImageFilter(props.data)
      }}
    >
      <img
        className={classNames(s.image, orientation && s[orientation])}
        src={props.data.path}
      />
    </Flex>
  </>
}
