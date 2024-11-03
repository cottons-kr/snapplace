import { z } from 'zod'

export class CreateHistory {
  assets: Array<File>
  locationName: string
  latitude: number
  longitude: number
}

export const CreateHistorySchema = z.object({
  assets: z.array(z.instanceof(File)),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})
