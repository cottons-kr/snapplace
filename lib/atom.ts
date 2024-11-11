import { atom } from 'jotai'

export const locationAtom = atom<{
  latitude: number
  longitude: number
  locationName: string
  isReady: boolean
}>({
  latitude: 0,
  longitude: 0,
  locationName: '로딩중',
  isReady: false
})
