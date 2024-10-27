'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import Goback from '@/components/ui/Goback'
import { initialRegisterAccountContext, RegisterAccountContext, registerAccountReducer } from '@/lib/contexts/register-account'
import { useReducer } from 'react'
import Viewport from '@/components/layout/Viewport'

import s from './style.module.scss'

export default function RegisterPage() {
  const [registerAccountData, setRegisterAccountData] = useReducer(registerAccountReducer, initialRegisterAccountContext)

  return <>
    <RegisterAccountContext.Provider value={{
      data: registerAccountData,
      dispatch: setRegisterAccountData
    }}>
      <VStack>
        <Goback />
        <Viewport className={s.content}>{
          
        }</Viewport>
      </VStack>
    </RegisterAccountContext.Provider>
  </>
}
