import styles from '@/styles/custom_card.module.css';
import Link from 'next/link';

export default function CustomCard({ imageSource = '/seller_sales_image.jpg', header = '', text = 'Solicitudes de Compra' }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.overlay}/>
          <img className={styles.image} src={imageSource} alt="Card"/>
        </div>
        <div className={styles.content}>
          <h1 className={styles.header}>{header}</h1>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </>
  );
}