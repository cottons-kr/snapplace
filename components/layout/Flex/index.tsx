import { CSSProperties, HTMLAttributes, ReactNode, createElement } from 'react'
import { FlexItem } from './Item'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: number | [number, number]
  width?: string
  maxwidth?: string
  height?: string
  tag?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
function Flex(props: IProps) {
  const { direction, justify, align, gap, width, maxwidth, height, tag, className, style, children, ...rest } = props

  return createElement(
    tag || 'div',
    {
      ...rest,
      className,
      style: {
        width: width || '100%',
        maxWidth: maxwidth,
        height: height,
        display: 'flex',
        flexDirection: direction || 'row',
        justifyContent: justify || undefined,
        alignItems: align || undefined,
        flexWrap: props.wrap || 'nowrap',
        gap: typeof gap === 'number' ?
          `${gap}px` :
          typeof gap === 'undefined' ?
            undefined :
            gap.map((g) => `${g}px`).join(' '),
        cursor: rest.onClick ? 'pointer' : undefined,
        ...style,
      },
    },
    children
  )
}

Flex.Item = FlexItem

export default Flex
export type { IProps as IFlexProps }
