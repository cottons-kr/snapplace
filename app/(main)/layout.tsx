import Navigation from '@/components/ui/Navigation'
import { ILayoutProps } from '@/types/props'
import { VStack } from '@cottons-kr/react-foundation'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function AppLayout(props: ILayoutProps) {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/welcome')
  }

  return <>
    <VStack fullHeight>
      <Navigation />
      {props.children}
    </VStack>
  </>
}
