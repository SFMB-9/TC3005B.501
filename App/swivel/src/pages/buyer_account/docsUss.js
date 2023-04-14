import { useState, useCallback } from "react";
//import { Button, Icon } from "@mui/material";
//import PopupSubirDocs from "./popup-subir-docs";
//import PortalPopup from "./portal-popup";
import styles from '@/styles/info-documentos.module.css';

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