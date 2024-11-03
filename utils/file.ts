import { nanoid } from 'nanoid'

export function blobToFile(blob: Blob): File {
  return new File([blob], nanoid(), { type: blob.type.split(';')[0] })
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
