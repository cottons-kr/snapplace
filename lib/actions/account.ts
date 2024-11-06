'use server'

import { RegisterAccountContextType } from '../contexts/register-account'
import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'
import { signIn } from '@/lib/auth'

export async function login(email: string, password: string) {
  await signIn('credentials', {
    email, password,
    redirectTo: '/',
  })
}

export async function registerAccount(data: RegisterAccountContextType) {
  await prisma.account.create({ data: {
    nickname: data.nickname,
    password: await bcrypt.hash(data.password, 10),
    email: data.email,
  } })
}

export async function isRegisteredEmail(email: string) {
  return await prisma.account.count({ where: { email } }) > 0
}
