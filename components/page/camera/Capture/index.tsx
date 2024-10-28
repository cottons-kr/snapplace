'use client'

import Flex from '@/components/layout/Flex'
import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useContext } from 'react'
import cn from 'classnames'

import s from './style.module.scss'

export default function CameraCapture() {
  const { data, dispatch } = useContext(CameraContext)

  return <>
    <HStack align='center' justify='space-between' width='272px'>
      <Flex className={s.button} align='center' justify='center' width='46px' height='46px'>
        <Icon icon={IconName.Image} fill />
      </Flex>

      <div
        className={cn(
          s.shutter,
          data.mode === CameraMode.VIDEO ? s.video : s.photo,
          { [s.recording]: data.isRecording }
        )}
        onClick={() => dispatch({ type: CameraActionType.SET_RECORDING, payload: !data.isRecording })}
      />

      <Flex className={s.button} align='center' justify='center' width='46px' height='46px'>
        <Icon icon={IconName.Cached} fill />
      </Flex>
    </HStack>
  </>
}
