'use client'

import { initialUploadContext, UploadContext, uploadReducer } from '@/lib/contexts/upload'
import { ReactNode, useReducer } from 'react'

type UploadContextWrapperProps = {
  children?: ReactNode
}
export default function UploadContextWrapper(props: UploadContextWrapperProps) {
  const [uploadData, setUploadData] = useReducer(uploadReducer, initialUploadContext)

  return <>
    <UploadContext.Provider value={{
      data: uploadData,
      dispatch: setUploadData,
    }}>{props.children}</UploadContext.Provider>
  </>
}
