import { Flex } from '@cottons-kr/react-foundation'

import s from './style.module.scss'

type ProfileImageProps = {
  width?: number
  height?: number
  path?: string
}
export default function ProfileImage(props: ProfileImageProps) {  
  return <>
    <Flex 
      className={s.avatar}
      style={{
        width: props.width || 30,
        height: props.height || 30,
      }}
    >{
      props.path && <img src={props.path} alt='프로필 이미지' />
    }</Flex>
  </>
}
