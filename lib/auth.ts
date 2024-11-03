import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
    }
  }
}

const signInSchema = z.object({
  email: z.string({ required_error: '이메일를 입력해주세요' })
    .email('이메일 형식이 올바르지 않습니다')
    .min(1, '이메일을 입력해주세요'),
  password: z.string({ required_error: '비밀번호를 입력해주세요' })
    .min(1, '비밀번호를 입력해주세요')
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async credentials => {
        const { email, password } = signInSchema.parse(credentials)

        const targetAccount = await prisma.account.findUnique({ where: { email } })
        if (!targetAccount) {
          return null
        }

        const isPasswordMatched = await bcrypt.compare(password, targetAccount.password)
        if (!isPasswordMatched) {
          return null
        }

        return targetAccount
      },
    }),
  ],
})
