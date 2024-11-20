'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { Account, History, Like, UserAsset } from '@prisma/client'
import BottomSheet from '../BottomSheet'
import HistoryDetailSlide from './Slide'
import { VStack, Viewport } from '@cottons-kr/react-foundation'
import HistoryDetailContent from './Content'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getHistory } from '@/lib/actions/history'

type HistoryDetailProps = {
  history: History & {
    images: Array<UserAsset>
    likes: Array<Like>
    friends: Array<Account>
    owner: Account
  }
  provider: ToggleProvider
}
export default function HistoryDetail(props: HistoryDetailProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<HistoryDetailProps['history']>(props.history)

  useEffect(() => {
    getHistory(props.history.uuid).then(result => setData(result ?? props.history))
  }, [props.history, props.provider.isOpen])

  return session && <>
    <BottomSheet
      darker fullSize noBackground noBlur
      duration={0.42}
      provider={props.provider}
    >
      <VStack
        style={{ height: 'calc(100dvh - 64px - 27px - (24px + var(--min-top)) * 2)' }}
      >
        <HistoryDetailSlide
          assets={data.images}
        />
        <Viewport direction='column' fullHeight>
          <HistoryDetailContent
            data={data}
            session={session}
          />
        </Viewport>
      </VStack>
    </BottomSheet>
  </>
}
