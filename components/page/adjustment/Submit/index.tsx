'use client'

import Flex from '@/components/layout/Flex'
import { useCallback, useContext } from 'react'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

export default function AdjustmentSubmit() {
  const { data } = useContext(AdjustmentContext)
  const router = useRouter()

  const onClickNext = useCallback(async () => {
    try {
      
    } catch (err) {
      console.error(err)
      alert('에러가 발생했습니다. 다시 시도해주세요.')
    }
  }, [data])

  return <>
    <Flex className={s.submit}>
      <button onClick={onClickNext}>다음</button>
    </Flex>
  </>
}
