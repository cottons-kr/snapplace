'use client'

import { HStack, VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import ResultItem from '@/components/page/camera/ResultItem'
import { FileStorage } from '@/lib/storage'
import { useCallback, useEffect, useState } from 'react'
import Flex from '@/components/layout/Flex'
import { useRouter } from 'next/navigation'
import { createHistory } from '@/lib/actions/history'
import { getCurrentPosition, getLocationName } from '@/lib/location'
import { CreateHistory } from '@/lib/schemas/history/CreateHistory.dto'
import { dataToFormData, inferPrefix } from '@/utils/validator'

import s from './page.module.scss'
import { CameraMode } from '@/lib/contexts/camera'

export default function CameraConfirmPage() {
  const [results, setResults] = useState<Array<File>>([])
  const [selected, setSelected] = useState<Array<string>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isFourCut, setIsFourCut] = useState(false)
  const router = useRouter()

  const onClickRetake = useCallback(async () => {
    const fileStorage = new FileStorage()
    await fileStorage.init()
    await fileStorage.clearAll()
    router.push('/camera')
  }, [])

  const onClickNext = useCallback(async () => {
    setIsUploading(true)
    const selectedFiles = results.filter(f => selected.includes(f.name))
    const position = await getCurrentPosition()
    const fileStorage = new FileStorage()
    await fileStorage.init()

    const formData = dataToFormData(inferPrefix({
      assets: selectedFiles,
      locationName: await getLocationName(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } satisfies CreateHistory))

    try {
      const history = await createHistory(formData)
      await fileStorage.clearAll()
      router.push(`/adjustment/${history.uuid}`)
    } catch (err) {
      console.error(err)
      alert('업로드에 실패했습니다.')
      setIsUploading(false)
    }
  }, [results, selected])

  useEffect(() => {
    const isFourCut = localStorage.getItem(CameraMode.FOUR_CUT) === 'true'
    setIsFourCut(isFourCut)

    const fileStorage = new FileStorage()
    fileStorage.init().then(async () => {
      const savedKeys = (await fileStorage.listFiles()).map(({ key }) => key)
      const files = await Promise.all(savedKeys.map(key => fileStorage.getFile(key)))

      if (files.length <= 0) {
        alert('촬영된 사진이 없습니다. 카메라로 이동합니다.')
        router.push('/camera')
      }
      if (!isFourCut) {
        setSelected(savedKeys)
      }

      setResults(files.filter(Boolean) as Array<File>)
    })
  }, [])

  return <>
    <VStack className={s.page} align='center' gap={24} height='100%'>
      <Viewport direction='column' height='100%'>
        <HStack wrap='wrap' gap={8}>{
          results.map(f => (
            <ResultItem
              key={f.name} file={f}
              selected={selected} setSelected={setSelected}
            />
          ))
        }</HStack>
      </Viewport>

      <Flex
        className={s.counter}
        align='center' justify='center'
        width='60px'
      >{selected.length} / {isFourCut ? '4' : results.length}</Flex>

      <HStack className={s.buttons} gap={8}>
        <button
          className={isUploading ? s.loading : ''}
          onClick={onClickRetake}
        >{isUploading ? <span /> : '다시 촬영하기'}</button>
        <button
          className={isUploading ? s.loading : ''}
          onClick={onClickNext}
          disabled={isFourCut ? selected.length !== 4 : selected.length <= 0}
        >{isUploading ? <span /> : '다음'}</button>
      </HStack>
    </VStack>
  </>
}
