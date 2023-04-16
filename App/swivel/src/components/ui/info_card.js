import styles from '@/styles/info_card.module.css';
import SwivelParagraph from '@/components/ui/swivel_paragraph';

export default function InfoCard({ imageSrc, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageSrc} alt={title} />
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <SwivelParagraph align="left" className={styles.swivel_paragraph}>
          {description}
        </SwivelParagraph>
      </div>
    </div>
  );
}