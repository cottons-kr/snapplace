'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import { Account, History, Like, UserAsset } from '@prisma/client'
import BottomSheet from '../BottomSheet'
import HistoryDetailSlide from './Slide'
import { VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
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
      <VStack height='calc(100dvh - 64px - 100px)'>
        <HistoryDetailSlide assets={props.history.images} />
        <Viewport direction='column' height='100%'>
          <HistoryDetailContent data={props.history} />
        </Viewport>
      </VStack>
    </BottomSheet>
  </>
}
