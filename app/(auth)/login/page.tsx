'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Link from 'next/link'
import { login } from '@/lib/actions/account'

import s from './page.module.scss'

export default function LoginPage() {
  const submit = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
      return
    }

    try {
      await login(email.toString(), password.toString())
    } catch (err) {
      console.error(err)
      if (err instanceof Error && err.name !== 'NEXT_REDIRECT') {
        alert('이메일 혹은 비밀번호가 일치하지 않습니다.')
      }
    }
  }

  return <>
    <VStack className={s.page} justify='space-between' height='100dvh'>
      <h1 className={s.title}>로그인</h1>

      <form className={s.form} action={submit}>
        <label>
          <span>이메일</span>
          <input type='text' placeholder='이메일을 입력해주세요' name='email' />
        </label>
        <label>
          <span>비밀번호</span>
          <input type='password' placeholder='영문, 숫자, 특수문자 포함 6~12자' name='password' />
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