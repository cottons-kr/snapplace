'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import { SetStateAction } from 'jotai'
import { Dispatch, useMemo } from 'react'
import { FrameBackground } from '../shared'

import s from './style.module.scss'
import classNames from 'classnames'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'

type FrameColorSelectorProps = {
  frameType: FrameBackground
  setFrameType: Dispatch<SetStateAction<FrameBackground>>
}
export default function FrameColorSelector(props: FrameColorSelectorProps) {
  return <>
    <HStack align='center' justify='center' gap={40}>
      <Item
        color='#222222'
        label='기본'
        selected={props.frameType === FrameBackground.DEFAULT}
        onClick={() => props.setFrameType(FrameBackground.DEFAULT)}
      />
      <Item
        color='#333333'
        label='그레이'
        selected={props.frameType === FrameBackground.GRAY}
        onClick={() => props.setFrameType(FrameBackground.GRAY)}
      />
      <Item
        color='#F3660E'
        label='노을'
        selected={props.frameType === FrameBackground.SUNSET}
        onClick={() => props.setFrameType(FrameBackground.SUNSET)}
      />
      <Item
        color='#0179B8'
        label='해변'
        selected={props.frameType === FrameBackground.BEACH}
        onClick={() => props.setFrameType(FrameBackground.BEACH)}
      />
    </HStack>
  </>
}

type ItemProps = {
  color: string
  label: string
  selected: boolean
  onClick: () => unknown
}
function Item(props: ItemProps) { 
  return <>
    <VStack
      className={classNames(s.item, props.selected && s.selected)}
      align='center' gap={4} width='fit-content'
      onClick={props.onClick}
    >
      <div
        className={s.dot}
        style={{ background: props.color }}
      >{
        props.selected && <Icon icon={IconName.Check} size={18} />
      }</div>
      <span>{props.label}</span>
    </VStack>
  </>
}
