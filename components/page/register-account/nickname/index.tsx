import { VStack } from '@/components/layout/Flex/Stack'
import AnimatedPage from '@/components/ui/AnimatedPage'

import s from './style.module.scss'

export default function RegisterAccountNickname() {
  return <>
    <AnimatedPage>
      <VStack className={s.page} gap={34}>
        <h1>
          스냅플에서 사용할<br />
          닉네임을 입력해주세요
        </h1>
        <input
          className='sp-textfield'
          placeholder='닉네임을 입력해주세요'
        />
      </VStack>
    </AnimatedPage>
  </>
}
