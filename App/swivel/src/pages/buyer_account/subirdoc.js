import InfoDocumentos from "@/pages/buyer_account/docsUpdate";
import SideMenu from "@/components/buyer/side_menu_buyer";
import styles from '@/styles/buyerStyles/subirdoc.module.css';

const SubirDocumento = () => {
  return (
    <div className={styles.subirDocumento}>
      <div className={styles.misDocumentos}>
        <div className={styles.misDocumentosChild} />
        <div className={styles.nombreApellidos}>{`Nombre - Apellidos `}</div>
        <b className={styles.bienvenidx}>Bienvenidx</b>
      </div>
      <SideMenu />
    </div>
  );
};

export default SubirDocumento;