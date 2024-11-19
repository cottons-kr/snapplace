'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import { Session } from 'next-auth'
import { useEffect, useMemo, useState } from 'react'
import { Prefix, typedName } from '@/utils/validator'
import { UpdateAccount } from '@/lib/schemas/account/UpdateAccount.dto'
import { updateAccount } from '@/lib/actions/account'

import s from './style.module.scss'

type SettingsAccountFormProps = {
  session: Session
}
export default function SettingsAccountForm(props: SettingsAccountFormProps) {
  const [nickname, setNickname] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const submitDisabled = useMemo(() => {
    if (
      nickname.length > 0 ||
      id.length > 0 ||
      email.length > 0 ||
      avatarPreview
    ) {
      if (password.length > 0) return false
    }
    return true
  }, [nickname, id, email, avatarPreview, password])

  const onSubmit = async (formData: FormData) => {
    try {
      await updateAccount(formData)
      window.location.reload()
    } catch (err) {
      if (err instanceof Error && err.message !== 'NEXT_REDIRECT') {
        console.error(err)
        alert('오류가 발생했습니다')
        return
      }
      window.location.reload()
    } finally {
      setIsUpdating(false)
    }
  }

  const n = typedName<UpdateAccount>
  
  return <>
    <form className={s.form} action={onSubmit}>
      <VStack gap={20} fullHeight>
        <label>
          <span>닉네임</span>
          <input
            type='text' placeholder={props.session.user.nickname}
            value={nickname} onChange={e => setNickname(e.target.value)}
            name={n('nickname')}
          />
        </label>
        <label>
          <span>아이디</span>
          <input
            type='text' placeholder={props.session.user.id}
            value={id} onChange={e => setId(e.target.value)}
            name={n('id')}
          />
        </label>
        <label>
          <span>이메일</span>
          <input
            type='text' placeholder={props.session.user.email}
            value={email} onChange={e => setEmail(e.target.value)}
            name={n('email')}
          />
        </label>
        <label>
          <span>프로필 사진</span>
          <HStack className={s.file} align='center' gap={10}>
            {avatarPreview && <img src={avatarPreview} alt='프로필 사진 미리보기' />}
            <p>이미지를 선택해주세요</p>
          </HStack>
          <input
            type='file' accept='image/*' placeholder='프로필 사진을 선택하세요'
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = () => setAvatarPreview(reader.result as string)
                reader.readAsDataURL(file)
              }
            }}
            name={n('profileImage', Prefix.None)}
          />
        </label>
        <label>
          <span>비밀번호</span>
          <input
            type='password' placeholder='적용을 위해선 비빌번호를 입력하세요'
            value={password} onChange={e => setPassword(e.target.value)}
            name={n('password')}
          />
        </label>
      </VStack>
      <button
        className={isUpdating ? s.updating : ''}
        disabled={submitDisabled}
        onClick={() => {
          setIsUpdating(true)
        }}
      >{
        isUpdating ? <span /> : '적용'
      }</button>
    </form>
  </>
}
