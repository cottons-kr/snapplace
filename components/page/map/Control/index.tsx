'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import BottomSheet from '@/components/ui/BottomSheet'
import { useToggle } from '@/hooks/useToggle'
import Link from 'next/link'
import { useMap } from '@vis.gl/react-google-maps'
import { useCallback } from 'react'
import { getCurrentPosition } from '@/lib/location'

import s from './style.module.scss'

export default function MapControl() {
  const bottomSheetToggle = useToggle()
  const map = useMap()

  const onClickCenter = useCallback(async () => {
    const { coords } = await getCurrentPosition()
    if (coords) {
      map?.moveCamera({
        center: { lat: coords.latitude, lng: coords.longitude },
        zoom: 16,
      })
    }
  }, [map])

  return <>
    <HStack className={s.container} align='center' justify='space-between'>
      <div className={s.button} onClick={onClickCenter}>
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
