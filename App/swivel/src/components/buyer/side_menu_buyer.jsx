import { Button } from "@mui/material";

import styles from "@/styles/buyerStyles/side_menu.module.css";

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <div className={styles.swVelParent}>
            <b className={styles.swVel}>SW VEL</b>
            <img
              className={styles.groupChild}
              alt=""
              src="/buyer/vector-4.svg"
            />
          </div>
        </div>
        <div className={styles.profile}>
          <img className={styles.icon} alt="" src="/buyer/icon.svg" />
          <div className={styles.text}>
            <b className={styles.gerente}>Nombre</b>
            <div className={styles.mail}>nombre@demo.com</div>
          </div>
        </div>
        <div className={styles.listitem}>
          <div className={styles.listManu}>
            <div className={styles.content}>
              <img className={styles.icon1} alt="" src="/buyer/icon1.svg" />
              <div className={styles.button}>Mi Cuenta</div>
            </div>
          </div>
          <div className={styles.listManu}>
            <Button sx={{ width: 186 }} variant="text" color="primary">
              Mis Documentos
            </Button>
          </div>
          <div className={styles.listManu}>
            <Button sx={{ width: 186 }} variant="text" color="primary">
              Mis Solicitudes
            </Button>
          </div>
          <div className={styles.listManu}>
            <Button sx={{ width: 186 }} variant="text" color="primary">
              Favoritos
            </Button>
          </div>
          <div className={styles.listManu}>
            <Button sx={{ width: 186 }} variant="text" color="primary">
              Catalogo
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.logoutButton}>
        <div className={styles.listManu}>
          <Button sx={{ width: 186 }} variant="text" color="primary">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
