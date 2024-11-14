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
        facingMode: cameraData.isFrontCamera ? 'user' : 'environment',
      },
      audio: true,
    })
      .then(stream => {
        console.log('Media stream:', stream, cameraData.isFrontCamera)
        setCameraData({ type: CameraActionType.SET_MEDIA_STREAM, payload: stream })
      })
      .catch(error => {
        console.error(error)
        alert('카메라를 사용할 수 없습니다.')
      })
    
      localStorage.removeItem('selected')
  }, [cameraData.isFrontCamera])

  useEffect(() => {
    if (!videoRef.current) return
    if (cameraData.mediaStream) {
      videoRef.current.srcObject = cameraData.mediaStream
      setIsCameraOn(true)
    } else {
      videoRef.current.srcObject = null
      setIsCameraOn(false)
    }
  }, [cameraData.mediaStream])
  
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
