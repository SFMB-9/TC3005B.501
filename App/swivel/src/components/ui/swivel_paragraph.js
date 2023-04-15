import styles from '@/styles/swivel_paragraph.module.css'
import cn from 'classnames'

export default function swivel_paragraph({ children, align }) {
  const classNames = cn(styles.paragraph, {
    [styles.right]: align === 'right',
  })

  return (
    <p className={classNames}>{children}</p>
  )
}