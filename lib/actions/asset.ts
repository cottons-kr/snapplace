'use server'

import { auth } from '../auth'
import { AdjustMentData } from '../contexts/adjustment'
import { prisma } from '../prisma'

export async function setImageAdjustment(data: Array<AdjustMentData>) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const assetUUIDs = data.map(({ uuid }) => uuid)
  const result = await prisma.$transaction(assetUUIDs.map(assetUUID => {
    const targetData = data.find(({ uuid }) => uuid === assetUUID)
    if (!targetData) {
      throw new Error('Data not found')
    }
    return prisma.userAsset.update({
      where: { uuid: assetUUID },
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
