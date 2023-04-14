import styles from "@/styles/side_menu.module.css";

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.top}>
        <div className={styles.swivel}>
          <div className={styles.swVelParent}>
            <b className={styles.swVel}>SWIVEL</b>
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
  );
};

export default SideMenu;