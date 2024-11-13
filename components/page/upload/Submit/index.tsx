'use client'

import { useCallback, useContext, useState } from 'react'
import classNames from 'classnames'
import { UploadContext } from '@/lib/contexts/upload'
import { useRouter } from 'next/navigation'
import { createHistory } from '@/lib/actions/history'
import { dataToFormData, Prefix, typedName } from '@/utils/validator'
import { CreateHistory } from '@/lib/schemas/history/CreateHistory.dto'
import { getCurrentPosition, getLocationName } from '@/lib/location'

import s from './style.module.scss'

export default function UploadSubmit() {
  const { data } = useContext(UploadContext)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const n = typedName<CreateHistory>

  const onClickUpload = useCallback(async () => {
    setIsUploading(true)
    
    try {
      const { coords } = await getCurrentPosition()

      await createHistory(dataToFormData({
        [n('title')]: data.title,
        [n('content')]: data.content,
        [n('files', Prefix.FileList)]: data.files,
        [n('assetAdjustments', Prefix.JSON)]: data.adjustments,
        [n('locationName')]: await getLocationName(),
        [n('latitude', Prefix.Number)]: coords.latitude,
        [n('longitude', Prefix.Number)]: coords.longitude,
        [n('friends', Prefix.JSON)]: data.friends.map(f => f.uuid),
        [n('private', Prefix.StrictBoolean)]: data.private,
        [n('isFourCut', Prefix.StrictBoolean)]: data.isFourCut,
      }))

      router.push('/upload/complete')
    } catch (err) {
      console.error(err)
      alert('게시물을 업로드하는 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }, [data])

  return <>
    <button
      className={classNames(s.button, { [s.uploading]: isUploading })}
      onClick={onClickUpload}
      disabled={!data.title || !data.content}
    >{isUploading ? <span /> : '게시하기'}</button>
  </>
}
