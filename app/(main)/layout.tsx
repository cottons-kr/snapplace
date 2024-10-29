import Navigation from '@/components/ui/Navigation'
import { ILayoutProps } from '@/types/props'
import { VStack } from '@/components/layout/Flex/Stack'

export default function AppLayout(props: ILayoutProps) {
  return <>
    <VStack>
      <Navigation />
      {props.children}
    </VStack>
  </>
}
