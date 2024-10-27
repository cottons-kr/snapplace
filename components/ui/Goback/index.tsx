import { HStack } from '@/components/layout/Flex/Stack'
import Icon from '../Icon'
import Link from 'next/link'
import { IconName } from '../Icon/shared'

type GobackProps = {
  href?: string
}
export default function Goback(props: GobackProps) {
  return <>
    <HStack align='center' height='80px'>
      <Link href={props.href || ''}>
        <Icon icon={IconName.ArrowBack} size={28} />
      </Link>
    </HStack>
  </>
}
