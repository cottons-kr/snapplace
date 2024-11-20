import { getNearbyHistories } from '@/lib/actions/history'

export type GroupedHistory = {
  histories: Awaited<ReturnType<typeof getNearbyHistories>>
  latitude: number
  longitude: number
}
