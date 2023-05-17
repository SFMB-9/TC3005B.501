import CustomReqCard from '@/components/general/custom_req_card';
import styles from '@/styles/req_cards.module.css';

export default function ReqCards() {
  return (
    <div className={styles.reqCardsContainer}>
      <CustomReqCard
        imageSource="/seller_sales_image.jpg"
        icon="/seller_cart_icon.svg"
        text="Solicitudes de Compra"
        href="/providers/seller/purchase_req"
      />
      <CustomReqCard
        imageSource="/seller_tests_image.jpg"
        icon="/seller_wheel_icon.svg"
        text="Solicitudes de prueba de manejo"
        href="/providers/seller/driving_req"
      />
    </div>
  );
}