import { ReactNode } from 'react'

type ViewportProps = {
  direction?: 'row' | 'column' | 'all'
  width?: string
  height?: string
  className?: string
  children?: ReactNode
}
export default function Viewport(props: ViewportProps) {
  return <>
    <div
      className={props.className}
      style={{
        width: props.width,
        height: props.height,
        overflowX: props.direction === 'row' ? 'auto' : 'hidden',
        overflowY: props.direction === 'column' ? 'auto' : 'hidden',
      }}
    >{props.children}</div>
  </>
}
