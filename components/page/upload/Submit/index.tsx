'use client'

import { useCallback, useContext, useState } from 'react'
import classNames from 'classnames'
import { UploadContext } from '@/lib/contexts/upload'

import s from './style.module.scss'

export default function UploadSubmit() {
  const { data, dispatch } = useContext(UploadContext)
  const [isUploading, setIsUploading] = useState(false)

  const onClickUpload = useCallback(async () => {
    setIsUploading(true)
  }, [data])

  return <>
    <button
      className={classNames(s.button, { [s.uploading]: isUploading })}
      onClick={onClickUpload}
      disabled={!data.title || !data.content}
    >{isUploading ? <span /> : '게시하기'}</button>
  </>
}
