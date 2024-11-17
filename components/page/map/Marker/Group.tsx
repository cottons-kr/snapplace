'use client'

import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { GroupedHistory } from '../shared'
import { useEffect, useState } from 'react'
import { motion, Transition, Variants } from 'framer-motion'
import { urlToFile } from '@/utils/common'
import { isVideoExtension, getVideoThumbnail } from '@/utils/file'
import { UserAsset, Like, Account, History } from '@prisma/client'
import { useToggle } from '@/hooks/useToggle'
import MapMarkerSelectionList from './List'

import s from './style.module.scss'

export type DetailedHistory = History & {
  images: Array<UserAsset>
  likes: Array<Like>
  friends: Array<Account>
}

type MapGroupMarkerProps = {
  data: GroupedHistory
}
export default function MapGroupMarker(props: MapGroupMarkerProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const listToggle = useToggle()
  
  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
    delay: 0.7 * Math.random() + 0.1
  }
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { delay: 0 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    }
  }

  useEffect(() => {
    const targetImages = props.data.histories[0].images

    if (targetImages.length === 0) return
    if (isVideoExtension(targetImages[0].path.split('.').pop() || '')) {
      getVideoThumbnail(targetImages[0].path).then(thumbnail => {
        setThumbnail(thumbnail)
      })
    } else {
      urlToFile(targetImages[0].path).then(file => {
        const url = URL.createObjectURL(file)
        setThumbnail(url)
        return () => URL.revokeObjectURL(url)
      })
    }
  }, [props.data.histories])

  return <>
    <AdvancedMarker
      position={{ lat: props.data.latitude, lng: props.data.longitude }}
      clickable={false}
      draggable={false}
      onClick={e => {
        e.stop()
        listToggle.open()
      }}
    >
      <motion.div
        className={s.group}
        style={{
          backgroundImage: `url(${thumbnail})`
        }}
      >
        <span>{props.data.histories.length}</span>
      </motion.div>
    </AdvancedMarker>

    <MapMarkerSelectionList
      provider={listToggle}
      data={props.data.histories}
    />
  </>
}
