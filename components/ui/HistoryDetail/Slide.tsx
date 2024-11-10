'use client'

import { UserAsset } from '@prisma/client'
import { useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import classNames from 'classnames'

import s from './style.module.scss'

type HistoryDetailSlideProps = {
  assets: Array<UserAsset>
}
export default function HistoryDetailSlide(props: HistoryDetailSlideProps) {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const swiperProps: SwiperProps = {
    allowTouchMove: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    modules: [Controller],
    controller: { control: controlledSwiper },

    onSlideChange: swiper => {
      setActiveIndex(swiper.realIndex)
    },
    onSwiper: swiper => {
      setControlledSwiper(swiper)
    }
  }

  return <>
    <div className={s.slide}>
      <Swiper {...swiperProps}>{
        props.assets.map(a => (
          <SwiperSlide key={a.uuid} className={s.asset}>
            <img src={a.path} />
          </SwiperSlide>
        ))
      }</Swiper>

      <HStack className={s.control} justify='space-between'>
        <div onClick={() => controlledSwiper?.slidePrev()}>
          <Icon icon={IconName.ArrowBackIosNew} size={16} />
        </div>
        <div onClick={() => controlledSwiper?.slideNext()}>
          <Icon icon={IconName.ArrowForwardIos} size={16} />
        </div>
      </HStack>

      <HStack className={s.pagination} gap={4} width='fit-content'>{
        props.assets.map((_, i) => (
          <div key={i} className={classNames(s.dot, activeIndex === i && s.active)} />
        ))
      }</HStack>
    </div>
  </>
}
