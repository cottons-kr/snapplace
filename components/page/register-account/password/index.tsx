import { VStack } from '@/components/layout/Flex/Stack'
import AnimatedPage from '@/components/ui/AnimatedPage'
import { useContext, useMemo } from 'react'
import { RegisterAccountActionType as ActionType, RegisterAccountContext } from '@/lib/contexts/register-account'

import s from './style.module.scss'

export default function RegisterAccountPassword() {
  const { data, dispatch } = useContext(RegisterAccountContext)
  const isPasswordMismatch = useMemo(() => data.password !== data.confirmPassword, [data.password, data.confirmPassword])

  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 사용할<br />
          비밀번호을 입력해주세요
        </h1>
        <VStack gap={16}>
          <input
            type='password'
            className='sp-textfield'
            placeholder='비밀번호 (6~12자리, 특수문자 포함)'
            value={data.password}
            onChange={e => dispatch({ type: ActionType.SET_PASSWORD, payload: e.target.value })}
          />
          <input
            type='password'
            className='sp-textfield'
            placeholder='비밀번호를 다시 입력해주세요'
            value={data.confirmPassword}
            onChange={e => dispatch({ type: ActionType.SET_CONFIRM_PASSWORD, payload: e.target.value })}
          />
          {isPasswordMismatch && (
            <p className={s.warn}>*비밀번호를 확인해주세요</p>
          )}
        </VStack>
      </VStack>
    </AnimatedPage>
  </>
}
