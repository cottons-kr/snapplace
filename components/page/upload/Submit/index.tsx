'use client'

import { useCallback, useContext, useState } from 'react'
import classNames from 'classnames'
import { UploadContext } from '@/lib/contexts/upload'
import { completeHistory } from '@/lib/actions/history'
import { useRouter } from 'next/navigation'

import s from './style.module.scss'

type UploadSubmitProps = {
  historyId: string
}
export default function UploadSubmit(props: UploadSubmitProps) {
  const { data } = useContext(UploadContext)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const onClickUpload = useCallback(async () => {
    setIsUploading(true)
    try {
      await completeHistory(props.historyId, data)
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
