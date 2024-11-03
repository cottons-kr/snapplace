'use client'

import { AdjustmentActionType as ActionType, AdjustmentContext } from '@/lib/contexts/adjustment'
import { useContext, useState } from 'react'
import AdjustmentPreviewItem from './Item'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'

import s from './style.module.scss'

export default function AdjustmentPreview() {
  const { data, dispatch } = useContext(AdjustmentContext)

  const swiperProps: SwiperProps = {
    allowTouchMove: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 8,

    onSlideChange: swiper => {
      dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: swiper.realIndex })
    },
  }

  return <>
    <div>
      <Swiper {...swiperProps}>{
        data.adjustments.map(a => (
          <SwiperSlide className={s.slide} key={a.assetUUID}>
            <AdjustmentPreviewItem data={a} />
          </SwiperSlide>
        ))
      }</Swiper>
    </div>
  </>
}
