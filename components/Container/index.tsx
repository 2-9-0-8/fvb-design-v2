import styles from '@/components/Container/Container.module.css'

type Props = {
  children: React.ReactNode
  maxInlineSize?: string
  grow?: boolean
  allowChildrenToGrow?: boolean
}

export default function Container({ children, maxInlineSize, grow, allowChildrenToGrow }: Props)  {
  return (
    <div
      className={[
        styles.Container,
        grow ? styles['Container--grow'] : '',
        allowChildrenToGrow ? styles['Container--allow-children-to-grow'] : '',
      ].join(' ')}
      style={{ maxInlineSize: maxInlineSize }}>
      {children}
    </div>
  )
}
