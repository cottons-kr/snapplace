'use client'

import { Flex } from '@cottons-kr/react-foundation'
import { useSession } from 'next-auth/react'

import s from './style.module.scss'

type ProfileImageProps = {
  width?: number
  height?: number
}
export default function ProfileImage(props: ProfileImageProps) {
  const { data: session } = useSession()
  
  return <>
    <Flex 
      className={s.avatar}
      style={{
        width: props.width || 30,
        height: props.height || 30,
      }}
    >{
      session?.user.avatar && <img src={session.user.avatar} />
    }</Flex>
  </>
}
