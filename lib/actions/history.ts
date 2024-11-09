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

  const assetUUIDs: Array<string> = []
  for (const asset of data.assets) {
    const path = await uploadFile(asset)
    const { uuid: assetUUID } = await prisma.userAsset.create({
      data: {
        path,
        owners: {
          connect: { email: session.user.email }
        }
      },
      select: { uuid: true }
    })
    assetUUIDs.push(assetUUID)
  }

  return await prisma.history.create({ data: {
    locationName: data.locationName,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    images: {
      connect: assetUUIDs.map(uuid => ({ uuid }))
    },
    owner: {
      connect: { email: session.user.email }
    }
  } })
}

export async function completeHistory(historyId: string, data: UploadContextType) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return await prisma.history.update({
    where: {
      uuid: historyId,
      owner: { email: session.user.email }
    },
    data: {
      title: data.title,
      content: data.content,
      private: data.private,
      friends: {
        connect: data.friends.map(({ email }) => ({ email }))
      },
      completed: true
    }
  })
}
