import { useState, useCallback } from "react";
//import { Button, Icon } from "@mui/material";
//import PopupSubirDocs from "./popup-subir-docs";
//import PortalPopup from "./docsUpdate";
import styles from '@/styles/buyerStyles/info-documentos.module.css';
import SideMenu from "@/components/buyer/side_menu_buyer";

const InfoDocumentos = () => {
  const [isPopupSubirDocsOpen, setPopupSubirDocsOpen] = useState(false);

  const openPopupSubirDocs = useCallback(() => {
    setPopupSubirDocsOpen(true);
  }, []);

  const closePopupSubirDocs = useCallback(() => {
    setPopupSubirDocsOpen(false);
  }, []);

  return (
    <>
      <div className={styles.misDocumentos}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        <img className={styles.vectorIcon1} alt="" src="/vector.svg" />
        <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        <div className={styles.misDocumentosChild} />
        <div className={styles.nombreApellidos}>{`Nombre - Apellidos `}</div>
        <b className={styles.bienvenidx}>Bienvenidx</b>
      </div>
      <SideMenu />
      <div className={styles.infoDocumentos}>
        <div className={styles.documento1}>
          <div className={styles.pendiente}>Pendiente</div>
          <div className={styles.ine}>INE</div>
          <img
            className={styles.bifileEarmarkPdfIcon}
            alt=""
            src="/bifileearmarkpdf.svg"
          />
          <div className={styles.documento1Child} />
        </div>
        <div className={styles.documento2}>
          
          <label className={styles.pendiente}>Rechazado</label>
          <div className={styles.comprobanteDeDomicilio}>
            Comprobante de domicilio
          </div>
          <img
            className={styles.bifileEarmarkPdfIcon}
            alt=""
            src="/bifileearmarkpdf.svg"
          />
          <div className={styles.documento1Child} />
        </div>
        <div className={styles.documento21}>
          
          
          <div className={styles.pendiente}>Aceptado</div>
          <label className={styles.comprobanteDeDomicilio}>
            Licencia de conducir
          </label>
          <img
            className={styles.bifileEarmarkPdfIcon}
            alt=""
            src="/bifileearmarkpdf.svg"
          />
          <div className={styles.documento1Child} />
        </div>
        <b className={styles.misDocumentos}>Mis Documentos</b>
      </div> 
      {isPopupSubirDocsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupSubirDocs}
        >
          <PopupSubirDocs onClose={closePopupSubirDocs} />
        </PortalPopup> //Se accede al seleccionar la opcion de subir un nuevo documento 
      )}
    </>
  );
};

export default InfoDocumentos;