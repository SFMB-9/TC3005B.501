import { useEffect } from "react";
import { TextField, Button as MuiButton } from "@mui/material";
import { Form } from "react-bootstrap"; //npm install react-bootstrap bootstrap

import "bootstrap/dist/css/bootstrap.min.css"; //npm install bootstrap@3
import styles from "@/styles/buyerStyles/docsUpdate.module.css";

const PopupSubirDocs = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className={styles.popupSubirdocs}>
      <fieldset className={styles.popUp}>
        <div className={styles.campo}>
          <b className={styles.descripcinOpcional}>Descripción (opcional)</b>
          <Form.Group className={styles.inputtextFormgroup}>
            <Form.Control type="text" name="description" />
          </Form.Group>
        </div>
        <div className={styles.campo1}>
          <b className={styles.nombreDelDocumento}>Nombre del documento</b>
          <TextField
            className={styles.inputtext}
            sx={{ width: 600 }}
            color="primary"
            variant="outlined"
            type="text"
            name="typeDocument"
            label="Label"
            size="small"
            margin="none"
            required
          />
        </div>
        <div className={styles.documentupdate} data-animate-on-scroll>
          <input
            className={styles.registrarbutton}
            type="file"
            required
            data-animate-on-scroll
          />
          <MuiButton
            className={styles.subirbutton}
            sx={{ width: 162.55859375 }}
            variant="outlined"
            color="primary"
          >
            Subir
          </MuiButton>
          <b className={styles.documento}>Documento</b>
          <b className={styles.arrastraTusArchivos}>
            Arrastra tus archivos o has clic.
          </b>
        </div>
        <b className={styles.ingresaLaInformacion}>
          Ingresa la informacion necesaria para subir tu documento.
        </b>
        <img
          className={styles.cerrarbuttonIcon}
          alt=""
          src="/buyer/cerrarbutton.svg"
          onClick={onClose}
        />
        <img
          className={styles.fileIcon}
          alt=""
          src="/buyer/file-icon.svg"
          onClick={onClose}
        />
      </fieldset>
    </div>
  );
};

export default PopupSubirDocs;
