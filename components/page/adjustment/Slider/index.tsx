'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import { AdjustmentActionType, AdjustmentContext, AdjustMentData } from '@/lib/contexts/adjustment'
import { useCallback, useContext, useMemo } from 'react'
import AdjustmentControlSlider from './Slider'

import s from './style.module.scss'

export default function AdjustmentControl() {
  const { data, dispatch } = useContext(AdjustmentContext)
  const targetData = useMemo(() => data.adjustments[data.currentId], [data.adjustments, data.currentId])

  const updateValue = useCallback((key: keyof AdjustMentData, value: number) => {
    dispatch({
      type: AdjustmentActionType.UPDATE_ADJUSTMENT,
      payload: {
        id: data.currentId,
        data: {
          ...targetData,
          [key]: value,
        }
      }
    })
  }, [targetData, data.currentId, dispatch])

  return <>
    <VStack className={s.control} gap={35}>
      <AdjustmentControlSlider
        label='노출' value={targetData.brightness}
        onValueChange={value => updateValue('brightness', value)}
      />
      <AdjustmentControlSlider
        label='대비' value={targetData.contrast}
        onValueChange={value => updateValue('contrast', value)}
      />
      <AdjustmentControlSlider
        label='명조' value={targetData.brightnessContrast}
        onValueChange={value => updateValue('brightnessContrast', value)}
      />
      <AdjustmentControlSlider
        label='채도' value={targetData.saturation}
        sliderClassName={s.saturation}
        onValueChange={value => updateValue('saturation', value)}
      />
      <AdjustmentControlSlider
        label='색온도' value={targetData.temperature}
        sliderClassName={s.temperature}
        onValueChange={value => updateValue('temperature', value)}
      />
    </VStack>
  </>
}
