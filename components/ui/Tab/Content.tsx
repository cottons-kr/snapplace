'use client'

import { ReactNode, useContext } from 'react'
import { TabContext } from './shared'

type TabContentProps = {
  value: string
  children?: ReactNode
}
export default function TabContent(props: TabContentProps) {
  const { current } = useContext(TabContext)

  return current === props.value ? <>{props.children}</> : null
}

