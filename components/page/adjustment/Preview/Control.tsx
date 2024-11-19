'use client'

import { HStack, Flex } from '@cottons-kr/react-foundation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'
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
    <HStack className={s.control} align='center' justify='between'>
      <Icon icon={IconName.ArrowBackIosNew} onClick={onClickBack} />

      <Flex
        className={s.counter}
        align='center' justify='center'
        style={{ width: '60px', height: '24px' }}
      >{data.currentIndex + 1} / {data.assets.length}</Flex>

      <Icon icon={IconName.ArrowForwardIos} onClick={onClickForward} />
    </HStack>
  </>
}
