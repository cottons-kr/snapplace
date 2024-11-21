import { SetStateAction } from 'jotai'
import { createContext, Dispatch } from 'react'

export const TabContext = createContext({} as {
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
})
