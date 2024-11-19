import SettingsContainer from '@/components/page/settings/Container'
import ProfileImage from '@/components/ui/Profile/Image'
import { auth } from '@/lib/auth'
import { HStack, VStack } from '@cottons-kr/react-foundation'
import { redirect } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'

import s from './style.module.scss'

export default async function SettingsAccountPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/settings')
  }

  return <>
    <SettingsContainer title='내 정보'>
      <VStack fullHeight gap={38}>
        <HStack className={s.profile} align='center' justify='between' gap={22}>
          <ProfileImage width={78} height={78} />
          <VStack>
            <h1>{session.user.nickname}</h1>
            <p>{session.user.id}</p>
          </VStack>
          <Icon
            icon={IconName.Edit} size={20}
            color='var(--Gray-6)'
          />
        </HStack>

        <form className={s.form}>
          <VStack gap={20} fullHeight>
            <label>
              <span>닉네임</span>
              <input type='text' placeholder={session.user.nickname} />
            </label>
            <label>
              <span>아이디</span>
              <input type='text' placeholder={session.user.id} />
            </label>
            <label>
              <span>이메일</span>
              <input type='text' placeholder={session.user.email} />
            </label>
          </VStack>
          <button>적용</button>
        </form>
      </VStack>
    </SettingsContainer>
  </>
}
