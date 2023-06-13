import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function ReqCards() {
  return (
    <div className={styles.reqCardsContainer}>
      <CustomIconCard
        imageSource="/register.jpg"
        icon="/processGA1.svg"
        text="Regístrate"
        href="/providers/GA/registroAdmin"
        light={false}
        header=''
        //fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/sesion.jpg"
        icon="/processGA4.svg"
        text="Inicia Sesión"
        href="/auth/providers/login"
        light={false}
        header=''
        //fiftyFifty={false}
      />
    </div>
  );
}