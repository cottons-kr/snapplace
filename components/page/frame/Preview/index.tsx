'use client'

import Flex from '@/components/layout/Flex'
import { VStack } from '@/components/layout/Flex/Stack'
import Viewport from '@/components/layout/Viewport'
import { FileStorage } from '@/lib/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FrameBackground } from '../shared'
import Logo from '@/assets/frame-logo.svg'
import Image from 'next/image'
import classNames from 'classnames'

import s from './style.module.scss'

type FramePreviewProps = {
  frameType: FrameBackground
}
export default function FramePreview(props: FramePreviewProps) {
  const router = useRouter()
  const [images, setImages] = useState<Array<File>>([])

  useEffect(() => {
    const selectedKeys: Array<string> = JSON.parse(localStorage.getItem('fourCut-selected') || '') ?? []
    if (!selectedKeys) {
      alert('선택된 이미지가 없습니다.')
    }

    const fileStorage = new FileStorage()
    fileStorage.init().then(async () => {
      const files = await Promise.all(selectedKeys.map(key => fileStorage.getFile(key)))
        .then(files => files.filter(file => file !== null) as Array<File>)
      if (files.length !== 4) {
        alert('이미지를 불러오는데 실패했습니다. 다시 선택해주세요')
        router.push('/camera/confirm')
        return
      }
      setImages(files)
    })
  }, [])

  return <>
    <Viewport direction='column' height='100%'>
      <Flex align='center' justify='center' width='100%' height='100%'>
        <VStack
          className={classNames(s.frame, s[props.frameType])}
          align='center' justify='center'
          width='172px' height='588px'
          gap={12}
        >
          {images.map((image, index) => (
            <div key={image.name} className={s.image}>
              <img src={URL.createObjectURL(image)} alt={`image-${index}`} />
            </div>
          ))}
          <Image src={Logo} alt='logo' />
        </VStack>
      </Flex>
    </Viewport>
  </>
}
