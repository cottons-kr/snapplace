import { VStack } from '@/components/layout/Flex/Stack'
import AnimatedPage from '@/components/ui/AnimatedPage'

import s from './style.module.scss'

export default function RegisterAccountPassword() {
  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 사용할<br />
          비밀번호을 입력해주세요
        </h1>
        <VStack gap={16}>
          <input
            className='sp-textfield'
            placeholder='비밀번호 (6~12자리, 특수문자 포함)'
          />
          <input
            className='sp-textfield'
            placeholder='비밀번호를 다시 입력해주세요'
          />
        </VStack>
      </VStack>
    </AnimatedPage>
  </>
}
