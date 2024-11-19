'use client'

import { ToggleProvider } from '@/hooks/useToggle'
import BottomSheet from '../BottomSheet'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import Link from 'next/link'
import Icon from '../Icon'
import { IconName } from '../Icon/shared'
import { FileStorage } from '@/lib/storage'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { changeFileName } from '@/utils/file'

import s from './style.module.scss'

type NewHistoryProps = {
  provider: ToggleProvider
}
export default function NewHistory(props: NewHistoryProps) {
  const router = useRouter()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 10)
    if (files.length <= 0) return

    const fileStorage = new FileStorage()
    await fileStorage.init()
    await fileStorage.clearAll()

    for (const file of files) {
      const key = nanoid()
      const newFile = changeFileName(file, key)
      fileStorage.saveFile(key, newFile)
    }

    router.push('/camera/confirm')
  }

  return <>
    <BottomSheet darker noBlur provider={props.provider}>
      <HStack className={s.options} gap={10}>
        <Link href='/camera'>
          <VStack className={s.option} align='center' justify='center'>
            <Icon icon={IconName.CenterFocusWeak} size={36} />
            <p>새로운 사진 찍기</p>
          </VStack>
        </Link>
        <VStack tag='label' className={s.option} align='center' justify='center'>
          <Icon icon={IconName.GalleryThumbnail} size={36} />
          <p>기존 사진 업로드</p>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={onFileChange}
          />
        </VStack>
      </HStack>
    </BottomSheet>
  </>
}
