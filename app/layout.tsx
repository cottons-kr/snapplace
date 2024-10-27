import Viewport from '@/components/layout/Viewport'
import type { ILayoutProps } from '@/types/props'

import '@/styles/app.scss'
import '@/styles/color.scss'
import s from './layout.module.scss'

export default function RootLayout(props: ILayoutProps) {
  return <>
    <html lang='ko'>
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
