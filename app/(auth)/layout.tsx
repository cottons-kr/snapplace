import { Flex } from '@cottons-kr/react-foundation'
import { ILayoutProps } from '@/types/props'

import s from './layout.module.scss'

export default function AuthLayout(props: ILayoutProps) {
  return <>
    <Flex className={s.layout} fullWidth fullHeight>
      {props.children}
    </Flex>
  </>
}
