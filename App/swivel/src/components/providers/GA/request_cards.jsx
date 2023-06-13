import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function ReqCards() {
  return (
    <div className={styles.reqCardsContainer}>
      <CustomIconCard
        imageSource="/register.jpg"
        icon="/processGA1.svg"
        text="Regístrate"
        href="/auth/signup"
        light={false}
        header=''
        //fiftyFifty={false}
      />
      {/* <CustomIconCard
        imageSource="/registerGA.jpg"
        icon="/processGA2.svg"
        text="Regístra a tu Grupo Automotriz"
        href="/providers/GA/registerGroup/form"
        light={false}
        header=''
      /> */}
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