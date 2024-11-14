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
import { calculateImageFilter } from '@/utils/filter'
import { AnimatePresence } from 'framer-motion'
import HistoryDetailFullImage from './FullImage'

import s from './style.module.scss'

type HistoryDetailSlideProps = {
  assets: Array<UserAsset>
}
export default function HistoryDetailSlide(props: HistoryDetailSlideProps) {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullImageTarget, setFullImageTarget] = useState<UserAsset | null>(null)

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
            <AssetItem asset={a} onClick={() => setFullImageTarget(a)} />
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

    <AnimatePresence>{
      fullImageTarget && (
        <HistoryDetailFullImage
          asset={fullImageTarget}
          close={() => setFullImageTarget(null)}
        />
      )
    }</AnimatePresence>
  </>
}

type AssetItemProps = {
  asset: UserAsset
  onClick: () => unknown
}
function AssetItem(props: AssetItemProps) {
  const supportVideoExt = ['mp4', 'webm']
  const fileName = props.asset.path.split('/').pop() || ''
  const isVideo = supportVideoExt.includes(fileName.split('.').pop() || '')

  const childrenProps = {
    className: props.asset.isFourCut ? s.fourCut : '',
    src: props.asset.path,
    style: { filter: calculateImageFilter(props.asset) },
    crossOrigin: 'anonymous' as const,
    onClick: props.onClick
  }

  return (
    isVideo
      ? <video {...childrenProps} autoPlay muted controls={false} loop />
      : <img {...childrenProps} />
  )
}
