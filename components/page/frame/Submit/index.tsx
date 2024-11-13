'use client'

import { useCallback, useState } from 'react'
import Flex from '@/components/layout/Flex'
import html2canvas from 'html2canvas'
import previewStyle from '../Preview/style.module.scss'
import { nanoid } from 'nanoid'
import { createHistory } from '@/lib/actions/history'
import { getCurrentPosition, getLocationName } from '@/lib/location'
import { CreateHistory } from '@/lib/schemas/history/CreateHistory.dto'
import { dataToFormData, inferPrefix } from '@/utils/validator'
import { useRouter } from 'next/navigation'
import { FileStorage } from '@/lib/storage'

import s from './style.module.scss'

export default function FrameSubmit() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const onClick = useCallback(async () => {
    const preview = document.querySelector<HTMLDivElement>(`.${previewStyle.frame}`)
    if (!preview) {
      return alert('사진 저장에 실패했습니다.')
    }
    const canvas = await html2canvas(preview)
    setIsProcessing(true)

    const data = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob))
    })
    if (!data) {
      setIsProcessing(false)
      return alert('사진 저장에 실패했습니다.')
    }

    const image = new File([data], `${nanoid()}.png`, { type: 'image/png' })
    const position = await getCurrentPosition()

    const formData = dataToFormData(inferPrefix({
      assets: [image],
      locationName: await getLocationName(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      isFourCut: true,
    } satisfies CreateHistory))

    try {
      const fileStorage = new FileStorage()
      await fileStorage.init()
      const history = await createHistory(formData)
      await fileStorage.clearAll()
      router.push(`/upload/${history.uuid}`)
    } catch (err) {
      console.error(err)
      alert('업로드에 실패했습니다.')
      setIsProcessing(false)
    }
  }, [])

  return <>
    <Flex className={s.submit}>
      <button onClick={onClick}>{
        isProcessing ? <span /> : '완료'
      }</button>
    </Flex>
  </>
}
