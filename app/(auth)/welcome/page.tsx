import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Image from 'next/image'
import WelcomeTitle from '@/assets/welcome.svg'
import Link from 'next/link'

import s from './page.module.scss'

export default function WelcomePage() {
  return <>
    <VStack align='flex-end' height='100%'>
      <VStack align='center' justify='center' height='100%'>
        <Image src={WelcomeTitle} alt='스냅플' />
      </VStack>
      <VStack className={s.bottom} align='center' gap={12}>
        <HStack align='center' gap={6} width='fit-content'>
          <p>이미 계정이 있다면면</p>
          <Link href='/login'>로그인하기</Link>
        </HStack>
      </VStack>
    </VStack>
  </>
}
