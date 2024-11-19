'use client'

import { VStack, Flex } from '@cottons-kr/react-foundation'
import Goback from '@/components/ui/Goback'
import { initialRegisterAccountContext, RegisterAccountActionType as ActionType, RegisterAccountContext, registerAccountReducer } from '@/lib/contexts/register-account'
import { useCallback, useReducer } from 'react'
import RegisterAccountEmail from '@/components/page/register-account/email'
import RegisterAccountID from '@/components/page/register-account/id'
import RegisterAccountFriend from '@/components/page/register-account/friend'
import RegisterAccountNickname from '@/components/page/register-account/nickname'
import RegisterAccountPassword from '@/components/page/register-account/password'
import RegisterAccountComplete from '@/components/page/register-account/complete/page'
import { isRegisteredEmail, registerAccount } from '@/lib/actions/account'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

export default function RegisterAccountPage() {
  const [registerAccountData, setRegisterAccountData] = useReducer(registerAccountReducer, initialRegisterAccountContext)
  const router = useRouter()

  const next = useCallback(() => {
    setRegisterAccountData({ type: ActionType.SET_STEP, payload: registerAccountData.step + 1 })
  }, [registerAccountData.step])

  const submit = useCallback(async () => {
    try {
      await registerAccount(registerAccountData)
      setRegisterAccountData({ type: ActionType.SET_STEP, payload: 6 })
    } catch (err) {
      console.error(err)
      alert('회원가입에 실패했습니다.')
    }
  }, [registerAccountData])

  const onClickNext = useCallback(async () => {
    if (
      registerAccountData.step === 1 &&
      await isRegisteredEmail(registerAccountData.email)
    ) {
      alert('이미 가입된 이메일입니다.')
      router.replace('/login')
      return
    }

    if (registerAccountData.step === 4 && registerAccountData.password !== registerAccountData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (registerAccountData.step === 6) {
      router.replace('/login')
      return
    }

    if (registerAccountData.step === 5) {
      await submit()
    } else {
      next()
    }
  }, [registerAccountData])

  const onClickPrev = useCallback(() => {
    if (registerAccountData.step === 1) {
      router.replace('/login')
      return
    }
    setRegisterAccountData({ type: ActionType.SET_STEP, payload: registerAccountData.step - 1 })
  }, [registerAccountData])
  
  return <>
    <RegisterAccountContext.Provider value={{
      data: registerAccountData,
      dispatch: setRegisterAccountData
    }}>
      <VStack className={s.page}>
        <Goback onClick={onClickPrev} />
        <Flex className={s.content} fullWidth fullHeight>{
          registerAccountData.step === 1 ? <RegisterAccountEmail /> :
          registerAccountData.step === 2 ? <RegisterAccountID /> :
          registerAccountData.step === 3 ? <RegisterAccountNickname /> :
          registerAccountData.step === 4 ? <RegisterAccountPassword /> :
          registerAccountData.step === 5 ? <RegisterAccountFriend /> :
          registerAccountData.step === 6 ? <RegisterAccountComplete /> :
          null
        }</Flex>
        <button className={s.button} onClick={onClickNext}>{
          registerAccountData.step === 5 ? '완료' : '다음'
        }</button>
      </VStack>
    </RegisterAccountContext.Provider>
  </>
}
