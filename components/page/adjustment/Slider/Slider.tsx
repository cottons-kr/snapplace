'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'

import s from './style.module.scss'

type AdjustmentControlSliderProps = {
  label: string
  value: number // 0 ~ 100
  sliderClassName?: string

  onValueChange: (value: number) => unknown
}
export default function AdjustmentControlSlider(props: AdjustmentControlSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  const updateValue = (clientX: number) => {
    if (sliderContainerRef.current) {
      const rect = sliderContainerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const containerWidth = sliderContainerRef.current.offsetWidth
      let newValue = Math.round((x / containerWidth) * 100)
      newValue = Math.min(Math.max(newValue, 0), 100)
      props.onValueChange(newValue)
    }
  }

  const handleMouseMove = useCallback((clientX: number) => {
    if (isDragging) {
      updateValue(clientX)
    }
  }, [isDragging, updateValue])

  const handleMouseDown = useCallback((clientX: number) => {
    setIsDragging(true)
    updateValue(clientX)
  }, [updateValue])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => handleMouseMove(e.clientX)
    const touchHandler = (e: TouchEvent) => handleMouseMove(e.touches[0].clientX)

    document.addEventListener('mousemove', mouseHandler)
    document.addEventListener('touchmove', touchHandler)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', mouseHandler)
      document.removeEventListener('touchmove', touchHandler)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])
  
  return <>
    <div
      ref={sliderContainerRef} className={s.container}
      onMouseDown={e => handleMouseDown(e.clientX)}
      onTouchStart={e => handleMouseDown(e.touches[0].clientX)}
    >
      <p className={s.label}>{props.label}</p>
      <HStack className={classNames(s.bar, props.sliderClassName)} width='calc(100% - 24px)' height='5px'>
        <span
          className={s.dot}
          style={{ left: `calc(${props.value}% - 6.5px)` }}
        />
      </HStack>
    </div>
  </>
}
