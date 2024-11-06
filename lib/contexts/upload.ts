import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'
import { Account } from '@prisma/client'

export type UploadContextType = {
  title: string
  content: string
  friends: Array<Account>
  private: boolean
}

export const initialUploadContext: UploadContextType = {
  title: '',
  content: '',
  friends: [],
  private: false,
}

export enum UploadActionType {
  SET_TITLE = 'title',
  SET_CONTENT = 'content',
  SET_FRIENDS = 'friends',
  SET_PRIVATE = 'private',
}

type UploadPayload = {
  [UploadActionType.SET_TITLE]: string
  [UploadActionType.SET_CONTENT]: string
  [UploadActionType.SET_FRIENDS]: Array<Account>
  [UploadActionType.SET_PRIVATE]: boolean
}

export type UploadReducerAction = ActionMap<UploadPayload>[keyof ActionMap<UploadPayload>]

export function uploadReducer(state: UploadContextType, action: UploadReducerAction): UploadContextType {
  const { type, payload } = action
  return { ...state, [type]: payload }
}

export const UploadContext = createContext({} as {
  data: UploadContextType
  dispatch: Dispatch<UploadReducerAction>
})
