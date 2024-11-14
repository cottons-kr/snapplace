'use client'

import { UserAsset } from '@prisma/client'
import { motion, Transition, Variants } from 'framer-motion'
import { calculateImageFilter } from '@/utils/filter'

import s from './style.module.scss'

type HistoryDetailFullImageProps = {
  asset: UserAsset
  close: () => unknown
}
export default function HistoryDetailFullImage(props: HistoryDetailFullImageProps) {
  const supportVideoExt = ['mp4', 'webm']
  const fileName = props.asset.path.split('/').pop() || ''
  const isVideo = supportVideoExt.includes(fileName.split('.').pop() || '')

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.7,
    type: 'spring',
  }
  const backgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  const assetVariants: Variants = {
    hidden: {
      y: -250,
      scale: 0.3, opacity: 0,
    },
    visible: {
      y: 0,
      scale: 1, opacity: 1,
    }
  }

  const childrenProps = {
    src: props.asset.path,
    alt: props.asset.uuid,
    onClick: props.close,
    style: { filter: calculateImageFilter(props.asset) },
    variants: assetVariants,
    transition,
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    crossOrigin: 'anonymous' as const,
  }

  return <>
    <motion.div
      className={s['full-image']}
      variants={backgroundVariants} transition={transition}
      initial='hidden' animate='visible' exit='hidden'
      onClick={props.close}
    >{
      isVideo ?
        <motion.video {...childrenProps} autoPlay muted controls={false} loop playsInline /> :
        <motion.img {...childrenProps} />
    }</motion.div>
  </>
}
