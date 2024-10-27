import Viewport from '@/components/layout/Viewport'
import type { ILayoutProps } from '@/types/props'

import '@/styles/app.scss'
import '@/styles/color.scss'
import '@/styles/component.scss'
import s from './layout.module.scss'

export default function RootLayout(props: ILayoutProps) {
  return <>
    <html lang='ko'>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
        />
      </head>
      <body>
        <Viewport
          className={s.viewport}
          direction='column'
          width='100%' height='100dvh'
        >{props.children}</Viewport>
      </body>
    </html>
  </>
}
