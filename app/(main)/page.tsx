'use client'

import { Spacer, VStack, Viewport } from '@cottons-kr/react-foundation'
import HomeNewHistory from '@/components/page/home/New'
import LocationHeader from '@/components/ui/Header/Location'
import HomeList from '@/components/page/home/List'
import { useLocation } from '@/hooks/useLocation'
import { useEffect, useState } from 'react'
import { getNearbyHistories } from '@/lib/actions/history'
import { DetailedHistory } from '@/components/page/map/Marker/Group'

import s from './page.module.scss'

export default function IndexPage() {
  const location = useLocation()
  const [nearbyHistories, setNearbyHistories] = useState<Array<DetailedHistory> | null>(null)
  const [todayHistories, setTodayHistories] = useState([])

  useEffect(() => {
    if (location.isReady) {
      getNearbyHistories(location.latitude, location.longitude)
        .then(result => setNearbyHistories(result || []))
    }
  }, [location])

  return <>
    <VStack className={s.page} fullHeight gap={36}>
      <LocationHeader />
      <Viewport fullHeight direction='column'>
        <VStack gap={40}>
          <HomeNewHistory />
          <HomeList
            title='인근에서 찍은 사진'
            data={nearbyHistories}
          />
          <HomeList
            title='N년 전 오늘'
            data={todayHistories}
          />
          <Spacer height='100px' />
        </VStack>
      </Viewport>
    </VStack>
  </>
}
