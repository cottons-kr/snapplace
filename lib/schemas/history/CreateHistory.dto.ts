import { z } from 'zod'

export class CreateHistory {
  assets: Array<File>
  locationName: string
  latitude: number
  longitude: number
  isFourCut?: boolean
}

export const CreateHistorySchema = z.object({
  assets: z.array(z.instanceof(File)),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  isFourCut: z.boolean().optional()
})
