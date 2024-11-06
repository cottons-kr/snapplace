import { VStack } from '@/components/layout/Flex/Stack'
import UploadPreview from '@/components/page/upload/Preview'
import { prisma } from '@/lib/prisma'
import { IParams } from '@/types/props'
import { redirect } from 'next/navigation'

export default async function UploadPage(props: IParams<'id'>) {
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
    <VStack>
      <UploadPreview assets={history.images} />
    </VStack>
  </>
}
