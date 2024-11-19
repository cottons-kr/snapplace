'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { Account, History, Like, UserAsset } from '@prisma/client'
import BottomSheet from '../BottomSheet'
import HistoryDetailSlide from './Slide'
import { VStack, Viewport } from '@cottons-kr/react-foundation'
import HistoryDetailContent from './Content'

type HistoryDetailProps = {
  history: History & {
    images: Array<UserAsset>
    likes: Array<Like>
    friends: Array<Account>
  }
  provider: ToggleProvider
}
export default function HistoryDetail(props: HistoryDetailProps) {
  return <>
    <BottomSheet
      darker fullSize noBackground noBlur
      duration={0.42}
      provider={props.provider}
    >
      <VStack
        style={{ height: 'calc(100dvh - 64px - 27px - (24px + var(--min-top)) * 2)' }}
      >
        <HistoryDetailSlide
          assets={props.history.images}
        />
        <Viewport direction='column' fullHeight>
          <HistoryDetailContent data={props.history} />
        </Viewport>
      </VStack>
    </BottomSheet>
  </>
}
