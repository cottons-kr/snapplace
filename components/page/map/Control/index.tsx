'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import BottomSheet from '@/components/ui/BottomSheet'
import { useToggle } from '@/hooks/useToggle'
import Link from 'next/link'

import s from './style.module.scss'

export default function MapControl() {
  const bottomSheetToggle = useToggle()

  return <>
    <HStack className={s.container} align='center' justify='space-between'>
      <div className={s.button}>
        <Icon icon={IconName.LocationSearching} />
      </div>
      <div className={s.button} onClick={bottomSheetToggle.open}>
        <Icon icon={IconName.AddPhotoAlternate} />
      </div>
    </HStack>

    <BottomSheet provider={bottomSheetToggle}>
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
