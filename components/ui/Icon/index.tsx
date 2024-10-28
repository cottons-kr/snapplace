'use client'

import classNames from 'classnames'
import { IconName } from './shared'

type IconProps = {
  icon: IconName
  size?: number
  color?: string
  fill?: boolean
  className?: string
  onClick?: () => unknown
}
export default function Icon(props: IconProps) {
  return (
    <>
      <span
        className={classNames(
          props.className,
          'material-symbols-base',
          props.fill ? 'material-symbols-filled' : 'material-symbols-outlined',
        )}
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
