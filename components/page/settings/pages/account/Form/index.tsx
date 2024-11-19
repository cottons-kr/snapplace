'use client'

import { VStack } from '@cottons-kr/react-foundation'
import { Session } from 'next-auth'
import { useMemo, useState } from 'react'

import s from './style.module.scss'

type SettingsAccountFormProps = {
  session: Session
}
export default function SettingsAccountForm(props: SettingsAccountFormProps) {
  const [nickname, setNickname] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitDisabled = useMemo(() => {
    if (
      nickname.length > 0 ||
      id.length > 0 ||
      email.length > 0
    ) {
      if (password.length > 0) return false
    }
    return true
  }, [nickname, id, email, password])
  
  return <>
    <form className={s.form}>
      <VStack gap={20} fullHeight>
        <label>
          <span>닉네임</span>
          <input
            type='text' placeholder={props.session.user.nickname}
            value={nickname} onChange={e => setNickname(e.target.value)}
          />
        </label>
        <label>
          <span>아이디</span>
          <input
            type='text' placeholder={props.session.user.id}
            value={id} onChange={e => setId(e.target.value)}
          />
        </label>
        <label>
          <span>이메일</span>
          <input
            type='text' placeholder={props.session.user.email}
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>비밀번호</span>
          <input
            type='password' placeholder='적용을 위해선 비빌번호를 입력하세요'
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </label>
      </VStack>
      <button disabled={submitDisabled}>적용</button>
    </form>
  </>
}
