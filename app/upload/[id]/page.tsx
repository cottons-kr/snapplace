import { VStack } from '@/components/layout/Flex/Stack'
import UploadForm from '@/components/page/upload/Form'
import UploadPreview from '@/components/page/upload/Preview'
import { prisma } from '@/lib/prisma'
import { IParams } from '@/types/props'
import UploadContextWrapper from '@/components/page/upload/ContextWrapper'
import UploadSubmit from '@/components/page/upload/Submit'
import { redirect } from 'next/navigation'

import s from './page.module.scss'

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
    <UploadContextWrapper>
      <VStack className={s.page} gap={12} height='100%'>
        <UploadPreview assets={history.images} />
        <UploadForm />
        <UploadSubmit historyId={id} />
      </VStack>
    </UploadContextWrapper>
  </>
}
