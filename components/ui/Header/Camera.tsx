'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'

import s from './style.module.scss'

export default function CameraHeader() {
  return <>
    <HStack
      className={s.camera}
      align='center' justify='space-between'
      height='54px'
    >
      <Icon icon={IconName.ChevronBackward} />
      <Icon icon={IconName.FlashlightOff} size={20} color='var(--Gray-5)' />
    </HStack>
  </>
}
