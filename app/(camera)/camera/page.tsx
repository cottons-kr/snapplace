'use client'

import { useEffect, useRef, useState } from 'react'
import { VStack } from '@/components/layout/Flex/Stack'
import CameraHeader from '@/components/ui/Header/Camera'

import s from './page.module.scss'

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current && !isCameraOn) {
          videoRef.current.srcObject = stream
          setIsCameraOn(true)
        }
      })
      .catch(error => {
        console.error(error)
        alert('카메라를 사용할 수 없습니다.')
      })
  }, [])
  
  return <>
    <VStack className={s.page}>
      <CameraHeader />
      <video
        className={s.video}
        ref={videoRef}
        autoPlay muted playsInline controls={false}
      />
    </VStack>
  </>
}
