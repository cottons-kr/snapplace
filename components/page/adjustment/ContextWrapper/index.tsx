'use client'

import { AdjustmentContext, adjustmentReducer, initialAdjustmentContext } from '@/lib/contexts/adjustment'
import { UserAsset } from '@prisma/client'
import { ReactNode, useReducer } from 'react'

type AdjustmentContextWrapperProps = {
  assets: Array<UserAsset>
  children?: ReactNode
}
export default function AdjustmentContextWrapper(props: AdjustmentContextWrapperProps) {
  const [adjustmentData, setAdjustmentData] = useReducer(adjustmentReducer, {
    ...initialAdjustmentContext,
    adjustments: props.assets.map(asset => ({
      assetUUID: asset.uuid,
      path: asset.path,
      brightness: asset.brightness,
      contrast: asset.contrast,
      brightnessContrast: asset.brightnessContrast,
      saturation: asset.saturation,
      temperature: asset.temperature,
    })),
  })

  return <>
    <AdjustmentContext.Provider value={{
      data: adjustmentData,
      dispatch: setAdjustmentData,
    }}>{props.children}</AdjustmentContext.Provider>
  </>
}
