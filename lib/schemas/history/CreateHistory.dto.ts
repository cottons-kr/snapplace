import { AdjustMentData } from '@/lib/contexts/adjustment'
import { z } from 'zod'

export class CreateHistory {
  title: string
  content: string
  assets: Array<File>
  assetAdjustments: Array<Omit<AdjustMentData, 'path'>>
  locationName: string
  latitude: number
  longitude: number
  friends: Array<string>
  private: boolean
  isFourCut: boolean
}

export const CreateHistorySchema = z.object({
  title: z.string(),
  content: z.string(),
  assets: z.array(z.instanceof(File)),
  assetAdjustments: z.array(z.object({
    brightness: z.number(),
    contrast: z.number(),
    brightnessContrast: z.number(),
    saturation: z.number(),
    temperature: z.number()
  })),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  friends: z.array(z.string().uuid()),
  private: z.boolean(),
  isFourCut: z.boolean()
})
