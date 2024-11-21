import classNames from 'classnames'

import s from './style.module.scss'

type SkeletonProps = {
  width?: string
  height?: string
  className?: string
}
export default function Skeleton(props: SkeletonProps) {
  return <>
    <div
      className={classNames(s.skeleton, props.className)}
      style={{
        width: props.width,
        height: props.height
      }}
    />
  </>
}
