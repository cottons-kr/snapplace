'use client'

import { useEffect, useReducer, useRef, useState } from 'react'
import { VStack } from '@/components/layout/Flex/Stack'
import CameraHeader from '@/components/ui/Header/Camera'
import CameraControl from '@/components/page/camera/Control'
import CameraContentCounter from '@/components/page/camera/Counter'
import { CameraActionType, CameraContext, cameraReducer, initialCameraContext } from '@/lib/contexts/camera'
import classNames from 'classnames'

import s from './page.module.scss'

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraData, setCameraData] = useReducer(cameraReducer, initialCameraContext)
  const [_, setIsCameraOn] = useState(false)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: cameraData.isFrontCamera ? 'user' : 'environment',
        advanced: [{ torch: false }],
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
      videoRef.current.onplay = () => {
        setCameraData({ type: CameraActionType.SET_ROTATING, payload: false })
      }
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
          className={classNames(s.video, { [s.rotating]: cameraData.isRotating })}
          ref={videoRef}
          autoPlay muted playsInline controls={false}
        />
        <CameraContentCounter />
        <CameraControl />

        <div className={classNames(s.rotatingOverlay, { [s.show]: cameraData.isRotating })} />
      </VStack>
    </CameraContext.Provider>
  </>
}
