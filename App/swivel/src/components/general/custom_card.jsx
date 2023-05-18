import styles from '@/styles/custom_card.module.css';
import Link from 'next/link';

export default function CustomReqCard({ 
  imageSource = '/seller_sales_image.jpg', 
  icon = null, 
  header = '', 
  text = '', 
  href = '', 
  fiftyFifty = true, 
  light = true 
}) {
  const cardClassName = `${styles.card} ${light ? styles.light : ''}`;
  const imageContainerClassName = `${styles.imageContainer} ${fiftyFifty ? styles.fiftyFifty : ''}`;

  return (
    <Link href={href}>
      <div className={cardClassName}>
        <div className={imageContainerClassName}>
          <div className={styles.overlay} />
          <img className={styles.image} src={imageSource} alt="Card" />
        </div>
        <div className={styles.content}>
          {icon && (
            <>
              <img src={icon} className={styles.icon} />
              <span className={styles.divider} />
            </>
          )}
          <div className={styles.textContainer}>
            <h1 className={`${styles.header} ${light ? styles.darkText : ''}`}>{header}</h1>
            <p className={`${styles.text} ${light ? styles.darkText : ''}`}>{text}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}