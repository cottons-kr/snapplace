import NextAuth from 'next-auth'
import 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      uuid: string
      id: string
      nickname: string
      email: string
      avatar: string
    }
  }

  interface User {
    uuid: string
    nickname: string
    avatar: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uuid: string
    id: string
    nickname: string
    email: string
    avatar: string
  }
}

const signInSchema = z.object({
  id: z.string({ required_error: '아이디를 입력해주세요' })
    .min(1, '아이디를 입력해주세요'),
  password: z.string({ required_error: '비밀번호를 입력해주세요' })
    .min(1, '비밀번호를 입력해주세요')
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async credentials => {
        const { id, password } = signInSchema.parse(credentials)

        const targetAccount = await prisma.account.findUnique({ where: { id } })
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
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          ...token,
        }
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          uuid: user.uuid,
          id: user.id || '',
          nickname: user.nickname,
          email: user.email || '',
          avatar: user.avatar,
        }
      }
      return token
    }
  },
})
