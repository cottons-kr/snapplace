import Navigation from '@/components/ui/Navigation'
import { ILayoutProps } from '@/types/props'
import { VStack } from '@/components/layout/Flex/Stack'

import s from './layout.module.scss'

export default function AppLayout(props: ILayoutProps) {
  return <>
    <VStack className={s.layout}>
      <Navigation />
      {props.children}
    </VStack>
  </>
}
