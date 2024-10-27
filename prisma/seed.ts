import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.account.create({ data: {
    nickname: 'testuser',
    password: await bcrypt.hash('test1234!', 10),
    email: 'test@example.com',
  } })
  console.log('✅ Test Account created')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
