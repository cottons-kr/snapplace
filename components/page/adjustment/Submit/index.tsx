'use client'

import { Flex } from '@cottons-kr/react-foundation'
import { useCallback, useContext } from 'react'
import { AdjustmentContext } from '@/lib/contexts/adjustment'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

export default function AdjustmentSubmit() {
  const { data } = useContext(AdjustmentContext)
  const router = useRouter()

  const onClickNext = useCallback(async () => {
    try {
      const isFourCut = localStorage.getItem('fourCut') === 'true'
      localStorage.setItem('adjustments', JSON.stringify(data.adjustments))
      router.replace(isFourCut ? '/camera/frame' : '/upload')
    } catch (err) {
      console.error(err)
      alert('에러가 발생했습니다. 다시 시도해주세요.')
    }
  }, [data])

  return <>
    <Flex className={s.submit} fullWidth>
      <button onClick={onClickNext}>다음</button>
    </Flex>
  </>
}
