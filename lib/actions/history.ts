'use server'

import { validateFormDataAndParse } from '@/utils/validator'
import { CreateHistorySchema } from '../schemas/history/CreateHistory.dto'
import { auth } from '../auth'
import { uploadFile } from '@/utils/minio'
import { prisma } from '../prisma'
import { UploadContextType } from '../contexts/upload'

export async function getMyHistories() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const histories = await prisma.history.findMany({
    where: {
      owner: { email: session.user.email },
      completed: true
    },
    include: {
      images: true,
      likes: true,
      friends: true
    },
  })

  return histories || []
}

export async function getVisibleHistories() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const histories = await prisma.history.findMany({
    where: {},
    include: { images: true },
  })

  return histories || []
}

export async function createHistory(formData: FormData) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const data = validateFormDataAndParse(formData, CreateHistorySchema)
  if (data.isFourCut && data.files.length !== 1) {
    throw new Error('FourCut must have only one image')
  }

  const assetUUIDs: Array<string> = []
  for (let i = 0; i < data.files.length; i++) {
    const path = await uploadFile(data.files[i])
    const adjustment = data.assetAdjustments[i]
    const { uuid: assetUUID } = await prisma.userAsset.create({
      data: {
        path,
        owners: {
          connect: { email: session.user.email }
        },
        ...adjustment,
        isFourCut: data.isFourCut,
      },
      select: { uuid: true }
    })
    assetUUIDs.push(assetUUID)
  }

  return await prisma.history.create({ data: {
    title: data.title,
    locationName: data.locationName,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    private: data.private,
    completed: true,
    images: {
      connect: assetUUIDs.map(uuid => ({ uuid }))
    },
    friends: {
      connect: data.friends.map(uuid => ({ uuid }))
    },
    owner: {
      connect: { email: session.user.email }
    },
  } })
}
