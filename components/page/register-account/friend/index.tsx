import AnimatedPage from '@/components/ui/AnimatedPage'
import { VStack } from '@/components/layout/Flex/Stack'
import { useContext } from 'react'
import { RegisterAccountActionType as ActionType, RegisterAccountContext } from '@/lib/contexts/register-account'

import s from './style.module.scss'

export default function RegisterAccountFriend() {
  const { data, dispatch } = useContext(RegisterAccountContext)
  
  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 함께 사용할<br />
          친구를 추가해보세요!
        </h1>
        <input
          className='sp-textfield'
          placeholder='친구 아이디를 입력해주세요'
        />
      </VStack>
    </AnimatedPage>
  </>
}
