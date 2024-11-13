import { AdjustMentData } from '@/lib/contexts/adjustment'
import { z } from 'zod'

export class CreateHistory {
  title: string
  content: string
  files: Array<File>
  assetAdjustments: Record<string, AdjustMentData>
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
  files: z.array(z.instanceof(File)),
  assetAdjustments: z.record(z.object({
    brightness: z.number(),
    contrast: z.number(),
    brightnessContrast: z.number(),
    saturation: z.number(),
    temperature: z.number(),
  })),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  friends: z.array(z.string().uuid()),
  private: z.boolean(),
  isFourCut: z.boolean()
})
