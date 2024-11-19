'use client'

import { AdjustmentActionType as ActionType, AdjustmentContext } from '@/lib/contexts/adjustment'
import { useContext, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { VStack } from '@cottons-kr/react-foundation'
import AdjustmentPreviewControl from './Control'
import AssetSlide from '@/components/ui/AssetSlide'

export default function AdjustmentPreview() {
  const { data, dispatch } = useContext(AdjustmentContext)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const onSlideChange = (i: number) => {
    dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: i })
    dispatch({ type: ActionType.SET_CURRENT_ID, payload: data.assets[i].name.split('.')[0] })
  }

  return <>
    <VStack gap={21}>
      <AssetSlide
        assets={data.assets}
        adjustments={data.adjustments}
        setControlledSwiper={setSwiper}
        onSlideChange={onSlideChange}
      />
      <AdjustmentPreviewControl swiper={swiper} />
    </VStack>
  </>
}
