export async function getCurrentPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export async function getLocationName() {
  const position = await getCurrentPosition()
  const { latitude, longitude } = position.coords
  const geocoder = new kakao.maps.services.Geocoder()

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
