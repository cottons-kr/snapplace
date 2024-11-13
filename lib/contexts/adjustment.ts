import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'

export type AdjustMentData = {
  brightness: number
  contrast: number
  brightnessContrast: number
  saturation: number
  temperature: number
}

export type AdjustmentContextType = {
  currentIndex: number
  currentId: string
  assets: Array<File>
  adjustments: Record<string, AdjustMentData & { path: string }>
}

export const initialAdjustmentContext: AdjustmentContextType = {
  currentIndex: 0,
  currentId: '',
  assets: [],
  adjustments: {}
}

export enum AdjustmentActionType {
  SET_CURRENT_INDEX = 'currentIndex',
  SET_CURRENT_ID = 'currentId',
  SET_ASSETS = 'assets',
  SET_ADJUSTMENTS = 'adjustments',
  UPDATE_ADJUSTMENT = 'updateAdjustment',
  REMOVE_ADJUSTMENT = 'removeAdjustment'
}

type AdjustmentPayload = {
  [AdjustmentActionType.SET_CURRENT_INDEX]: number
  [AdjustmentActionType.SET_CURRENT_ID]: string
  [AdjustmentActionType.SET_ASSETS]: Array<File>
  [AdjustmentActionType.SET_ADJUSTMENTS]: Record<string, AdjustMentData & { path: string }>
  [AdjustmentActionType.UPDATE_ADJUSTMENT]: {
    id: string
    data: AdjustMentData
  }
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
    case AdjustmentActionType.SET_CURRENT_ID:
    case AdjustmentActionType.SET_ASSETS:
    case AdjustmentActionType.SET_ADJUSTMENTS:
      return { ...state, [type]: payload }

    case AdjustmentActionType.UPDATE_ADJUSTMENT: {
      const { id, data } = payload
      const adjustments = { ...state.adjustments }
      adjustments[id] = { ...adjustments[id], ...data }
      return { ...state, adjustments }
    }

    case AdjustmentActionType.REMOVE_ADJUSTMENT: {
      const adjustments = { ...state.adjustments }
      delete adjustments[payload]
      return { ...state, adjustments }
    }

    default:
      return state
  }
}

export const AdjustmentContext = createContext({} as {
  data: AdjustmentContextType
  dispatch: Dispatch<AdjustmentReducerAction>
})
