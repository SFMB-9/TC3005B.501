import styles from '@/styles/custom_req_card.module.css';
import Link from 'next/link';

export default function CustomReqCard({ imageSource = '/seller_sales_image.jpg', icon = '/seller_cart_icon.svg', text = 'Solicitudes de Compra', href = '/providers/seller' }) {
  return (
    <Link href={href}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.overlay} />
          <img className={styles.image} src={imageSource} alt="Card" />
        </div>
        <div className={styles.content}>
          <img src={icon} />
          <span className={styles.icon} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </Link>
  );
}