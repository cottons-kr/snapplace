import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'
import { Account } from '@prisma/client'
import { AdjustMentData } from './adjustment'

export type UploadContextType = {
  title: string
  content: string
  assets: Array<AdjustMentData>
  files: Array<File>
  friends: Array<Account>
  private: boolean
  isFourCut: boolean
}

export const initialUploadContext: UploadContextType = {
  title: '',
  content: '',
  assets: [],
  files: [],
  friends: [],
  private: false,
  isFourCut: false,
}

export enum UploadActionType {
  SET_TITLE = 'title',
  SET_CONTENT = 'content',
  SET_ASSETS = 'assets',
  SET_FILES = 'files',
  SET_FRIENDS = 'friends',
  SET_PRIVATE = 'private',
  SET_IS_FOUR_CUT = 'isFourCut',
}

type UploadPayload = {
  [UploadActionType.SET_TITLE]: string
  [UploadActionType.SET_CONTENT]: string
  [UploadActionType.SET_ASSETS]: Array<AdjustMentData>
  [UploadActionType.SET_FILES]: Array<File>
  [UploadActionType.SET_FRIENDS]: Array<Account>
  [UploadActionType.SET_PRIVATE]: boolean
  [UploadActionType.SET_IS_FOUR_CUT]: boolean
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
