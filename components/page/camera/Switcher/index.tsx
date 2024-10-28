'use client'

import { CameraActionType, CameraContext, CameraMode } from '@/lib/contexts/camera'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { HStack } from '@/components/layout/Flex/Stack'
import CameraSwitcherItem from './Item'
import Flex from '@/components/layout/Flex'
import cn from 'classnames'

import s from './style.module.scss'

export default function CameraSwitcher() {
  const { data, dispatch } = useContext(CameraContext)
  
  return <>
    <Flex className={s.container} width='52px' height='24px'>
      <HStack
        className={cn(s.switcher, s[data.mode])}
        align='center' justify='center' gap={36}
        width='fit-content'
      >
        <CameraSwitcherItem
          label='PHOTO'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.PHOTO })}
          isActive={data.mode === CameraMode.PHOTO}
        />
        <CameraSwitcherItem
          label='VIDEO'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.VIDEO })}
          isActive={data.mode === CameraMode.VIDEO}
        />
        <CameraSwitcherItem
          label='4CUT'
          onClick={() => dispatch({ type: CameraActionType.SET_MODE, payload: CameraMode.FOUR_CUT })}
          isActive={data.mode === CameraMode.FOUR_CUT}
        />
      </HStack>
    </Flex>
  </>
}
