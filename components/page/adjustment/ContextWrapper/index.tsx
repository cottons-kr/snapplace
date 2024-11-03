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
      brightness: 0,
      contrast: 0,
      brightnessContrast: 0,
      saturation: 0,
      temperature: 0,
    })),
  })

  return <>
    <AdjustmentContext.Provider value={{
      data: adjustmentData,
      dispatch: setAdjustmentData,
    }}>{props.children}</AdjustmentContext.Provider>
  </>
}
