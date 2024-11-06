'use client'

import classNames from 'classnames'

import s from './style.module.scss'

type AdjustmentControlSliderProps = {
  label: string
  value: number // 0 ~ 100
  sliderClassName?: string

  onValueChange: (value: number) => unknown
}
export default function AdjustmentControlSlider(props: AdjustmentControlSliderProps) {  
  return <>
    <div
      className={s.container}
    >
      <p className={s.label}>{props.label}</p>
      <input
        type='range'
        className={classNames(s.slider, props.sliderClassName)}
        min={0} max={100}
        value={props.value}
        onChange={e => props.onValueChange(parseInt(e.target.value))}
      />
    </div>
  </>
}
