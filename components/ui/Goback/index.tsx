import { HStack } from '@cottons-kr/react-foundation'
import Icon from '../Icon'
import Link from 'next/link'
import { IconName } from '../Icon/shared'

type GobackProps = {
  href?: string
  onClick?: () => unknown
}
export default function Goback(props: GobackProps) {
  return <>
    <HStack
      align='center'
      style={{ height: '80px' }}
    >{
      props.href ?
        <Link href={props.href || ''}>
          <Icon icon={IconName.ArrowBack} size={28} onClick={props.onClick} />
        </Link> :
        <Icon icon={IconName.ArrowBack} size={28} onClick={props.onClick} />
    }</HStack>
  </>
}
