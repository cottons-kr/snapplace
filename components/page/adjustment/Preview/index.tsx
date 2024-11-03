'use client'

import { AdjustmentActionType as ActionType, AdjustmentContext } from '@/lib/contexts/adjustment'
import { useContext, useState } from 'react'
import AdjustmentPreviewItem from './Item'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Controller } from 'swiper/modules'
import { VStack } from '@/components/layout/Flex/Stack'
import AdjustmentPreviewControl from './Control'

import s from './style.module.scss'

export default function AdjustmentPreview() {
  const { data, dispatch } = useContext(AdjustmentContext)
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(null)

  const swiperProps: SwiperProps = {
    allowTouchMove: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 8,
    modules: [Controller],
    controller: { control: controlledSwiper },

    onSlideChange: swiper => {
      dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: swiper.realIndex })
    },
    onSwiper: setControlledSwiper
  }

  return <>
    <VStack gap={21}>
      <Swiper {...swiperProps}>{
        data.adjustments.map(a => (
          <SwiperSlide className={s.slide} key={a.assetUUID}>
            <AdjustmentPreviewItem data={a} />
          </SwiperSlide>
        ))
      }</Swiper>
      <AdjustmentPreviewControl swiper={controlledSwiper} />
    </VStack>
  </>
}
