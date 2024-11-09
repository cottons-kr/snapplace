import { useCallback, useEffect, useState } from 'react'
import { CustomFetchFunction, FetcherStatus } from './shared'

export function useFetcher<T>(url: string, custom?: CustomFetchFunction<T>) {
  const [status, setStatus] = useState(FetcherStatus.LOADING)
  const [data, setData] = useState<T | null>(null)

  const processEffect = useCallback(async () => {
    try {
      let data: T | null = null

      if (custom) {
        data = await custom()
      } else {
        const res = await fetch(url)
        data = await res.json()
      }

      setData(data)
      setStatus(FetcherStatus.SUCCESS)
    } catch (e) {
      setStatus(FetcherStatus.ERROR)
    }
  }, [url])

  useEffect(() => {
    processEffect()
  }, [processEffect])

  return { status, data }
}
