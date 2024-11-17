type Position = {
  latitude: number
  longitude: number
}

export async function getCurrentPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export async function getLocationName(latitude?: number, longitude?: number) {
  const geocoder = new kakao.maps.services.Geocoder()
  if (!latitude || !longitude) {
    const position = await getCurrentPosition()
    latitude = position.coords.latitude
    longitude = position.coords.longitude
  }

  return new Promise<string>((resolve, reject) => {
    geocoder.coord2RegionCode(longitude, latitude, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address_name
        resolve(address)
      } else {
        reject('알 수 없음')
      }
    })
  })
}

export function getThresholdsByZoomLevel(zoomLevel: number = 16): [number, number] {
  const zoom = Math.min(Math.max(zoomLevel, 11), 18)
  
  switch (true) {
    case zoom <= 11:
      return [0.03, 0.03]
    case zoom <= 12:
      return [0.015, 0.015]
    case zoom <= 13:
      return [0.008, 0.008]
    case zoom <= 14:
      return [0.004, 0.004]
    case zoom <= 15:
      return [0.002, 0.002]
    case zoom <= 16:
      return [0.001, 0.001]
    case zoom <= 17:
      return [0.0005, 0.0005]
    default:
      return [0.0002, 0.0002]
  }
}

export function isWithinThreshold(reference: Position, target: Position, thresholds: [number, number]) {
  const [thresholdLatitude, thresholdLongitude] = thresholds
  return (
    Math.abs(reference.latitude - target.latitude) <= thresholdLatitude &&
    Math.abs(reference.longitude - target.longitude) <= thresholdLongitude
  )
}

export function getAveragePosition(positions: Array<Position>) {
  const latitude = positions.reduce((acc, p) => acc + p.latitude, 0) / positions.length
  const longitude = positions.reduce((acc, p) => acc + p.longitude, 0) / positions.length
  return { latitude, longitude }
}
