'use server'

import { auth } from '../auth'
import { AdjustMentData } from '../contexts/adjustment'
import { prisma } from '../prisma'

export async function setImageAdjustment(data: Array<AdjustMentData>) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const assetUUIDs = data.map(({ assetUUID }) => assetUUID)
  const updated = await prisma.userAsset

  return updated
}
