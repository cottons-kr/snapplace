import { VStack } from '@cottons-kr/react-foundation'
import CardFileBox from '@/assets/card-file-box.svg'
import Image from 'next/image'
import Link from 'next/link'

import s from './page.module.scss'

export default function UploadCompletePage() {
  return <>
    <VStack align='center' fullHeight>
      <VStack className={s.container} align='center' justify='between' fullHeight>
        <h1 className={s.title}>
          기록이<br />
          완료되었어요!
        </h1>
        <Image src={CardFileBox} alt='card-file-box' width={180} height={180} />
      </VStack>
      <Link className={s.button} href='/'>완료</Link>
    </VStack>
  </>
}
