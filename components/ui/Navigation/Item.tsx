'use client'

import { VStack } from '@cottons-kr/react-foundation'
import { IconName } from '../Icon/shared'
import Icon from '../Icon'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import s from './style.module.scss'

type NavigationItemProps = {
  icon: IconName
  label: string
  value: string
}
export default function NavigationItem(props: NavigationItemProps) {
  const pathname = usePathname()
  const current = useMemo(() => pathname.split('/')[1] === props.value, [pathname, props.value])

  return <>
    <Link
      className={cn(s.item, { [s.current]: current })}
      href={`/${props.value}`}
    >
      <VStack align='center'>
        <Icon icon={props.icon} fill={current} />
        <span className={s.label}>{props.label}</span>
      </VStack>
    </Link>
  </>
}
