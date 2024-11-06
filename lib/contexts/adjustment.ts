import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'

export type AdjustMentData = {
  uuid: string
  path: string
  brightness: number
  contrast: number
  brightnessContrast: number
  saturation: number
  temperature: number
}

export type AdjustmentContextType = {
  currentIndex: number
  adjustments: Array<AdjustMentData>
}

export const initialAdjustmentContext: AdjustmentContextType = {
  currentIndex: 0,
  adjustments: []
}

export enum AdjustmentActionType {
  SET_CURRENT_INDEX = 'currentIndex',
  SET_ADJUSTMENTS = 'adjustments',
  UPDATE_ADJUSTMENT = 'updateAdjustment',
  ADD_ADJUSTMENT = 'addAdjustment',
  REMOVE_ADJUSTMENT = 'removeAdjustment'
}

type AdjustmentPayload = {
  [AdjustmentActionType.SET_CURRENT_INDEX]: number
  [AdjustmentActionType.SET_ADJUSTMENTS]: Array<AdjustMentData>
  [AdjustmentActionType.UPDATE_ADJUSTMENT]: {
    index: number
    data: Partial<AdjustMentData>
  }
  [AdjustmentActionType.ADD_ADJUSTMENT]: AdjustMentData
  [AdjustmentActionType.REMOVE_ADJUSTMENT]: number
}

export type AdjustmentReducerAction = ActionMap<AdjustmentPayload>[keyof ActionMap<AdjustmentPayload>]

export function adjustmentReducer(
  state: AdjustmentContextType,
  action: AdjustmentReducerAction
): AdjustmentContextType {
  const { type, payload } = action

  switch (type) {
    case AdjustmentActionType.SET_CURRENT_INDEX:
    case AdjustmentActionType.SET_ADJUSTMENTS:
      return { ...state, [type]: payload }
    
    case AdjustmentActionType.UPDATE_ADJUSTMENT: {
      const newAdjustments = [...state.adjustments]
      newAdjustments[payload.index] = {
        ...newAdjustments[payload.index],
        ...payload.data
      }
      return {
        ...state,
        adjustments: newAdjustments
      }
    }

    case AdjustmentActionType.ADD_ADJUSTMENT:
      return {
        ...state,
        adjustments: [...state.adjustments, payload]
      }

    case AdjustmentActionType.REMOVE_ADJUSTMENT:
      return {
        ...state,
        adjustments: state.adjustments.filter((_, index) => index !== payload)
      }

    default:
      return state
  }
}

export const AdjustmentContext = createContext({} as {
  data: AdjustmentContextType
  dispatch: Dispatch<AdjustmentReducerAction>
})
