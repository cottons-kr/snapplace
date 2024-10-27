'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import Goback from '@/components/ui/Goback'
import { initialRegisterAccountContext, RegisterAccountActionType as ActionType, RegisterAccountContext, registerAccountReducer } from '@/lib/contexts/register-account'
import { useCallback, useReducer } from 'react'
import RegisterAccountEmail from '@/components/page/register-account/email'
import RegisterAccountFriend from '@/components/page/register-account/friend'
import RegisterAccountNickname from '@/components/page/register-account/nickname'
import RegisterAccountPassword from '@/components/page/register-account/password'
import Flex from '@/components/layout/Flex'
import RegisterAccountComplete from '@/components/page/register-account/complete/page'

import s from './style.module.scss'

export default function RegisterAccountPage() {
  const [registerAccountData, setRegisterAccountData] = useReducer(registerAccountReducer, initialRegisterAccountContext)

  const next = useCallback(() => {
    setRegisterAccountData({ type: ActionType.SET_STEP, payload: registerAccountData.step + 1 })
  }, [registerAccountData.step])

  const submit = useCallback(async () => {
    console.log('submit', registerAccountData)
  }, [registerAccountData])

  const onClickNext = useCallback(async () => {
    if (registerAccountData.step === 4) {
      await submit()
      setRegisterAccountData({ type: ActionType.SET_STEP, payload: 5})
    } else {
      next()
    }
  }, [registerAccountData])
  
  return <>
    <RegisterAccountContext.Provider value={{
      data: registerAccountData,
      dispatch: setRegisterAccountData
    }}>
      <VStack>
        <Goback />
        <Flex className={s.content} height='100%'>{
          registerAccountData.step === 1 ? <RegisterAccountEmail /> :
          registerAccountData.step === 2 ? <RegisterAccountNickname /> :
          registerAccountData.step === 3 ? <RegisterAccountPassword /> :
          registerAccountData.step === 4 ? <RegisterAccountFriend /> :
          registerAccountData.step === 5 ? <RegisterAccountComplete /> :
          null
        }</Flex>
        <button className={s.button} onClick={onClickNext}>{
          registerAccountData.step === 5 ? '완료' : '다음'
        }</button>
      </VStack>
    </RegisterAccountContext.Provider>
  </>
}
