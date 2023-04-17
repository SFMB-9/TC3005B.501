import { Button } from "@mui/material"
import styles from '@/styles/grupoStyles/docSoli.module.css'
import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/ui/sidebar'
import NAGHeader from '@/components/new_automotive_group_header'


const DocumentosGASolicitante = () => {
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
        <div className={styles.sideMenuNuevoChild} />
        <div className={styles.bottom}>
          <div className={styles.listManu}>
            <div className={styles.content}>
              <img className={styles.icons} alt="" src="/grupo_auto/icons.svg" />
              <div className={styles.text1}>Cerrar Sesión</div>
            </div>
          </div>
        </div>
        <div className={styles.ayuda} />
        <div className={styles.documentos} />
        <div className={styles.ajustesDelPerfil} />
        <div className={styles.top}>
          <div className={styles.swivel}>
            <div className={styles.swVelParent}>
              <b className={styles.swVel}>SW VEL</b>
              <img className={styles.groupChild} alt="" src="/grupo_auto/vector-4.svg" />
            </div>
          </div>
          <div className={styles.profile1}>
            <img className={styles.icon1} alt="" src="/grupo_auto/icon1.svg" />
            <div className={styles.text}>
              <b className={styles.username1}>Grupo A.</b>
              <div className={styles.mail}>grupo.a@demo.com</div>
            </div>
          </div>
          <div className={styles.listitem}>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img
                  className={styles.icons}
                  alt=""
                  src="/grupo_auto/ajustes.svg"
                />
                <div className={styles.text3}>Ajustes del perfil</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img
                  className={styles.pajamasdocumentsIcon}
                  alt=""
                  src="/grupo_auto/documentos.svg"
                />
                <div className={styles.text1}>Documentos</div>
              </div>
            </div>
            <div className={styles.listManu}>
              <div className={styles.content}>
                <img
                  className={styles.pajamasdocumentsIcon}
                  alt=""
                  src="/grupo_auto/ayuda.svg"
                />
                <div className={styles.text1}>Ayuda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subeTusDocumentos}>
        Sube tus documentos y espera a que sean aprobados
      </div>
      <div className={styles.comentarios}>Comentarios:</div>
      <div className={styles.documentosGaSolicitanteChild} />
    </div>
  );
};

export default DocumentosGASolicitante;