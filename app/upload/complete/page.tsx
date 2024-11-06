import { VStack } from '@/components/layout/Flex/Stack'
import CardFileBox from '@/assets/card-file-box.svg'
import Image from 'next/image'
import Link from 'next/link'

import s from './page.module.scss'

export default function UploadCompletePage() {
  return <>
    <VStack align='center' height='100%'>
      <VStack className={s.container} align='center' justify='space-between' height='100%'>
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
