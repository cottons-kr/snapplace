'use client'

import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
import Flex from '@/components/layout/Flex'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { useContext } from 'react'
import { Swiper } from 'swiper'

import s from './style.module.scss'

type AdjustmentPreviewControlProps = {
  swiper: Swiper | null
}
export default function AdjustmentPreviewControl(props: AdjustmentPreviewControlProps) {
  const { data } = useContext(AdjustmentContext)

  const onClickBack = () => {
    props.swiper?.slidePrev()
  }

  const onClickForward = () => {
    props.swiper?.slideNext()
  }

  return <>
    <HStack className={s.control} align='center' justify='space-between'>
      <Icon icon={IconName.ArrowBackIosNew} onClick={onClickBack} />

      <Flex
        className={s.counter}
        width='60px' height='24px'
        align='center' justify='center'
      >{data.currentIndex + 1} / {data.adjustments.length}</Flex>

      <Icon icon={IconName.ArrowForwardIos} onClick={onClickForward} />
    </HStack>
  </>
}
