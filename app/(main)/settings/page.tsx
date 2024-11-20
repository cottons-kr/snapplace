import { HStack, VStack } from '@cottons-kr/react-foundation'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AccountMenu from '@/components/page/settings/Menu'
import { IconName } from '@/components/ui/Icon/shared'
import ProfileImage from '@/components/ui/Profile/Image'

import s from './page.module.scss'

export default async function SettingsPage() {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/welcome')
  }

  const user = await prisma.account.findUnique({
    where: { email: session.user.email }
  })
  if (!user) {
    redirect('/welcome')
  }

  return <>
    <VStack className={s.page} gap={50}>
      <HStack className={s.profile} align='center' gap={16}>
        <ProfileImage
          path={user.avatar}
          width={80} height={80}
        />
        <VStack gap={2}>
          <h1>{user.nickname}</h1>
          <p>{user.id}</p>
        </VStack>
      </HStack>

      <AccountMenu
        title='내 설정'
        items={[
          { icon: IconName.AccountCircle, label: '내 정보', href: '/settings/account' },
          { icon: IconName.Group, label: '친구 및 친구추가', href: '/settings/friends' },
          { icon: IconName.GalleryThumbnail, label: '내 사진 관리', href: '/settings' },
          { icon: IconName.CollectionsBookmark, label: '저장한 게시물', href: '/settings' },
          { icon: IconName.DataInfoAlert, label: '공지사항', href: '/settings' },
        ]}
      />
      <AccountMenu
        title='문의'
        items={[
          { icon: IconName.Article, label: '서비스 이용약관', href: '/settings' },
          { icon: IconName.SupportAgent, label: '고객센터 및 1:1문의', href: '/settings' },
        ]}
      />
    </VStack>
  </>
}
