import { VStack } from '@/components/layout/Flex/Stack'
import AdjustmentContextWrapper from '@/components/page/adjustment/ContextWrapper'
import AdjustmentPreview from '@/components/page/adjustment/Preview'
import { prisma } from '@/lib/prisma'
import { IParams } from '@/types/props'
import { redirect } from 'next/navigation'

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
      <VStack>
        <AdjustmentPreview />
      </VStack>
    </AdjustmentContextWrapper>
  </>
}
