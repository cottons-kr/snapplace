'use server'

import { validateFormDataAndParse } from '@/utils/validator'
import { CreateHistorySchema } from '../schemas/history/CreateHistory.dto'
import { auth } from '../auth'

export async function uploadAssets(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const data = validateFormDataAndParse(formData, CreateHistorySchema)

  console.log(data)
}
