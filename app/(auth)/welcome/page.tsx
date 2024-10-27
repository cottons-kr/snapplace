import { VStack } from '@/components/layout/Flex/Stack'
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
        <Link href='/register'>
          <p>이메일로 가입하기</p>
        </Link>
        <p>아이디 혹은 비밀번호 찾기</p>
      </VStack>
    </VStack>
  </>
}
