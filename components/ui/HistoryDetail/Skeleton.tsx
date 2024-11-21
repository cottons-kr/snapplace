import { HStack, VStack } from '@cottons-kr/react-foundation'
import Skeleton from '../Skeleton'

import s from './style.module.scss'

export default function HistoryDetailSkeleton() {
  return <>
    <Skeleton width='100%' height='252px' />
    <VStack className={s.content} gap={16}>
      <Skeleton width='80%' height='30px' />
      <VStack gap={5}>
        <Skeleton width='100%' height='24px' />
        <Skeleton width='50%' height='24px' />
        <Skeleton width='70%' height='24px' />
      </VStack>
      <HStack gap={6}>
        <Skeleton width='100px' height='46px' />
        <Skeleton width='100px' height='46px' />
      </HStack>
    </VStack>
  </>
}
