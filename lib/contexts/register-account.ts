import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'

export type RegisterAccountContextType = {
  step: number
  id: string
  email: string
  nickname: string
  password: string
  confirmPassword: string
  friendNickname: string
}

export const initialRegisterAccountContext: RegisterAccountContextType = {
  step: 1,
  id: '',
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  friendNickname: '',
}

export enum RegisterAccountActionType {
  SET_STEP = 'step',
  SET_ID = 'id',
  SET_EMAIL = 'email',
  SET_NICKNAME = 'nickname',
  SET_PASSWORD = 'password',
  SET_CONFIRM_PASSWORD = 'confirmPassword',
  SET_FRIEND_NICKNAME = 'friendNickname',
}

type RegisterAccountPayload = {
  [RegisterAccountActionType.SET_STEP]: number
  [RegisterAccountActionType.SET_ID]: string
  [RegisterAccountActionType.SET_EMAIL]: string
  [RegisterAccountActionType.SET_NICKNAME]: string
  [RegisterAccountActionType.SET_PASSWORD]: string
  [RegisterAccountActionType.SET_CONFIRM_PASSWORD]: string
  [RegisterAccountActionType.SET_FRIEND_NICKNAME]: string
}

export type RegisterAccountReducerAction = ActionMap<RegisterAccountPayload>[keyof ActionMap<RegisterAccountPayload>]

export function registerAccountReducer(state: RegisterAccountContextType, action: RegisterAccountReducerAction): RegisterAccountContextType {
  const { type, payload } = action
  return { ...state, [type]: payload } 
}

export const RegisterAccountContext = createContext({} as {
  data: RegisterAccountContextType
  dispatch: Dispatch<RegisterAccountReducerAction>
})
