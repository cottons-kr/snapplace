import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Link from 'next/link'

import s from './page.module.scss'

export default function LoginPage() {
  return <>
    <VStack justify='space-between' height='100dvh'>
      <h1 className={s.title}>로그인</h1>

      <form className={s.form}>
        <label>
          <span>아이디</span>
          <input type='text' placeholder='아이디를 입력해주세요' />
        </label>
        <label>
          <span>비밀번호</span>
          <input type='text' placeholder='영문, 숫자, 특수문자 포함 6~12자' />
        </label>
        <button type='submit'>로그인</button>
      </form>

      <VStack className={s.bottom} align='center' gap={12}>
        <span>아이디 혹은 비밀번호 찾기</span>
        <HStack align='center' gap={6} width='fit-content'>
          <span>계정이 없으신가요?</span>
          <Link href='/register'>
            <span>회원가입</span>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  </>
}
