import { VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import HomeNewHistory from '@/components/page/home/New'
import LocationHeader from '@/components/ui/Header/Location'

import s from './page.module.scss'

export default function IndexPage() {
  return <>
    <VStack className={s.page} gap={36}>
      <LocationHeader />
      <Viewport>
        <HomeNewHistory />
      </Viewport>
    </VStack>
  </>
}
