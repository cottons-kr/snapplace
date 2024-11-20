'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '../auth'
import { prisma } from '../prisma'
import { FriendRequestStatus } from '@prisma/client'

export async function getFriends() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const me = await prisma.account.findUnique({
    where: { email: session.user.email },
    include: {
      friends: true,
      symmetricalFriends: true,
    }
  })
  if (!me) {
    throw new Error('User not found')
  }

  return me.friends
}

export async function getFriendRequests() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return await prisma.friendRequest.findMany({
    where: {
      requestTo: session.user.uuid,
      status: FriendRequestStatus.READY,
    },
    include: {
      from: true,
      to: true,
    },
  })
}

export async function sendFriendRequest(userId: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const target = await prisma.account.findUnique({
    where: { id: userId }
  })
  if (!target) {
    throw new Error('User not found')
  }

  await prisma.friendRequest.create({
    data: {
      requestFrom: session.user.uuid,
      requestTo: target.uuid,
    }
  })

  revalidatePath('/settings/friends')
}

export async function acceptFriendRequest(uuid: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const request = await prisma.friendRequest.findUnique({
    where: { uuid },
    include: {
      from: true,
      to: true,
    },
  })
  if (!request) {
    throw new Error('Friend request not found')
  }
  if (request.requestTo !== session.user.uuid) {
    throw new Error('Unauthorized')
  }

  await prisma.$transaction([
    prisma.account.update({
      where: { id: request.from.id },
      data: {
        friends: {
          connect: { id: request.to.id },
        },
      },
    }),
    prisma.account.update({
      where: { id: request.to.id },
      data: {
        friends: {
          connect: { id: request.from.id },
        },
      },
    }),
    prisma.friendRequest.update({
      where: { uuid },
      data: { status: FriendRequestStatus.ACCEPTED },
    }),
  ])

  revalidatePath('/settings/friends')
}

export async function rejectFriendRequest(uuid: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const request = await prisma.friendRequest.findUnique({
    where: { uuid },
    include: {
      from: true,
      to: true,
    },
  })
  if (!request) {
    throw new Error('Friend request not found')
  }
  if (request.requestTo !== session.user.uuid) {
    throw new Error('Unauthorized')
  }

  await prisma.friendRequest.update({
    where: { uuid },
    data: { status: FriendRequestStatus.REJECTED },
  })

  revalidatePath('/settings/friends')
}
