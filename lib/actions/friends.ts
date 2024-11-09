'use server'

import { auth } from '../auth'
import { prisma } from '../prisma'

export async function getFriends() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const me = await prisma.account.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      friends: true
    }
  })
  if (!me) {
    throw new Error('User not found')
  }

  return me.friends
}
