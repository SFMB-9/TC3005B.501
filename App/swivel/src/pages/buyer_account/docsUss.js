import { useState, useCallback } from "react";
import { Button, Icon } from "@mui/material";
import SideMenu from "@/components/buyer/side_menu_buyer";
import styles from '@/styles/buyerStyles/buyer.module.css';

import PopupSubirDocs from "../buyer_account/docsUpdate";
import PortalPopup from "@/components/buyer/portal_popup";

const SubirDocumento = () => {
  const [isPopupSubirDocsOpen, setPopupSubirDocsOpen] = useState(false);

  const openPopupSubirDocs = useCallback(() => {
    setPopupSubirDocsOpen(true);
  }, []);

  const closePopupSubirDocs = useCallback(() => {
    setPopupSubirDocsOpen(false);
  }, []);

  return (
    <>
      <div className={styles.subirDocumento}>
        <img className={styles.fondoIcon} alt="" src="/buyer/fondo.svg" />
        <section className={styles.misDocumentos}>
          <div className={styles.mostrardocumentos}>
            <div className={styles.mostrardocumentosChild} />
            <Button
              className={styles.subirbutton}
              sx={{ width: 180.17002868652344 }}
              variant="contained"
              color="primary"
              onClick={openPopupSubirDocs}
            >
              Subir nuevo
            </Button>
            <div className={styles.infoDocumentos}>
              <div className={styles.documento3}>
                <Button
                  className={styles.editarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  className={styles.borrarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  color="primary"
                >
                  Borrar
                </Button>
                <label className={styles.estatus} id="status">
                  Rechazado
                </label>
                <div
                  className={styles.comprobanteDeDomicilio}
                  id="typeDocument"
                >
                  Comprobante de domicilio
                </div>
                <img
                  className={styles.bifileEarmarkPdfIcon}
                  alt=""
                  src="/buyer/bifileearmarkpdf.svg"
                />
                <div className={styles.documento3Child} />
              </div>
              <div className={styles.documento2}>
                <Button
                  className={styles.editarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  className={styles.borrarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  name="Borrar"
                  color="primary"
                >
                  Borrar
                </Button>
                <label className={styles.estatus1} htmlFor="status">
                  Aceptado
                </label>
                <label className={styles.licenciaDeConducir} id="typeDocument">
                  Licencia de conducir
                </label>
                <img
                  className={styles.bifileEarmarkPdfIcon}
                  alt=""
                  src="/buyer/bifileearmarkpdf.svg"
                />
                <div className={styles.documento3Child} />
              </div>
              <div className={styles.documento1}>
                <Button
                  className={styles.editarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  className={styles.borrarbutton}
                  sx={{ width: 132.2635498046875 }}
                  variant="contained"
                  color="primary"
                >
                  Borrar
                </Button>
                <label className={styles.estatus2} htmlFor="status">
                  Pendiente
                </label>
                <div className={styles.ine} id="typeDocument">
                  INE
                </div>
                <img
                  className={styles.bifileEarmarkPdfIcon}
                  alt=""
                  src="/buyer/bifileearmarkpdf.svg"
                />
                <div className={styles.documento3Child} />
              </div>
            </div>
            <b className={styles.misDocumentos1}>Mis Documentos</b>
          </div>
        </section>
        <SideMenu />
        <div className={styles.nombreApellidos}>{`Nombre - Apellidos `}</div>
        <b className={styles.bienvenidx}>Bienvenidx</b>
      </div>
      {isPopupSubirDocsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.4)"
          placement="Centered"
          onOutsideClick={closePopupSubirDocs}
        >
          <PopupSubirDocs onClose={closePopupSubirDocs} />
        </PortalPopup>
      )}
    </>
  );
};

export default SubirDocumento;