import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.account.create({ data: {
    nickname: 'testuser',
    password: 'test1234!',
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
