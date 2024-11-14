'use client'

import { UserAsset } from '@prisma/client'
import { motion, Transition, Variants } from 'framer-motion'

import s from './style.module.scss'

type HistoryDetailFullImageProps = {
  asset: UserAsset
  close: () => unknown
}
export default function HistoryDetailFullImage(props: HistoryDetailFullImageProps) {
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4,
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

  return <>
    <motion.div
      className={s['full-image']}
      variants={backgroundVariants} transition={transition}
      initial='hidden' animate='visible' exit='hidden'
      onClick={props.close}
    >
      <motion.img
        src={props.asset.path} alt={props.asset.uuid}
        variants={assetVariants} transition={transition}
        initial='hidden' animate='visible' exit='hidden'
      />
    </motion.div>
  </>
}
