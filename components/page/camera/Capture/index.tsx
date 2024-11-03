'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useCallback, useContext, useRef } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import { VideoChunkBuffer } from '@/lib/video'
import { getSupportedMimeType } from '@/utils/camera'

import s from './style.module.scss'

export default function CameraCapture() {
  const { data, dispatch } = useContext(CameraContext)
  const videoBufferRef = useRef(new VideoChunkBuffer())
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = () => {
    if (!data.mediaStream) return

    videoBufferRef.current.clear()
    const supportedMimeType = getSupportedMimeType()
    if (!supportedMimeType) {
      return alert('이 기기에서 지원하는 미디어 타입이 없습니다.')
    }

    console.log('Supported MIME type:', supportedMimeType)

    const options: MediaRecorderOptions = {
      mimeType: supportedMimeType,
    }

    try {
      mediaRecorderRef.current = new MediaRecorder(data.mediaStream, options)
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          videoBufferRef.current.append(event.data)
        }
      }

      mediaRecorderRef.current.start(1000)

      dispatch({ type: CameraActionType.SET_RECORDING, payload: true })
    } catch (err) {
      console.error(err)
      alert('녹화를 시작할 수 없습니다.')
    }
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current && data.isRecording) {
      mediaRecorderRef.current.stop()
      dispatch({ type: CameraActionType.SET_RECORDING, payload: false })

      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        const arrayBuffer = await videoBufferRef.current.getBuffer()
        const blob = new Blob([arrayBuffer], { type: mediaRecorderRef.current.mimeType })
        console.log(blob)
      } catch (err) {
        console.error(err)
        alert('녹화를 종료할 수 없습니다.')
      } finally {
        videoBufferRef.current.clear()
      }
    }
  }

  const onClickCapture = useCallback(async () => {
    const isImageCaptureSupported = 'ImageCapture' in window
    if (!isImageCaptureSupported) {
      console.warn('ImageCapture is not supported in this browser, using polyfill...')
      await import('image-capture')
    }

    switch (data.mode) {
      case CameraMode.PHOTO: {
        if (!data.mediaStream) return
        const track = data.mediaStream.getVideoTracks()[0]
        const imageCapture = new ImageCapture(track)
        const blob = await imageCapture.takePhoto()
        console.log(blob)
      } break
      case CameraMode.VIDEO: {
        if (data.isRecording) {
          stopRecording()
        } else {
          startRecording()
        }
      } break
      default:
        break
    }
  }, [data])

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return <>
    <HStack align='center' justify='center' gap={60} width='272px'>
      <AnimatePresence>{
        !data.isRecording && (
          <motion.div
            className={s.button}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
          >
            <Icon icon={IconName.Image} fill />
          </motion.div>
        )
      }</AnimatePresence>

      <div
        className={cn(
          s.shutter,
          data.mode === CameraMode.VIDEO ? s.video : s.photo,
          { [s.recording]: data.isRecording }
        )}
        onClick={onClickCapture}
      />

      <AnimatePresence>{
        !data.isRecording && (
          <motion.div
            className={s.button}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
          >
            <Icon icon={IconName.Cached} fill />
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  </>
}
