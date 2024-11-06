'use client'

import { useEffect, useReducer, useRef, useState } from 'react'
import { VStack } from '@/components/layout/Flex/Stack'
import CameraHeader from '@/components/ui/Header/Camera'
import CameraControl from '@/components/page/camera/Control'
import CameraContentCounter from '@/components/page/camera/Counter'
import { CameraActionType, CameraContext, cameraReducer, initialCameraContext } from '@/lib/contexts/camera'

import s from './page.module.scss'

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraData, setCameraData] = useReducer(cameraReducer, initialCameraContext)
  const [isCameraOn, setIsCameraOn] = useState(false)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        frameRate: { ideal: 30, max: 60 },
      },
      audio: true,
    })
      .then(stream => {
        setCameraData({ type: CameraActionType.SET_MEDIA_STREAM, payload: stream })
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
    <CameraContext.Provider value={{
      data: cameraData,
      dispatch: setCameraData
    }}>
      <VStack className={s.page}>
        <CameraHeader />
        <video
          className={s.video}
          ref={videoRef}
          autoPlay muted playsInline controls={false}
        />
        <CameraContentCounter />
        <CameraControl />
      </VStack>
    </CameraContext.Provider>
  </>
}
