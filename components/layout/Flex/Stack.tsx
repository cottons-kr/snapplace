import Flex, { IFlexProps } from '.'

export function HStack(props: IFlexProps & { direction?: 'row' }) {
  return <>
    <Flex {...props} direction='row' />
  </>
}

export function VStack(props: IFlexProps & { direction?: 'column' }) {
  return <>
    <Flex {...props} direction='column' />
  </>
}
