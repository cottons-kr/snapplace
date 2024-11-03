import { nanoid } from 'nanoid'

export function blobToFile(blob: Blob): File {
  return new File([blob], nanoid(), { type: blob.type.split(';')[0] })
}
