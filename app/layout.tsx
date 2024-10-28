import Viewport from '@/components/layout/Viewport'
import type { ILayoutProps } from '@/types/props'

import '@/styles/app.scss'
import '@/styles/color.scss'
import '@/styles/component.scss'
import '@/styles/icon.scss'
import s from './layout.module.scss'

export default function RootLayout(props: ILayoutProps) {
  return <>
    <html lang='ko'>
      <head>
        <script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_JAVASCRIPT_KEY}&libraries=services`} />
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
