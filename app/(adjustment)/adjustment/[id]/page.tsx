import { VStack } from '@/components/layout/Flex/Stack'
import AdjustmentContextWrapper from '@/components/page/adjustment/ContextWrapper'
import AdjustmentControl from '@/components/page/adjustment/Slider'
import AdjustmentPreview from '@/components/page/adjustment/Preview'
import { prisma } from '@/lib/prisma'
import { IParams } from '@/types/props'
import { redirect } from 'next/navigation'
import Viewport from '@/components/layout/Viewport'
import AdjustmentSubmit from '@/components/page/adjustment/Submit'

import s from './style.module.scss'

export default async function AdjustmentPage(props: IParams<'id'>) {
  const params = await props.params
  const id = params.id
  const history = await prisma.history.findUnique({
    where: { uuid: id },
    include: { images: true },
  })

  if (!history) {
    redirect('/')
  }

  return <>
    <AdjustmentContextWrapper assets={history.images}>
      <VStack className={s.page} gap={36} height='100dvh'>
        <AdjustmentPreview />
        <Viewport direction='column' height='100%'>
          <AdjustmentControl />
        </Viewport>
        <AdjustmentSubmit />
      </VStack>
    </AdjustmentContextWrapper>
  </>
}
