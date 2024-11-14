export function arrayBufferToBase64(buffer: ArrayBuffer) {
  const uint8Array = new Uint8Array(buffer)

  let binary = ''
  for (let i = 0; i < uint8Array.byteLength; i++) {
    binary += String.fromCharCode(uint8Array[i])
  }

  return btoa(binary)
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function addSearchParams(url: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)
  const search = searchParams.toString()
  return `${url}${search ? `?${search}` : ''}`
}

export async function urlToFile(url: string) {
  const filename = url.split('/').pop() || 'image.png'

  const mimeTypes: Record<string, Array<string>> = {
    'image/png': ['png'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'image/svg+xml': ['svg'],
    'image/bmp': ['bmp'],
    'image/tiff': ['tiff', 'tif'],
    'video/mp4': ['mp4'],
    'video/webm': ['webm'],
  }

  const extension = (filename.split('.').pop() || 'png').toLowerCase()

  const mimeType = Object.keys(mimeTypes).find(type => 
    mimeTypes[type].includes(extension)
  ) || 'application/octet-stream'

  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], filename, { type: mimeType })
  
  return file
}

export function isDeepEqual<T>(obj1: T, obj2: T) {
  if (obj1 === obj2) return true
  
  if (obj1 === null || obj2 === null) return false
  
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false
    for (let i = 0; i < obj1.length; i++) {
      if (!isDeepEqual(obj1[i], obj2[i])) return false
    }
    return true
  }
  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false
  
  const keys1 = Object.keys(obj1) as Array<keyof T>
  const keys2 = Object.keys(obj2) as Array<keyof T>
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
      return false
    }
  }
  
  return true
}

export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item)) as T
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T
  }

  const copy = {} as T

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key as keyof T] = deepCopy(obj[key as keyof T])
    }
  }

  return copy
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: Array<K>) {
  const copy = { ...obj }
  keys.forEach(key => {
    delete copy[key]
  })
  return copy
}

export function isNumber(value: unknown): value is number {
  return !isNaN(Number(value))
}

export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
