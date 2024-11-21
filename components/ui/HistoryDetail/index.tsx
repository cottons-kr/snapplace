'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import BottomSheet from '../BottomSheet'
import HistoryDetailSlide from './Slide'
import { VStack, Viewport } from '@cottons-kr/react-foundation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getHistory } from '@/lib/actions/history'
import { DetailedHistory } from '@/components/page/map/Marker/Group'
import HistoryDetailContent from './Content'
import HistoryDetailSkeleton from './Skeleton'

type HistoryDetailProps = {
  uuid: string
  provider: ToggleProvider
}
export default function HistoryDetail(props: HistoryDetailProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<DetailedHistory | null>(null)

  useEffect(() => {
    if (props.provider.isOpen) {
      getHistory(props.uuid)
        .then(result => {
          if (result) {
            setData(result)
          }
        })
        .catch(console.error)
    }
  }, [props.uuid, props.provider.isOpen])

  return session && <>
    <BottomSheet
      darker fullSize noBackground noBlur
      duration={0.42}
      provider={props.provider}
    >
      <VStack
        style={{ height: 'calc(100dvh - 64px - 27px - (24px + var(--min-top)) * 2)' }}
      >{
        data ?
          <>
            <HistoryDetailSlide
              assets={data.images}
            />
            <Viewport direction='column' fullHeight>
              <HistoryDetailContent
                data={data}
                session={session}
              />
            </Viewport>
          </> :
          <HistoryDetailSkeleton />
      }</VStack>
    </BottomSheet>
  </>
}
