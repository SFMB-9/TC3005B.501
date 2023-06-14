import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function ActionsCards() {
  return (
    <div className={styles.actionCardsContainer}>
      <CustomIconCard
        imageSource="/manager/catalog_action.jpg"
        icon="/manager/catalog_icon.svg"
        text="Revision de Solicitudes"
        href="/sa/requests"
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/seller_action.jpg"
        icon="/manager/seller_icon.svg"
        text="Estadisticas"
        href="/sa/stats"
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/branch_action.jpg"
        icon="/manager/branch_icon.svg"
        text="Gestion de usuarios S.A."
        href="/sa/administrar-sa"
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/statistics_action.png"
        icon="/manager/statistics_icon.svg"
        text="Gestion de usuarios G.A."
        href="/sa/administrar-ga"
        light={false}
        header=''
        fiftyFifty={false}
      />
    </div>
  );
}