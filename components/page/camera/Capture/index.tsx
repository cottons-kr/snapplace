'use client'

import { HStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import { VideoChunkBuffer } from '@/lib/video'
import { getSupportedMimeType } from '@/utils/camera'
import { FileStorage } from '@/lib/storage'
import classNames from 'classnames'

import s from './style.module.scss'

export default function CameraCapture() {
  const { data, dispatch } = useContext(CameraContext)
  const videoBufferRef = useRef(new VideoChunkBuffer())
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const shouldHideGalleryButton = useMemo(() => data.isTakingFourCut || data.isRecording, [data])
  const shouldAlignCenter = useMemo(() => {
    return data.isRecording || !data.isTakingFourCut
  }, [data])

  const turnOnFlashlight = useCallback(() => {
    if (!data.mediaStream || !data.isFlashOn) return
    if (data.isFrontCamera) {
      if (data.mode !== CameraMode.VIDEO) {
        dispatch({ type: CameraActionType.SET_SHOW_FRONT_FLASHLIGHT, payload: true })
      }
    } else {
      const videoTracks = data.mediaStream.getVideoTracks()
      videoTracks[0]?.applyConstraints({ advanced: [{ torch: true }] })
    }
  }, [data.mediaStream, data.isFlashOn, data.isFrontCamera])

  const turnOffFlashlight = useCallback(() => {
    if (!data.mediaStream) return
    if (data.isFrontCamera) {
      dispatch({ type: CameraActionType.SET_SHOW_FRONT_FLASHLIGHT, payload: false })
    } else {
      const videoTracks = data.mediaStream.getVideoTracks()
      videoTracks[0]?.applyConstraints({ advanced: [{ torch: false }] })
    }
  }, [data.mediaStream, data.isFlashOn, data.isFrontCamera])

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
      turnOnFlashlight()

      mediaRecorderRef.current = new MediaRecorder(data.mediaStream, options)
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          videoBufferRef.current.append(event.data)
        }
      }

      mediaRecorderRef.current.start(1000)

      dispatch({ type: CameraActionType.SET_RECORDING, payload: true })
    } catch (err) {
      turnOffFlashlight()
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
        dispatch({ type: CameraActionType.SET_SAVED_CONTENT, payload: [...data.savedContent, blob] })
      } catch (err) {
        console.error(err)
        alert('녹화를 종료할 수 없습니다.')
      } finally {
        videoBufferRef.current.clear()
        turnOffFlashlight()
      }
    }
  }

  const takePhoto = useCallback(async () => {
    if (!data.mediaStream) return

    turnOnFlashlight()
    const track = data.mediaStream.getVideoTracks()[0]
    const imageCapture = new ImageCapture(track)
    const blob = await imageCapture.takePhoto()
    turnOffFlashlight()

    dispatch({ type: CameraActionType.SET_SAVED_CONTENT, payload: [...data.savedContent, blob] })
  }, [data])

  const onClickCapture = useCallback(async () => {
    if (data.savedContent.length >= data.MAX_COUNT) {
      return
    }

    switch (data.mode) {
      case CameraMode.PHOTO: {
        await takePhoto()
      } break
      case CameraMode.VIDEO: {
        if (data.isRecording) {
          stopRecording()
        } else {
          startRecording()
        }
      } break
      case CameraMode.FOUR_CUT: {
        if (!data.isTakingFourCut) {
          dispatch({ type: CameraActionType.SET_TAKING_FOUR_CUT, payload: true })
        }
        await takePhoto()
      } break
      default:
        break
    }
  }, [data])

  const onClickFlip = async () => {
    if (data.isRotating) return

    await navigator.mediaDevices.enumerateDevices()
    dispatch({ type: CameraActionType.SET_ROTATING, payload: true })
    setTimeout(() => {
      dispatch({ type: CameraActionType.SET_MEDIA_STREAM, payload: null })
      dispatch({ type: CameraActionType.SET_FRONT_CAMERA, payload: !data.isFrontCamera })
    }, 500)
  }

  useEffect(() => {
    async function init() {
      const isImageCaptureSupported = 'ImageCapture' in window
      if (!isImageCaptureSupported) {
        console.warn('ImageCapture is not supported in this browser, using polyfill...')
        await import('image-capture')
      } else {
        console.log('ImageCapture is supported in this browser.')
      }
      console.log('MediaRecorder is supported:', 'MediaRecorder' in window)
      console.log('User Agent:', navigator.userAgent)

      const fileStorage = new FileStorage()
      await fileStorage.init()
      await fileStorage.clearAll()
    }
    init()
  } ,[])

  const transition: Transition = {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  }
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return <>
    <HStack
      align='center' justify={shouldAlignCenter ? 'center' : 'end'} gap={60}
      style={{ width: '272px' }}
    >
      <AnimatePresence>{
        !shouldHideGalleryButton && (
          <motion.label
            className={classNames(s.button, s.gallery)}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
          >
            <Icon icon={IconName.Image} fill />
            <input
              type='file' accept='image/*' multiple
              onChange={e => {
                const files = Array.from(e.target.files || []).filter(Boolean).slice(0, 10)
                const blobs = files.map(file => file.slice(0, file.size, file.type))
                dispatch({ type: CameraActionType.SET_SAVED_CONTENT, payload: [...data.savedContent, ...blobs] })
              }}
            />
          </motion.label>
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
            className={classNames(s.button, s.flip)}
            variants={variants} transition={transition}
            initial='hidden' animate='visible' exit='hidden'
            onClick={onClickFlip}
          >
            <Icon icon={IconName.Cached} fill />
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  </>
}
