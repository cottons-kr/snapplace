'use client'

import { useCallback, useState } from 'react'
import { Flex } from '@cottons-kr/react-foundation'
import previewStyle from '../Preview/style.module.scss'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { FileStorage } from '@/lib/storage'
import { domToBlob } from 'modern-screenshot'

import s from './style.module.scss'

export default function FrameSubmit() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const onClick = useCallback(async () => {
    const preview = document.querySelector<HTMLDivElement>(`.${previewStyle.frame}`)
    if (!preview) {
      return alert('사진 저장에 실패했습니다.')
    }

    setIsProcessing(true)

    const blob = await domToBlob(preview)
    if (!blob) {
      setIsProcessing(false)
      return alert('사진 저장에 실패했습니다.')
    }

    const id = nanoid()
    const image = new File([blob], `${id}.png`, { type: 'image/png' })

    const fileStorage = new FileStorage()
    await fileStorage.init()
    await fileStorage.clearAll()
    await fileStorage.saveFile(id, image)
    localStorage.setItem('selected', JSON.stringify([id]))

    router.push('/upload')
  }, [])

  return <>
    <Flex className={s.submit} fullWidth>
      <button className={isProcessing ? s.loading : ''} onClick={onClick}>{
        isProcessing ? <span /> : '완료'
      }</button>
    </Flex>
  </>
}
