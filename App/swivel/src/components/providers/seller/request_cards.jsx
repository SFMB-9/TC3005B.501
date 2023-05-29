import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function ReqCards() {
  return (
    <div className={styles.reqCardsContainer}>
      <CustomIconCard
        imageSource="/seller_sales_image.jpg"
        icon="/seller_cart_icon.svg"
        text="Solicitudes de Compra"
        href="/providers/seller/purchase_req"
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/seller_tests_image.jpg"
        icon="/seller_wheel_icon.svg"
        text="Solicitudes de prueba de manejo"
        href="/providers/seller/driving_req"
        light={false}
        header=''
        fiftyFifty={false}
      />
    </div>
  );
}