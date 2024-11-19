import SettingsContainer from '@/components/page/settings/Container'
import { auth } from '@/lib/auth'
import { VStack } from '@cottons-kr/react-foundation'
import { redirect } from 'next/navigation'
import SettingsAccountProfile from '@/components/page/settings/pages/account/Profile'
import SettingsAccountForm from '@/components/page/settings/pages/account/Form'

export default async function SettingsAccountPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/settings')
  }

  return <>
    <SettingsContainer title='내 정보'>
      <VStack fullHeight gap={38}>
        <SettingsAccountProfile session={session} />
        <SettingsAccountForm session={session} />
      </VStack>
    </SettingsContainer>
  </>
}
