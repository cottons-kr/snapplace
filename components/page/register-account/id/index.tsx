import { VStack } from '@/components/layout/Flex/Stack'
import AnimatedPage from '@/components/ui/AnimatedPage'
import { useContext } from 'react'
import { RegisterAccountActionType as ActionType, RegisterAccountContext } from '@/lib/contexts/register-account'

import s from './style.module.scss'

export default function RegisterAccountID() {
  const { data, dispatch } = useContext(RegisterAccountContext)

  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 사용할<br />
          아이디를 입력해주세요
        </h1>
        <input
          className='sp-textfield'
          placeholder='영문, 숫자 포함 5~12자'
          value={data.id}
          onChange={e => dispatch({ type: ActionType.SET_ID, payload: e.target.value })}
          autoComplete='off'
        />
      </VStack>
    </AnimatedPage>
  </>
}
