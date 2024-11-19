'use client'

import { VStack, Viewport } from '@cottons-kr/react-foundation'
import AdjustmentControl from '@/components/page/adjustment/Slider'
import AdjustmentPreview from '@/components/page/adjustment/Preview'
import AdjustmentSubmit from '@/components/page/adjustment/Submit'
import { useEffect, useReducer } from 'react'
import { AdjustmentActionType, AdjustmentContext, AdjustmentContextType, adjustmentReducer, initialAdjustmentContext } from '@/lib/contexts/adjustment'
import { FileStorage } from '@/lib/storage'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

export default function AdjustmentPage() {
  const [adjustmentData, setAdjustmentData] = useReducer(adjustmentReducer, initialAdjustmentContext)
  const router = useRouter()

  useEffect(() => {
    const selectedKeys: Array<string> = JSON.parse(localStorage.getItem('selected') || '[]')
    if (selectedKeys.length <= 0) {
      alert('선택된 이미지가 없습니다, 선택 페이지로 이동합니다.')
      router.replace('/camera/confirm')
      return
    }

    const fileStorage = new FileStorage()
    fileStorage.init().then(async () => {
      const files = await Promise.all(selectedKeys.map(k => fileStorage.getFile(k)))
        .then(files => files.filter(f => f !== null))

      setAdjustmentData({
        type: AdjustmentActionType.SET_ASSETS,
        payload: files,
      })
      setAdjustmentData({
        type: AdjustmentActionType.SET_CURRENT_ID,
        payload: files[0].name.split('.')[0],
      })
      setAdjustmentData({
        type: AdjustmentActionType.SET_ADJUSTMENTS,
        payload: files.reduce((acc, file) => {
          acc[file.name.split('.')[0]] = {
            path: URL.createObjectURL(file),
            brightness: 50,
            contrast: 50,
            brightnessContrast: 50,
            saturation: 50,
            temperature: 50,
          }
          return acc
        }, {} as AdjustmentContextType['adjustments'])
      })
    })
  }, [])

  return <>
    <AdjustmentContext.Provider value={{
      data: adjustmentData,
      dispatch: setAdjustmentData,
    }}>
      <VStack 
        className={s.page} gap={36}
        style={{ height: '100dvh' }}
      >
        <AdjustmentPreview />
        <Viewport fullHeight direction='column'>
          <AdjustmentControl />
        </Viewport>
        <AdjustmentSubmit />
      </VStack>
    </AdjustmentContext.Provider>
  </>
}
