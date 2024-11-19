'use server'

import { RegisterAccountContextType } from '../contexts/register-account'
import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'
import { auth, signIn } from '@/lib/auth'
import { validateFormDataAndParse } from '@/utils/validator'
import { UpdateAccountSchema } from '../schemas/account/UpdateAccount.dto'
import { uploadFile } from '@/utils/minio'
import { changeFileName } from '@/utils/file'
import { nanoid } from 'nanoid'

export async function login(id: string, password: string) {
  await signIn('credentials', { id, password })
}

export async function registerAccount(data: RegisterAccountContextType) {
  await prisma.account.create({ data: {
    id: data.id,
    nickname: data.nickname,
    password: await bcrypt.hash(data.password, 10),
    email: data.email,
  } })
}

export async function isRegisteredEmail(email: string) {
  return await prisma.account.count({ where: { email } }) > 0
}

export async function updateAccount(formData: FormData) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const targetAccount = await prisma.account.findUnique({
    where: { id: session.user.id }
  })
  if (!targetAccount) {
    throw new Error('Account not found')
  }

  const data = validateFormDataAndParse(formData, UpdateAccountSchema)

  const isPasswordMatched = await bcrypt.compare(data.password, targetAccount.password)
  if (!isPasswordMatched) {
    throw new Error('Password is not matched')
  }

  let avatar: string | undefined = undefined
  if (data.profileImage) {
    const newFile = changeFileName(data.profileImage, nanoid())
    avatar = await uploadFile(newFile)
  }

  await prisma.account.update({
    where: { id: session.user.id },
    data: {
      id: data.id,
      nickname: data.nickname,
      email: data.email,
      avatar,
    },
  })

  await signIn('credentials', {
    id: data.id || session.user.id,
    password: data.password,
    redirectTo: '/settings/account',
  })
}
