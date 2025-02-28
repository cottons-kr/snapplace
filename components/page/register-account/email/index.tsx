'use client'

import { VStack } from '@cottons-kr/react-foundation'
import { useContext } from 'react'
import { RegisterAccountActionType as ActionType, RegisterAccountContext } from '@/lib/contexts/register-account'
import AnimatedPage from '@/components/ui/AnimatedPage'

import s from './style.module.scss'

export default function RegisterAccountEmail() {
  const { data, dispatch } = useContext(RegisterAccountContext)

  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 사용할<br />
          이메일을 입력해주세요
        </h1>
        <input
          type='email'
          className='sp-textfield'
          placeholder='ex) sunrin@gmail.com'
          value={data.email}
          onChange={e => dispatch({ type: ActionType.SET_EMAIL, payload: e.target.value })}
        />
      </VStack>
    </AnimatedPage>
  </>
}
