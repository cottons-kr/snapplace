'use client'

import { HStack, VStack } from '@cottons-kr/react-foundation'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { TabContext } from './shared'
import classNames from 'classnames'

import s from './style.module.scss'

type TabProps = {
  items: Array<{
    label: string
    value: string
  }>
  children?: ReactNode
}
export default function Tab(props: TabProps) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [current, setCurrent] = useState(props.items[0].value)
  const [width, setWidth] = useState('100%')
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const el = itemRefs.current[current]
    if (el) {
      setWidth(`${el.offsetWidth}px`)
      setLeft(el.offsetLeft)
    }
  }, [itemRefs, current])

  return <>
    <TabContext.Provider value={{ current, setCurrent }}>
      <VStack fullHeight gap={20}>
        <HStack className={s.tab} align='center' justify='around'>
          {
            props.items.map(item => (
              <div
                key={item.value}
                ref={el => { itemRefs.current[item.value] = el }}
                className={classNames(s.item, current === item.value && s.current)}
                onClick={() => setCurrent(item.value)}
              >{item.label}</div>
            ))
          }
          <div
            className={s.line}
            style={{ width, left }}
          />
        </HStack>
        {props.children}
      </VStack>
    </TabContext.Provider>
  </>
}
