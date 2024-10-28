import { VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import HomeNewHistory from '@/components/page/home/New'
import LocationHeader from '@/components/ui/Header/Location'

export default function IndexPage() {
  return <>
    <VStack gap={36}>
      <LocationHeader />
      <Viewport>
        <HomeNewHistory />
      </Viewport>
    </VStack>
  </>
}
