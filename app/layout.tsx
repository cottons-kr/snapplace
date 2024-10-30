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
        <title>스냅플레이스</title>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
        <meta name='description' content='스냅플레이스로 자신의 추억을 맘껏 남겨보세요!' />
        <meta name='keywords' content='스냅플레이스, 스냅, 플레이스, snapplace, snap, place' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <link rel='icon' href='/favicon.ico' />
        <script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing`} />
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
