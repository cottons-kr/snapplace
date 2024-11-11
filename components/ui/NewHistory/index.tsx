'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import BottomSheet from '../BottomSheet'
import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Link from 'next/link'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'

import s from './style.module.scss'

type NewHistoryProps = {
  provider: ToggleProvider
}
export default function NewHistory(props: NewHistoryProps) {
  return <>
    <BottomSheet darker noBlur provider={props.provider}>
      <HStack className={s.options} gap={10}>
        <Link href='/camera'>
          <VStack className={s.option} align='center' justify='center'>
            <Icon icon={IconName.CenterFocusWeak} size={36} />
            <p>새로운 사진 찍기</p>
          </VStack>
        </Link>
        <VStack className={s.option} align='center' justify='center'>
          <Icon icon={IconName.GalleryThumbnail} size={36} />
          <p>기존 사진 업로드</p>
        </VStack>
      </HStack>
    </BottomSheet>
  </>
}
