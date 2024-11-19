import { VStack } from '@cottons-kr/react-foundation'
import AnimatedPage from '@/components/ui/AnimatedPage'
import CompleteText from '@/assets/complete.svg'
import CameraFlash from '@/assets/camera-flash.svg'

import s from './style.module.scss'
import Image from 'next/image'

export default function RegisterAccountComplete() {
  return <>
    <AnimatedPage>
      <VStack
        className={s.page}
        align='center' justify='center' gap={60}
        fullHeight
      >
        <h1>
          사용 준비가<br />
          모두 완료되었어요!
        </h1>
        <Image src={CompleteText} alt='이제 자신의 추억을 맘껏 남겨보세요!' />
        <Image src={CameraFlash} alt='카메라 플래시' />
      </VStack>
    </AnimatedPage>
  </>
}
