import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function GActionsCards() {
  return (
    <div className={styles.actionCardsContainer}>
      <CustomIconCard
        imageSource="/manager/seller_action.jpg"
        icon="/manager/seller_icon.svg"
        text="Administración de Agencias"
        href="/providers/GA/agency_management"
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/branch_action.jpg"
        icon="/manager/branch_icon.svg"
        text="Administración de Grupo Automotriz"
        href="/providers/GA/manageGA" 
        light={false}
        header=''
        fiftyFifty={false}
      />
      {/* <CustomIconCard
        imageSource="/manager/statistics_action.png"
        icon="/manager/statistics_icon.svg"
        text="Estadísticas de ventas"
        href="/providers/GA/"
        light={false}
        header=''
        fiftyFifty={false}
      /> */}
    </div>
  );
}