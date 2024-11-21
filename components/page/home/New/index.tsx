'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import { useToggle } from '@/hooks/useToggle'
import NewHistory from '@/components/ui/NewHistory'

import s from './style.module.scss'

export default function HomeNewHistory() {
  const bottomSheetToggle = useToggle()

  return <>
    <HStack className={s.new} onClick={bottomSheetToggle.open}>
      <img src='/assets/left.svg' />
      <VStack
        align='center' justify='center' gap={4}
        style={{ height: '125px' }}
      >
        <Icon icon={IconName.PhotoCamera} size={34} />
        <span>추억 남기기</span>
      </VStack>
      <img src='/assets/right.svg' />
    </HStack>

    <NewHistory provider={bottomSheetToggle} />
  </>
}
