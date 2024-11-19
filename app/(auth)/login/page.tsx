'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import Link from 'next/link'
import { login } from '@/lib/actions/account'
import { useRouter } from 'next/navigation'

import s from './page.module.scss'

export default function LoginPage() {
  const router = useRouter()

  const submit = async (formData: FormData) => {
    const id = formData.get('id')
    const password = formData.get('password')
    if (!id || !password) {
      return
    }

    try {
      await login(id.toString(), password.toString())
    } catch (err) {
      if (err instanceof Error && err.message !== 'NEXT_REDIRECT') {
        console.error(err)
        alert('이메일 혹은 비밀번호가 일치하지 않습니다.')
        return
      }
      router.replace('/')
    }
  }

  return <>
    <VStack
      className={s.page} justify='between'
      style={{ height: '100dvh' }}
    >
      <h1 className={s.title}>로그인</h1>

      <form className={s.form} action={submit}>
        <label>
          <span>아이디</span>
          <input type='text' placeholder='아이디를 입력해주세요' name='id' />
        </label>
        <label>
          <span>비밀번호</span>
          <input type='password' placeholder='영문, 숫자, 특수문자 포함 6~12자' name='password' />
        </label>
        <button type='submit'>로그인</button>
      </form>

      <VStack className={s.bottom} align='center' gap={12}>
        <span>아이디 혹은 비밀번호 찾기</span>
        <HStack
          align='center' gap={6}
          style={{ width: 'fit-content' }}
        >
          <span>계정이 없으신가요?</span>
          <Link href='/register'>
            <span>회원가입</span>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  </>
}
