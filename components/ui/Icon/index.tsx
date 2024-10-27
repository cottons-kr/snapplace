'use client'

import classNames from 'classnames'
import { IconName } from './shared'

type IconProps = {
  icon: IconName
  size?: number
  color?: string
  className?: string
  onClick?: () => unknown
}
export default function Icon(props: IconProps) {
  return (
    <>
      <span
        className={classNames(props.className, 'material-symbols-outlined')}
        style={{
          fontSize: props.size,
          color: props.color,
          userSelect: 'none',
          cursor: props.onClick ? 'pointer' : 'inherit',
        }}
        onClick={props.onClick}
      >
        {props.icon}
      </span>
    </>
  )
}
