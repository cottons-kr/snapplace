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
  const result = await prisma.$transaction(assetUUIDs.map(uuid => {
    const targetData = data.find(({ assetUUID }) => assetUUID === uuid)
    if (!targetData) {
      throw new Error('Data not found')
    }
    return prisma.userAsset.update({
      where: { uuid },
      data: {
        brightness: targetData.brightness,
        contrast: targetData.contrast,
        brightnessContrast: targetData.brightnessContrast,
        saturation: targetData.saturation,
        temperature: targetData.temperature,
      },
    })
  }))

  return result
}
