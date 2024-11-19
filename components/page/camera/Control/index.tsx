'use client'

import { VStack } from '@cottons-kr/react-foundation'
import CameraSwitcher from '../Switcher'
import CameraCapture from '../Capture'
import CameraTimer from '../Timer'

import s from './style.module.scss'

export default function CameraControl() {
  return <>
    <VStack
      className={s.container}
      align='center' justify='center'
      style={{ height: '209px' }}
    >
      <CameraTimer />
      <CameraCapture />
      <CameraSwitcher />
    </VStack>
  </>
}
