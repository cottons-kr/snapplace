import { locationAtom } from '@/lib/atom'
import { getCurrentPosition, getLocationName } from '@/lib/location'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

export function useLocation() {
  const [locationData, setLocationData] = useAtom(locationAtom)
  const valueToReturn = useMemo(() => ({
    latitude: locationData?.latitude || 0,
    longitude: locationData?.longitude || 0,
    locationName: locationData?.locationName || '로딩중',
    isReady: locationData.latitude !== 0 && locationData.longitude !== 0 && locationData.locationName !== '로딩중'
  }), [locationData])

  useEffect(() => {
    getCurrentPosition()
      .then(position => {
        console.log('Client Current Position:', position)
        setLocationData(prev => (
          prev ?
            {
              ...prev,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            } :
            prev
        ))
      })
    
    getLocationName().then(locationName => {
      console.log('Client Location Name:', locationName)
      setLocationData(prev => (
        prev ?
          { ...prev, locationName } :
          prev
      ))
    })
  }, [])

  return valueToReturn
}
