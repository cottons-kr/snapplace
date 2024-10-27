'use server'

import { RegisterAccountContextType } from '../contexts/register-account'
import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'

export async function registerAccount(data: RegisterAccountContextType) {
  await prisma.account.create({ data: {
    nickname: data.nickname,
    password: await bcrypt.hash(data.password, 10),
    email: data.email,
  } })
}
