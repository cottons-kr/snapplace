import { HStack, VStack } from '@/components/layout/Flex/Stack'
import { IconName } from '@/components/ui/Icon/shared'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'

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
          <Link key={i} className={s.item} href={item.href}>
            <HStack align='center' gap={6}>
              <Icon icon={item.icon} />
              <p>{item.label}</p>
            </HStack>
          </Link>
        ))
      }</VStack>
    </VStack>
  </>
}
