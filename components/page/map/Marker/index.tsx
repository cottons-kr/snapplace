'use client'

import { urlToFile } from '@/utils/common'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { motion, Transition, Variants } from 'framer-motion'
import HistoryDetail from '@/components/ui/HistoryDetail'
import { Account, History, Like, UserAsset } from '@prisma/client'
import { useToggle } from '@/hooks/useToggle'
import { getVideoThumbnail, isVideoExtension, isVideoFile } from '@/utils/file'
import { calculateImageFilter } from '@/utils/filter'
import { nanoid } from 'nanoid'

type MapMarkerProps = {
  data: History & {
    images: Array<UserAsset>
    likes: Array<Like>
    friends: Array<Account>
  }
}
export default function MapMarker(props: MapMarkerProps) {
  const [base64, setBase64] = useState<string | null>(null)
  const [id, setId] = useState('')
  const detailToggle = useToggle()

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
    setId(nanoid())
  }, [])

  useEffect(() => {
    if (props.data.images.length === 0) return
    if (isVideoExtension(props.data.images[0].path.split('.').pop() || '')) {
      getVideoThumbnail(props.data.images[0].path).then(thumbnail => {
        setBase64(thumbnail)
      })
    } else {
      urlToFile(props.data.images[0].path).then(file => {
        const url = URL.createObjectURL(file)
        setBase64(url)
        return () => URL.revokeObjectURL(url)
      })
    }
  }, [props.data.images])

  return base64 && <>
    <AdvancedMarker
      position={{ lat: props.data.latitude, lng: props.data.longitude }}
      clickable={false}
      draggable={false}
      onClick={e => {
        detailToggle.open()
        e.stop()
      }}
    >
      <motion.svg
        transition={transition} variants={variants}
        initial='hidden' whileInView='visible'
        width='40' height='51' viewBox='0 0 40 51' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <g opacity='0.9'>
          <mask id='path-1-inside-1_992_855' fill='white'>
            <path fillRule='evenodd' clipRule='evenodd' d='M12 0C5.37258 0 0 5.37258 0 12V28C0 34.6274 5.37258 40 12 40H13.6491L20 51L26.3509 40H28C34.6274 40 40 34.6274 40 28V12C40 5.37258 34.6274 0 28 0H12Z'/>
          </mask>
          <path fillRule='evenodd' clipRule='evenodd' d='M12 0C5.37258 0 0 5.37258 0 12V28C0 34.6274 5.37258 40 12 40H13.6491L20 51L26.3509 40H28C34.6274 40 40 34.6274 40 28V12C40 5.37258 34.6274 0 28 0H12Z' fill={`url(#pattern${id})`} />
          <path d='M13.6491 40L16.2472 38.5L15.3812 37H13.6491V40ZM20 51L17.4019 52.5L20 57L22.5981 52.5L20 51ZM26.3509 40V37H24.6188L23.7528 38.5L26.3509 40ZM3 12C3 7.02944 7.02944 3 12 3V-3C3.71573 -3 -3 3.71573 -3 12H3ZM3 28V12H-3V28H3ZM12 37C7.02944 37 3 32.9706 3 28H-3C-3 36.2843 3.71573 43 12 43V37ZM13.6491 37H12V43H13.6491V37ZM22.5981 49.5L16.2472 38.5L11.0511 41.5L17.4019 52.5L22.5981 49.5ZM23.7528 38.5L17.4019 49.5L22.5981 52.5L28.9489 41.5L23.7528 38.5ZM28 37H26.3509V43H28V37ZM37 28C37 32.9706 32.9706 37 28 37V43C36.2843 43 43 36.2843 43 28H37ZM37 12V28H43V12H37ZM28 3C32.9706 3 37 7.02944 37 12H43C43 3.71573 36.2843 -3 28 -3V3ZM12 3H28V-3H12V3Z' fill='#272727' mask='url(#path-1-inside-1_992_855)'/>
        </g>
        <defs>
          <pattern id={`pattern${id}`} patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use xlinkHref={`#image${id}`} transform='matrix(0.00177083 0 0 0.00138889 -0.35 0)'/>
          </pattern>
          <image
            id={`image${id}`} width='960' height='720' xlinkHref={base64}
            style={{ filter: calculateImageFilter(props.data.images[0]) }}
          />
        </defs>
      </motion.svg>
    </AdvancedMarker>

    <HistoryDetail
      history={props.data}
      provider={detailToggle}
    />
  </>
}
