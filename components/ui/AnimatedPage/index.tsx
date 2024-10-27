import { ReactNode } from 'react'
import classNames from 'classnames'
import ClientDetector from './ClientDetector'

import s from './style.module.scss'

type AnimatedPageProps = {
  width?: string
  height?: string
  scale?: number
  direction?: 'left' | 'right' | 'top' | 'bottom'
  show?: boolean
  children?: ReactNode
}
export default function AnimatedPage(props: AnimatedPageProps) {
  const direction = props.direction ?? 'right'
  const translateMode = 
    ['left', 'right'].includes(direction) ? 'x' :
    ['top', 'bottom'].includes(direction) ? 'y' : 'x'
  const scale = (props.scale ?? 50) * (direction === 'left' || direction === 'top' ? -1 : 1)
  const transform = `translate${translateMode.toUpperCase()}(${scale}px)`

  return <>
    <div
      className={classNames(s.page, s[direction])}
      style={{
        width: props.width ?? '100%',
        height: props.height ?? '100%',
        transform,
      }}
    >
      {props.children}
      {props.show !== false && (
        <ClientDetector
          className={s.page}
          transform={transform}
          children={props.children}
        />
      )}
    </div>
  </>
}
