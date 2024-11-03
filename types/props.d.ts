import { ReactNode } from 'react'

export interface ILayoutProps {
  children: ReactNode
}

export interface IErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface IParams<P = '', S = ''> {
  params: Promise<Record<P, string>>
  searchParams: Promise<Record<S, string>>
}
