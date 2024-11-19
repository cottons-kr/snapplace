import { ReactNode } from 'react'
import { HStack, Spacer, Viewport, VStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import Link from 'next/link'

import s from './style.module.scss'

type SettingsContainerProps = {
  title: string
  gap?: number
  children?: ReactNode
}
export default function SettingsContainer(props: SettingsContainerProps) {
  return <>
    <VStack
      style={{ height: 'calc(100dvh - var(--min-bottom) - 12px - 41px)' }}
    >
      <VStack
        className={s.backdrop}
        align='center' justify='end'
        style={{ height: 'calc(var(--min-top) + 54px)' }}
      >
        <HStack className={s.top} align='center' justify='between'>
          <Link className={s.back} href='/settings'>
            <Icon icon={IconName.ChevronBackward} size={32} />
          </Link>
          <h4>{props.title}</h4>
          <Spacer width='32px' height='32px' />
        </HStack>
      </VStack>

      <Viewport fullHeight>
        <VStack
          className={s.content} gap={props.gap}
          fullHeight
        >{props.children}</VStack>
      </Viewport>
    </VStack>
  </>
}
