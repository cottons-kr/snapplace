import { HStack, VStack } from '@cottons-kr/react-foundation'
import { IconName } from '@/components/ui/Icon/shared'
import Icon from '@/components/ui/Icon'
import Link from 'next/link'

import s from './style.module.scss'

type AccountMenuProps = {
  title: string
  items: Array<{
    icon: IconName
    label: string
    href: string
  }>
}
export default function AccountMenu(props: AccountMenuProps) {
  return <>
    <VStack className={s.menu} gap={16}>
      <h2>{props.title}</h2>
      <VStack>{
        props.items.map((item, i) => (
          <Link key={i} href={item.href}>
            <HStack className={s.item} align='center' gap={6}>
              <Icon icon={item.icon} />
              <p>{item.label}</p>
            </HStack>
          </Link>
        ))
      }</VStack>
    </VStack>
  </>
}
