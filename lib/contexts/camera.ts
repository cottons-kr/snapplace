import { ActionMap } from '@/types/context'
import { createContext, Dispatch } from 'react'

export enum CameraMode {
  PHOTO = 'photo',
  VIDEO = 'video',
  FOUR_CUT = 'fourCut',
}

export type CameraContextType = {
  mode: CameraMode
  isCameraOn: boolean
  isFlashOn: boolean
  isFrontCamera: boolean
  isRecording: boolean
  isTakingFourCut: boolean
  isRotating: boolean
  mediaStream: MediaStream | null
  savedContent: Array<Blob>

  MAX_COUNT: number
  SHOW_FRONT_FLASHLIGHT: boolean
}

export const initialCameraContext: CameraContextType = {
  mode: CameraMode.PHOTO,
  isCameraOn: false,
  isFlashOn: false,
  isFrontCamera: false,
  isRecording: false,
  isTakingFourCut: false,
  isRotating: false,
  mediaStream: null,
  savedContent: [],

  MAX_COUNT: 10,
  SHOW_FRONT_FLASHLIGHT: false,
}

export enum CameraActionType {
  SET_MODE = 'mode',
  SET_CAMERA_ON = 'isCameraOn',
  SET_FLASH_ON = 'isFlashOn',
  SET_FRONT_CAMERA = 'isFrontCamera',
  SET_RECORDING = 'isRecording',
  SET_TAKING_FOUR_CUT = 'isTakingFourCut',
  SET_ROTATING = 'isRotating',
  SET_MEDIA_STREAM = 'mediaStream',
  SET_SAVED_CONTENT = 'savedContent',
  SET_MAX_COUNT = 'MAX_COUNT',
  SET_SHOW_FRONT_FLASHLIGHT = 'SHOW_FRONT_FLASHLIGHT',
}

type CameraPayload = {
  [CameraActionType.SET_MODE]: CameraMode
  [CameraActionType.SET_CAMERA_ON]: boolean
  [CameraActionType.SET_FLASH_ON]: boolean
  [CameraActionType.SET_FRONT_CAMERA]: boolean
  [CameraActionType.SET_RECORDING]: boolean
  [CameraActionType.SET_TAKING_FOUR_CUT]: boolean
  [CameraActionType.SET_ROTATING]: boolean
  [CameraActionType.SET_MEDIA_STREAM]: MediaStream | null
  [CameraActionType.SET_SAVED_CONTENT]: Array<Blob>
  [CameraActionType.SET_MAX_COUNT]: number
  [CameraActionType.SET_SHOW_FRONT_FLASHLIGHT]: boolean
}

export type CameraReducerAction = ActionMap<CameraPayload>[keyof ActionMap<CameraPayload>]

export function cameraReducer(state: CameraContextType, action: CameraReducerAction): CameraContextType {
  const { type, payload } = action
  return { ...state, [type]: payload }
}

export const CameraContext = createContext({} as {
  data: CameraContextType
  dispatch: Dispatch<CameraReducerAction>
})
