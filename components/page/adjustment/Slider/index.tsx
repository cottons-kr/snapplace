'use client'

import { VStack } from '@cottons-kr/react-foundation'
import { AdjustmentActionType, AdjustmentContext, AdjustMentData } from '@/lib/contexts/adjustment'
import { useContext } from 'react'
import AdjustmentControlSlider from './Slider'

import s from './style.module.scss'

export default function AdjustmentControl() {
  const { data, dispatch } = useContext(AdjustmentContext)
  const targetData = data.adjustments[data.currentId]

  const updateValue = (key: keyof AdjustMentData, value: number) => {
    dispatch({
      type: AdjustmentActionType.UPDATE_ADJUSTMENT,
      payload: {
        id: data.currentId,
        data: { [key]: value },
      }
    })
  }

  return <>
    <VStack className={s.control} gap={35}>
      <AdjustmentControlSlider
        label='노출' value={targetData?.brightness ?? 50}
        onValueChange={value => updateValue('brightness', value)}
      />
      <AdjustmentControlSlider
        label='대비' value={targetData?.contrast ?? 50}
        onValueChange={value => updateValue('contrast', value)}
      />
      <AdjustmentControlSlider
        label='명조' value={targetData?.brightnessContrast ?? 50}
        onValueChange={value => updateValue('brightnessContrast', value)}
      />
      <AdjustmentControlSlider
        label='채도' value={targetData?.saturation ?? 50}
        sliderClassName={s.saturation}
        onValueChange={value => updateValue('saturation', value)}
      />
      <AdjustmentControlSlider
        label='색온도' value={targetData?.temperature ?? 50}
        sliderClassName={s.temperature}
        onValueChange={value => updateValue('temperature', value)}
      />
    </VStack>
  </>
}
