'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import Image from 'next/image'
import Left from '@/assets/left.svg'
import Right from '@/assets/right.svg'
import { useToggle } from '@/hooks/useToggle'
import BottomSheet from '@/components/ui/BottomSheet'
import Link from 'next/link'

import s from './style.module.scss'

export default function HomeNewHistory() {
  const bottomSheetToggle = useToggle()

  return <>
    <HStack className={s.new} onClick={bottomSheetToggle.open}>
      <Image src={Left} alt='left' />
      <VStack
        align='center' justify='center'
        gap={4}
        height='125px'
      >
        <Icon icon={IconName.PhotoCamera} size={34} />
        <span>추억 남기기</span>
      </VStack>
      <Image src={Right} alt='right' />
    </HStack>

    <BottomSheet darker provider={bottomSheetToggle}>
      <HStack className={s.options} gap={10}>
        <Link href='/camera'>
          <VStack className={s.option} align='center' justify='center'>
            <Icon icon={IconName.CenterFocusWeak} size={36} />
            <p>새로운 사진 찍기</p>
          </VStack>
        </Link>
        <VStack className={s.option} align='center' justify='center'>
          <Icon icon={IconName.GalleryThumbnail} size={36} />
          <p>기존 사진 업로드</p>
        </VStack>
      </HStack>
    </BottomSheet>
  </>
}
