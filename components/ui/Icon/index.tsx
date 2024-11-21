'use client'

import classNames from 'classnames'
import { IconName } from './shared'
import localFont from 'next/font/local'

const materialSymbolsOutlined = localFont({
  src: '../../../public/fonts/material-symbols-outlined.woff2',
  display: 'swap',
})
const materialSymbolsFilled = localFont({
  src: '../../../public/fonts/material-symbols-filled.woff2',
  display: 'swap',
})

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
          props.fill ? materialSymbolsFilled.className : materialSymbolsOutlined.className,
        )}
        style={{
          fontSize: props.size,
          color: props.color,
          userSelect: 'none',
          cursor: props.onClick ? 'pointer' : 'inherit',
          flexShrink: 0,
        }}
        onClick={props.onClick}
      >
        {props.icon}
      </span>
    </>
  )
}
