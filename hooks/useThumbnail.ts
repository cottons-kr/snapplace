import { urlToFile } from '@/utils/common'
import { isVideoExtension, getVideoThumbnail } from '@/utils/file'
import { useEffect, useState } from 'react'

export function useThumbnail(path: string) {
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  useEffect(() => {
    if (isVideoExtension(path.split('.').pop() || '')) {
      getVideoThumbnail(path).then(thumbnail => {
        setThumbnail(thumbnail)
      })
    } else {
      urlToFile(path).then(file => {
        const url = URL.createObjectURL(file)
        setThumbnail(url)
        return () => URL.revokeObjectURL(url)
      })
    }
  }, [path])

  return thumbnail
}
