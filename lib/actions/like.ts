'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '../auth'
import { prisma } from '../prisma'

export async function addLike(historyUUID: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const target = await prisma.history.findUnique({
    where: { uuid: historyUUID },
    include: { likes: true },
  })
  if (!target) {
    throw new Error('Not found')
  }

  const isLiked = !!target.likes.find(f => f.accountUUID === session.user.uuid)

  if (!isLiked) {
    await prisma.like.create({
      data: {
        history: { connect: { uuid: historyUUID } },
        account: { connect: { uuid: session.user.uuid } },
      }
    })
  }

  revalidatePath('/map', 'layout')
}

export async function removeLike(historyUUID: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const target = await prisma.history.findUnique({
    where: { uuid: historyUUID },
    include: { likes: true },
  })
  if (!target) {
    throw new Error('Not found')
  }

  const isLiked = !!target.likes.find(f => f.accountUUID === session.user.uuid)
  if (isLiked) {
    await prisma.like.deleteMany({
      where: {
        historyUUID: historyUUID,
        accountUUID: session.user.uuid,
      }
    })
  }

  revalidatePath('/map', 'layout')
}
