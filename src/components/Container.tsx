import { type PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  crop?: 'normal' | 'none'
}>

export function Container({ children, crop = 'normal' }: Props) {
  return <div className={`container mx-auto px-4`}>{children}</div>
}
