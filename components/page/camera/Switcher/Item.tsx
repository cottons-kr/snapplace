'use client'

import cn from 'classnames'
import s from './style.module.scss'

type CameraSwitcherItemProps = {
  label: string
  onClick: () => void
  isActive: boolean
}
export default function CameraSwitcherItem(props: CameraSwitcherItemProps) {
  return <>
    <span
      className={cn(s.item, { [s.active]: props.isActive })}
      onClick={props.onClick}
    >{props.label}</span>
  </>
}
