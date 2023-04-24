import { Button } from "@mui/material";

import styles from "@/index.module.css";

const DocumentosUsuario = () => {
  return (
    <div className={styles.documentosUsuario}>
      <div className={styles.misDocumentos}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
        <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
        <div className={styles.misDocumentosChild} />
        <div className={styles.nombreApellidos}>{`Nombre - Apellidos `}</div>
        <b className={styles.bienvenidx}>Bienvenidx</b>
        <div className={styles.infoDocumentos}>
          <div className={styles.documento1}>
            <Button
              className={styles.borrarCuenta}
              sx={{ width: 127 }}
              variant="outlined"
              name="edit buttoin"
              color="primary"
            >
              Editar
            </Button>
            <Button
              className={styles.borrarEditar}
              sx={{ width: 127 }}
              variant="outlined"
              name="delete button"
              color="primary"
            >
              Borrar
            </Button>
            <div className={styles.pendiente}>Pendiente</div>
            <div className={styles.ine}>INE</div>
            <img
              className={styles.bifileEarmarkPdfIcon}
              alt=""
              src="/bifileearmarkpdf.svg"
            />
            <div className={styles.documento1Child} />
          </div>
          <Button
            className={styles.subir}
            sx={{ width: 173 }}
            variant="outlined"
            name="subir nuevo"
            color="primary"
          >
            Subir nuevo
          </Button>
          <div className={styles.documento2}>
            <Button
              className={styles.borrarCuenta}
              sx={{ width: 127 }}
              variant="outlined"
              name="edit button"
              color="primary"
            >
              Editar
            </Button>
            <Button
              className={styles.borrarEditar}
              sx={{ width: 127 }}
              variant="outlined"
              name="boton borrar"
              color="primary"
            >
              Borrar
            </Button>
            <div className={styles.pendiente}>Rechazado</div>
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
            <Button
              className={styles.borrarCuenta}
              sx={{ width: 127 }}
              variant="outlined"
              name="editar boton"
              color="primary"
            >
              Editar
            </Button>
            <Button
              className={styles.borrarEditar}
              sx={{ width: 127 }}
              variant="outlined"
              name="delete button"
              color="primary"
            >
              Borrar
            </Button>
            <div className={styles.pendiente}>Aceptado</div>
            <div className={styles.comprobanteDeDomicilio}>
              Licencia de conducir
            </div>
            <img
              className={styles.bifileEarmarkPdfIcon}
              alt=""
              src="/bifileearmarkpdf.svg"
            />
            <div className={styles.documento1Child} />
          </div>
          <b className={styles.misDocumentos1}>Mis Documentos</b>
        </div>
      </div>
      <div className={styles.browser}>
        <div className={styles.shapeWithText} />
        <div className={styles.shapeWithText1} />
        <div className={styles.shapeWithText2} />
        <div className={styles.shapeWithText2} />
      </div>
      <div className={styles.sideMenu}>
        <div className={styles.top}>
          <div className={styles.swivel}>
            <div className={styles.swVelParent}>
              <b className={styles.swVel}>SW VEL</b>
              <img className={styles.groupChild} alt="" src="/vector-4.svg" />
            </div>
          </div>
          <div className={styles.profile}>
            <img className={styles.icon} alt="" src="/icon.svg" />
            <div className={styles.text}>
              <b className={styles.gerente}>Nombre</b>
              <div className={styles.mail}>nombre@demo.com</div>
            </div>
          </div>
          <div className={styles.listitem}>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img className={styles.icon1} alt="" src="/icon1.svg" />
                <div className={styles.text1}>Mi Cuenta</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img className={styles.folderIcon} alt="" src="/folder.svg" />
                <div className={styles.text2}>Mis Documentos</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img className={styles.icons} alt="" src="/icons.svg" />
                <div className={styles.text1}>Mis Solicitudes</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img className={styles.icons1} alt="" src="/icons1.svg" />
                <div className={styles.text1}>Favoritos</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img className={styles.icons1} alt="" src="/icons2.svg" />
                <div className={styles.text1}>Catalogo</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.listManu}>
            <div className={styles.content}>
              <img className={styles.icons1} alt="" src="/icons3.svg" />
              <div className={styles.text1}>Cerrar Sesión</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentosUsuario;