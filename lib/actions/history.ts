'use server'

import { validateFormDataAndParse } from '@/utils/validator'
import { CreateHistorySchema } from '../schemas/history/CreateHistory.dto'
import { auth } from '../auth'
import { uploadFile } from '@/utils/minio'
import { prisma } from '../prisma'

export async function getNearbyHistories(latitude: number, longitude: number) {
  const isProd = process.env.NODE_ENV === 'production'
  const allowedDistance = isProd ? 0.01 : 1
  const histories = await prisma.history.findMany({
    where: {
      latitude: {
        gte: latitude - allowedDistance,
        lte: latitude + allowedDistance,
      },
      longitude: {
        gte: longitude - allowedDistance,
        lte: longitude + allowedDistance,
      },
      completed: true,
    },
    include: {
      images: true,
      likes: true,
      friends: true,
      owner: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return histories || []
}

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
      friends: true,
      owner: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return histories || []
}

export async function getJoinedHistories() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const histories = await prisma.history.findMany({
    where: {
      friends: { some: { email: session.user.email } },
      completed: true,
    },
    include: {
      images: true,
      likes: true,
      friends: true,
      owner: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return histories || []
}

export async function getHistory(uuid: string) {
  const history = await prisma.history.findUnique({
    where: { uuid },
    include: {
      images: true,
      likes: true,
      friends: true,
      owner: true,
    },
  })

  return history || null
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
  for (const file of data.files) {
    const path = await uploadFile(file)
    const adjustment = data.assetAdjustments[file.name.split('.')[0]]
    const { uuid: assetUUID } = await prisma.userAsset.create({
      data: {
        path,
        owners: {
          connect: { email: session.user.email }
        },
        brightness: adjustment?.brightness ?? 50,
        contrast: adjustment?.contrast ?? 50,
        brightnessContrast: adjustment?.brightnessContrast ?? 50,
        saturation: adjustment?.saturation ?? 50,
        temperature: adjustment?.temperature ?? 50,
        isFourCut: data.isFourCut,
      },
      select: { uuid: true }
    })
    assetUUIDs.push(assetUUID)
  }

  return await prisma.history.create({ data: {
    title: data.title,
    content: data.content,
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
