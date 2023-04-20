import { Button, Container } from "@mui/material"
import styles from '@/styles/grupoStyles/docSoli.module.css'
import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/sidebar'
import NAGHeader from '@/components/new_automotive_group_header'


const DocumentosGASolicitante = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed)
      }
    
      const handleToggleSidebar = (value) => {
        setToggled(value)
      }
    
      const handleSidebarCollapse = () => {
        setCollapsed(!collapsed)
        setToggled(false)
      }
    
  return (
    <div className={styles.documentosGaSolicitante}>
      <img className={styles.blobsHeaderIcon} alt="" src="/grupo_auto/blobsheader.svg" />
      <div className={styles.block} />
      <div className={styles.info}>
        <img className={styles.groupIcon} alt="" src="/grupo_auto/bifileearmarkpdf.svg" />
        <div className={styles.documento}>Documento</div>
        <div className={styles.rechazado}>Rechazado</div>
        <div
          className={styles.aprobado}
        >
          Aprobado
        </div>
        <div
          className={styles.aprobado1}
        >
          Aprobado
        </div>
        <div className={styles.pendiente}>Pendiente</div>
        <div className={styles.pendiente1}>Pendiente</div>
        <div className={styles.pendiente2}>Pendiente</div>
        <img
          className={styles.bifileEarmarkPdfIcon}
          alt=""
          src="/grupo_auto/bifileearmarkpdf.svg"
        />
        <div className={styles.documento1}>Documento</div>
        <img
          className={styles.bifileEarmarkPdfIcon1}
          alt=""
          src="/grupo_auto/bifileearmarkpdf.svg"
        />
        <div className={styles.documento2}>Documento</div>
        <img
          className={styles.bifileEarmarkPdfIcon2}
          alt=""
          src="/grupo_auto/bifileearmarkpdf.svg"
        />
        <div className={styles.documento3}>Documento</div>
        <img className={styles.groupIcon1} alt="" src="/grupo_auto/bifileearmarkpdf.svg" />
        <div className={styles.documento4}>Documento</div>
        <img
          className={styles.bifileEarmarkPdfIcon3}
          alt=""
          src="/grupo_auto/bifileearmarkpdf.svg"
        />
        <div className={styles.documento5}>Documento</div>
        <Button
          className={styles.btnEditar}
          sx={{ width: 172.7026824951172 }}
          variant="contained"
          name="editButton"
          color="primary"
        >
          Editar
        </Button>
        <Button
          className={styles.btnEditar1}
          sx={{ width: 172.7026824951172 }}
          name="editButtonNo"
        >
          Editar
        </Button>
        <Button
          className={styles.btnEditar2}
          sx={{ width: 172.7026824951172 }}
          name="editButtonNo"
        >
          Editar
        </Button>
        <div className={styles.btnEditar3}>
          <div className={styles.btnEditarChild} />
          <div className={styles.editar}>Editar</div>
        </div>
        <div className={styles.btnEditar4}>
          <div className={styles.btnEditarChild} />
          <div className={styles.editar}>Editar</div>
        </div>
        <div className={styles.btnEditar5}>
          <div className={styles.btnEditarChild} />
          <div className={styles.editar}>Editar</div>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.icon} alt="" src="/grupo_auto/Group.svg" />
        <div className={styles.text}>
          <b className={styles.username}>Grupo Automotriz</b>
        </div>
      </div>
      <div className={styles.sideMenuNuevo}>
        <div className={styles.sideMenuNuevoChild}/>
       {/* Sidebar */}
       <ProSidebarProvider>
          <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
            handleSidebarCollapse={handleSidebarCollapse}
            footer={
              <MenuItem
              icon={<img src="/grupo_auto/sidebar_logout_icon.svg" />}
              component={<Link href="/auth/login" />}
              style={{ bottom: 0 }}
              >Cerrar sesión</MenuItem>
            }
            className="sidebar"
          >
            <MenuItem
              icon={<img src="/grupo_auto/sidebar_settings_icon.svg" />}
              component={<Link href="./settings" />}
            >
              Ajustes del perfil
            </MenuItem>
            <MenuItem
              icon={<img src="/grupo_auto/sidebar_docs_icon.svg" />}
              component={<Link href="./docs" />}
            >
              Documentos
            </MenuItem>
            <MenuItem disabled icon={<img src="/grupo_auto/sidebar_help_icon.svg" />}>
              Ayuda
            </MenuItem>
          </Sidebar>
        </ProSidebarProvider>
      </div>
      <div>
        <NAGHeader/>
      </div>
      <div className={styles.subeTusDocumentos}>
        Sube tus documentos y espera a que sean aprobados
      </div>
      <div className={styles.comentarios}>Comentarios:</div>
      <div className={styles.documentosGaSolicitanteChild}></div>
    </div>
  );
};

export default DocumentosGASolicitante;