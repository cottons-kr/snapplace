'use client'

import { Flex, HStack, VStack, Viewport } from '@cottons-kr/react-foundation'
import ResultItem from '@/components/page/camera/ResultItem'
import { FileStorage } from '@/lib/storage'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CameraMode } from '@/lib/contexts/camera'

import s from './page.module.scss'

export default function CameraConfirmPage() {
  const [results, setResults] = useState<Array<File>>([])
  const [selected, setSelected] = useState<Array<string>>([])
  const [isFourCut, setIsFourCut] = useState(false)
  const router = useRouter()

  const onClickRetake = useCallback(async () => {
    const fileStorage = new FileStorage()
    await fileStorage.init()
    await fileStorage.clearAll()
    localStorage.removeItem(CameraMode.FOUR_CUT)
    router.push('/camera')
  }, [])

  const onClickNext = useCallback(async () => {
    const fileStorage = new FileStorage()
    await fileStorage.init()
    const selectedFiles = results.filter(f => selected.includes(f.name))

    localStorage.setItem('selected', JSON.stringify(selectedFiles.map(f => f.name)))
    localStorage.setItem(CameraMode.FOUR_CUT, isFourCut.toString())

    router.push('/adjustment')
  }, [results, selected, isFourCut])

  useEffect(() => {
    const isFourCut = localStorage.getItem(CameraMode.FOUR_CUT) === 'true'
    setIsFourCut(isFourCut)

    const fileStorage = new FileStorage()
    fileStorage.init().then(async () => {
      const savedKeys = (await fileStorage.listFiles()).map(({ key }) => key)
      const savedSelected: Array<string> = localStorage.getItem('selected') ? JSON.parse(localStorage.getItem('selected') || '') : []

      const files: Array<File> = []
      for (const key of savedKeys) {
        const file = await fileStorage.getFile(key)
        if (file) {
          files.push(file)
        }
      }

      if (files.length <= 0) {
        alert('촬영된 사진이 없습니다. 카메라로 이동합니다.')
        router.push('/camera')
      }
      if (savedKeys.length > 0) {
        setSelected(savedSelected)
      } else {
        if (!isFourCut || savedKeys.length === 4) {
          setSelected(savedKeys)
        }
      }

      console.log('Saved Files:', files)
      setResults(files.filter(Boolean))
    })
  }, [])

  return <>
    <VStack className={s.page} align='center' gap={24} fullHeight>
      <Viewport direction='column' fullHeight>
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
        style={{ width: '60px' }}
      >{selected.length} / {isFourCut ? '4' : results.length}</Flex>

      <HStack className={s.buttons} gap={8}>
        <button onClick={onClickRetake}>다시 촬영하기</button>
        <button
          onClick={onClickNext}
          disabled={isFourCut ? selected.length !== 4 : selected.length <= 0}
        >다음</button>
      </HStack>
    </VStack>
  </>
}
