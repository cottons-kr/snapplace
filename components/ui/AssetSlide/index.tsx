'use client'

import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Controller } from 'swiper/modules'
import { Dispatch, SetStateAction, useState } from 'react'
import { AdjustMentData } from '@/lib/contexts/adjustment'
import AssetSlideItem from './Item'

import s from './style.module.scss'

type AssetSliderProps = {
  assets: Array<AdjustMentData>
  onSlideChange?: (activeIndex: number) => unknown
  setControlledSwiper?: Dispatch<SetStateAction<SwiperType | null>>
}
export default function AssetSlide(props: AssetSliderProps) {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(null)

  const swiperProps: SwiperProps = {
    allowTouchMove: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 8,
    modules: [Controller],
    controller: { control: controlledSwiper },

    onSlideChange: swiper => {
      props.onSlideChange?.(swiper.realIndex)
    },
    onSwiper: swiper => {
      setControlledSwiper(swiper)
      props.setControlledSwiper?.(swiper)
    }
  }

  return <>
    <Swiper {...swiperProps}>{
      props.assets.map(a => (
        <SwiperSlide key={a.assetUUID} className={s.slide}>
          <AssetSlideItem data={a} />
        </SwiperSlide>
      ))
    }</Swiper>
  </>
}
