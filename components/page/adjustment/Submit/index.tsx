'use client'

import Flex from '@/components/layout/Flex'
import { useCallback, useContext } from 'react'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { setImageAdjustment } from '@/lib/actions/asset'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

type AdjustmentSubmitProps = {
  historyId: string
}
export default function AdjustmentSubmit(props: AdjustmentSubmitProps) {
  const { data } = useContext(AdjustmentContext)
  const router = useRouter()

  const onClickNext = useCallback(async () => {
    await setImageAdjustment(data.adjustments)
    router.push(`/upload/${props.historyId}`)
  }, [data])

  return <>
    <Flex className={s.submit}>
      <button onClick={onClickNext}>다음</button>
    </Flex>
  </>
}
