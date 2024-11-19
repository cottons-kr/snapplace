'use client'

import { HStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useToggle } from '@/hooks/useToggle'
import { useMap } from '@vis.gl/react-google-maps'
import { useCallback } from 'react'
import { useLocation } from '@/hooks/useLocation'
import NewHistory from '@/components/ui/NewHistory'

import s from './style.module.scss'

export default function MapControl() {
  const bottomSheetToggle = useToggle()
  const map = useMap()
  const { latitude, longitude, isReady } = useLocation()

  const onClickCenter = useCallback(async () => {
    if (isReady) {
      map?.moveCamera({
        center: { lat: latitude, lng: longitude },
        zoom: 16,
      })
    }
  }, [map, isReady])

  return <>
    <HStack className={s.container} align='center' justify='between'>
      <div className={s.button} onClick={onClickCenter}>
        <Icon icon={IconName.LocationSearching} size={22} />
      </div>
      <div className={s.button} onClick={bottomSheetToggle.open}>
        <Icon icon={IconName.AddPhotoAlternate} size={22} />
      </div>
    </HStack>

    <NewHistory provider={bottomSheetToggle} />
  </>
}
