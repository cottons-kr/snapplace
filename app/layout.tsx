import { Viewport } from '@cottons-kr/react-foundation'
import type { ILayoutProps } from '@/types/props'
import { Metadata, Viewport as NextViewport } from 'next'
import { SessionProvider } from 'next-auth/react'

import '@/styles/app.scss'
import '@/styles/color.scss'
import '@/styles/component.scss'
import '@/styles/icon.scss'
import 'swiper/css'
import '@cottons-kr/react-foundation/dist/styles.css'
import s from './layout.module.scss'

export const metadata: Metadata = {
  title: '스냅플레이스',
  description: '스냅플레이스로 자신의 추억을 맘껏 남겨보세요!',
  keywords: '스냅플레이스, 스냅, 플레이스, snapplace, snap, place',
}

export const viewport: NextViewport = {
  viewportFit: 'cover',
}

export default async function RootLayout(props: ILayoutProps) {
  return <>
    <html lang='ko'>
      <head>
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <link rel='icon' href='/favicon.ico' />
        <script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing`} />
      </head>
      <body>
        <SessionProvider>
          <Viewport
            className={s.viewport}
            fullWidth
            style={{ height: '100dvh' }}
          >{props.children}</Viewport>
        </SessionProvider>
      </body>
    </html>
  </>
}
