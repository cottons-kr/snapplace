'use client'

import { AdjustmentActionType as ActionType, AdjustmentContext } from '@/lib/contexts/adjustment'
import { useContext, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { VStack } from '@/components/layout/Flex/Stack'
import AdjustmentPreviewControl from './Control'
import AssetSlide from '@/components/ui/AssetSlide'

export default function AdjustmentPreview() {
  const { data, dispatch } = useContext(AdjustmentContext)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  return <>
    <VStack gap={21}>
      <AssetSlide
        assets={data.adjustments}
        setControlledSwiper={setSwiper}
        onSlideChange={i => dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: i })}
      />
      <AdjustmentPreviewControl swiper={swiper} />
    </VStack>
  </>
}
