'use client'

import Flex from '@/components/layout/Flex'
import { useCallback, useContext } from 'react'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { setImageAdjustment } from '@/lib/actions/asset'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

export default function AdjustmentSubmit() {
  const { data } = useContext(AdjustmentContext)
  const router = useRouter()

  const onClickNext = useCallback(async () => {
    await setImageAdjustment(data.adjustments)
  }, [data])

  return <>
    <Flex className={s.submit}>
      <button onClick={onClickNext}>다음</button>
    </Flex>
  </>
}
