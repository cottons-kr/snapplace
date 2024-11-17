import { getMyHistories } from '@/lib/actions/history'

export type GroupedHistory = {
  histories: Awaited<ReturnType<typeof getMyHistories>>
  latitude: number
  longitude: number
}
