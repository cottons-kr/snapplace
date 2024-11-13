'use client'

import { VStack } from '@/components/layout/Flex/Stack'
import UploadForm from '@/components/page/upload/Form'
import UploadPreview from '@/components/page/upload/Preview'
import UploadSubmit from '@/components/page/upload/Submit'
import { uploadReducer, initialUploadContext, UploadContext, UploadActionType } from '@/lib/contexts/upload'
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { FileStorage } from '@/lib/storage'

import s from './page.module.scss'

export default function UploadPage() {
  const [uploadData, setUploadData] = useReducer(uploadReducer, initialUploadContext)
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
        setUploadData({
        type: UploadActionType.SET_ASSETS,
        payload: files.map(f => ({
          path: URL.createObjectURL(f),
          brightness: 0,
          contrast: 0,
          brightnessContrast: 0,
          saturation: 0,
          temperature: 0,
        }))
      })
    })
  }, [])

  return <>
    <UploadContext.Provider value={{
      data: uploadData,
      dispatch: setUploadData,
    }}>
      <VStack className={s.page} gap={12} height='100%'>
        <UploadPreview />
        <UploadForm />
        <UploadSubmit />
      </VStack>
    </UploadContext.Provider>
  </>
}
