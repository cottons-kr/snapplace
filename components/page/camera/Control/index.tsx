'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import { useContext } from 'react'
import { CameraContext } from '@/lib/contexts/camera'
import CameraSwitcher from '../Switcher'
import CameraCapture from '../Capture'
import CameraTimer from '../Timer'

import s from './style.module.scss'

export default function CameraControl() {
  const { data, dispatch } = useContext(CameraContext)

  return <>
    <VStack
      className={s.container}
      align='center' justify='center'
      height='209px'
    >
      <CameraTimer />
      <CameraCapture />
      <CameraSwitcher />
    </VStack>
  </>
}
