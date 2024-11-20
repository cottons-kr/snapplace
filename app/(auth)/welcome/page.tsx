import { HStack, VStack } from '@cottons-kr/react-foundation'
import Image from 'next/image'
import WelcomeTitle from '@/assets/welcome.svg'
import Link from 'next/link'

import s from './page.module.scss'

export default function WelcomePage() {
  return <>
    <VStack fullHeight align='end'>
      <VStack fullHeight align='center' justify='center'>
        <Image src={WelcomeTitle} alt='스냅플' />
      </VStack>
      <VStack className={s.bottom} align='center' gap={12}>
        <HStack fullWidth align='center' justify='center' gap={6}>
          <p>이미 계정이 있다면</p>
          <Link href='/login'>로그인하기</Link>
        </HStack>
      </VStack>
    </VStack>
  </>
}
