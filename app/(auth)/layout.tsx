import Flex from '@/components/layout/Flex'
import { ILayoutProps } from '@/types/props'

import s from './layout.module.scss'

export default function AuthLayout(props: ILayoutProps) {
  return <>
    <Flex
      className={s.layout}
      width='100%'
      height='100%'
    >{props.children}</Flex>
  </>
}
