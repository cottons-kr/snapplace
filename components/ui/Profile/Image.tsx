import DefaultImage from '@/assets/default.png'
import Image from 'next/image'

type ProfileImageProps = {
  width?: number
  height?: number
}
export default function ProfileImage(props: ProfileImageProps) {
  return <>
    <Image
      src={DefaultImage} alt='프로필 이미지'
      width={props.width} height={props.height}
      style={{ borderRadius: '50%' }}
    />
  </>
}
