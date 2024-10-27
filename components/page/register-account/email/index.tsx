import { VStack } from '@/components/layout/Flex/Stack'

import s from './style.module.scss'

export default function RegisterAccountEmail() {
  return <>
    <VStack className={s.page} gap={34}>
      <h1>
        스냅플에서 사용할<br />
        이메일을 입력해주세요
      </h1>
      <input
        className='sp-textfield'
        placeholder='ex) sunrin@gmail.com'
      />
    </VStack>
  </>
}
