import { HStack } from '@cottons-kr/react-foundation'
import NavigationItem from './Item'
import { IconName } from '../Icon/shared'

import s from './style.module.scss'

export default function Navigation() {
  return <>
    <HStack className={s.navigation}>
      <NavigationItem icon={IconName.Home} label='홈' value='' />
      <NavigationItem icon={IconName.Map} label='지도' value='map' />
      <NavigationItem icon={IconName.GalleryThumbnail} label='기록' value='history' />
      <NavigationItem icon={IconName.AccountCircle} label='내 정보' value='settings' />
    </HStack>
  </>
}
