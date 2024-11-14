import { nanoid } from 'nanoid'

export function blobToFile(blob: Blob): File {
  return new File([blob], nanoid(), { type: blob.type })
}

export function getFileExtension(file: File): string {
  switch (file.type) {
    case 'image/jpeg': return 'jpg'
    case 'image/png': return 'png'
    case 'image/gif': return 'gif'
    case 'image/webp': return 'webp'
    case 'image/svg+xml': return 'svg'
    case 'image/bmp': return 'bmp'
    case 'image/tiff': return 'tiff'
    case 'image/x-icon': return 'ico'

    case 'video/mp4': return 'mp4'
    case 'video/webm': return 'webm'
    case 'video/ogg': return 'ogg'

    default: return ''
  }
}

export function changeFileName(file: File, newName: string): File {
  return new File([file], newName, { type: file.type })
}

export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video')
}

export function isVideoExtension(fileName: string): boolean {
  return ['mp4', 'webm', 'ogg'].includes(fileName.split('.').pop() || '')
}

export function extractFrameFromVideo(videoUrl: string): Promise<string> {
  const videoElement = document.createElement('video')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return Promise.reject('2d context is not supported')
  }

  return new Promise((resolve, reject) => {
      videoElement.src = videoUrl
      videoElement.crossOrigin = 'anonymous'
      
      videoElement.onloadeddata = () => {
          canvas.width = videoElement.videoWidth
          canvas.height = videoElement.videoHeight
          
          videoElement.currentTime = 0.1
      }

      videoElement.onseeked = () => {
        ctx.drawImage(videoElement, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        resolve(imageData)
      }

      videoElement.onerror = reject
  })
}

export async function getVideoThumbnail(videoUrl: string) {
  const thumbnail = await extractFrameFromVideo(videoUrl)
  return thumbnail
}
