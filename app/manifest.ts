import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '스냅플레이스',
    short_name: '스냅플',
    description: '스냅플레이스로 자신의 추억을 맘껏 남겨보세요!',
    start_url: '/',
    display: 'standalone',
    theme_color: 'transparent',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }
    ],
  }
}
