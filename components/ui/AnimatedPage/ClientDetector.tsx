'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import s from './style.module.scss'

type AnimatedPageClientDetectorProps = {
  className: string
  transform: string
  children?: ReactNode
}
export default function AnimatedPageClientDetector(props: AnimatedPageClientDetectorProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (spanRef.current?.parentElement) {
      spanRef.current.parentElement.style.opacity = '1'
      spanRef.current.parentElement.style.transform = ''
      window.scrollTo(0, 0)
      setIsAnimated(true)
    }
  }, [spanRef.current])

  useEffect(() => {
    if (spanRef.current?.parentElement && !isAnimated) {
      spanRef.current.parentElement.style.opacity = '0'
      spanRef.current.parentElement.style.transform = props.transform

      setTimeout(() => {
        if (spanRef.current?.parentElement) {
          spanRef.current.parentElement.style.opacity = '1'
          spanRef.current.parentElement.style.transform = ''
          window.scrollTo(0, 0)
        }
      }, 10)
    }
  }, [props.children, spanRef.current, props.transform])

  return <span
    className={s.detector}
    ref={spanRef}
  />
}
