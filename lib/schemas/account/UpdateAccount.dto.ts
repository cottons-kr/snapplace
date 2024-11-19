import { z } from 'zod'

export class UpdateAccount {
  id?: string
  nickname?: string
  email?: string
  password: string
  profileImage?: File
}

export const UpdateAccountSchema = z.object({
  id: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().optional(),
  password: z.string(),
  profileImage: z.instanceof(File).optional()
})
