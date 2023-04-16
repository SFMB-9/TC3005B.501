import styles from '@/styles/swivel_header.module.css'
import cn from 'classnames'

export default function SwivelHeader({ children, align }) {
  const classNames = cn(styles.header, {
    [styles.right]: align === 'right',
  })

  return (
    <p className={classNames}>{children}</p>
  )
}