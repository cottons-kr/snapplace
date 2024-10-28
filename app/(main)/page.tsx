import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import LocationHeader from '@/components/ui/Header/Location'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import Left from '@/assets/left.svg'
import Right from '@/assets/right.svg'
import Image from 'next/image'

import s from './page.module.scss'

export default function IndexPage() {
  return <>
    <VStack gap={36}>
      <LocationHeader />
      <Viewport>
        <HStack className={s.new}>
          <Image src={Left} alt='left' />
          <VStack
            align='center' justify='center'
            gap={4}
            height='125px'
          >
            <Icon icon={IconName.PhotoCamera} size={34} />
            <span>추억 남기기</span>
          </VStack>
          <Image src={Right} alt='right' />
        </HStack>
      </Viewport>
    </VStack>
  </>
}
