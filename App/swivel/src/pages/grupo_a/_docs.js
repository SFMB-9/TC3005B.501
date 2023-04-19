import { useState, useCallback } from "react";
import { Button, Icon } from "@mui/material";
import SideMenu from "@/components/buyer/side_menu_buyer";
import styles from '@/styles/buyerStyles/buyer.module.css';
import MUIDataTable from "mui-datatables";


const columns = [
    { name: "Nombre", label:"Nombre", options: { filter: false, sort: true } },
    { name: "Archivo", label:"Archivo", options: { filter: false, sort: false } },
    { name: "Ultima modificación", label:"Ultima modificación", options: { filter: false, sort: true } },
    { name: "Estatus", label:"Estatus", options: { filter: true, sort: true } },
    { name: "Comentarios", label:"Comentarios", options: { filter: false, sort: true } }
  ];

const data = [
 ["Doc_1", "Vista Previa", "DD/MM/AAAA", "Rechazado","Ver Comentarios"],
 ["Doc_2", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
 ["Doc_3", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
 ["Doc_4", "Vista Previa", "DD/MM/AAAA", "En proceso", "Ver Comentarios"],
];

const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  viewColumns: false,
  download: false,
  expandableRows: false,
  responsive: "standard",
  fixedSelectColumn: true,
  selectableRows: 'none',
  selectableRowsHeader: false,
  textLabels: {
    body: {
      noMatch: 'No se encontró',
      toolTip: 'Ordenar',
      columnHeaderTooltip: column => `Ordenar por ${column.label}`
    },
    pagination: {
      next: 'Siguiente Pagina',
      previous: 'Pagina Anterior',
      rowsPerPage: 'Filas por pagina:',
      displayRows: 'of',
    },
    toolbar: {
      search: 'Buscar',
      filterTable: 'Filtros',
    },
    filter: {
      all: 'All',
      title: 'Filtros',
      reset: 'Reiniciar',
    },
    selectedRows: {
      text: 'fila(s) seleccionadas',
      delete: 'Borrar',
      deleteAria: 'Borrar filas seleccionadas',
    },
  },
};

const Docs = () => {
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
            >
              Subir nuevo
            </Button>
            <div className={styles.infoDocumentos}>
              <MUIDataTable
                data={data}
                columns={columns}
                options={options}
              /> 
            </div>
            <b className={styles.misDocumentos1}>Documentos</b>
          </div>
        </section>
        <SideMenu />
        <div className={styles.nombreApellidos}>{`Nombre - Apellidos `}</div>
        <b className={styles.bienvenidx}>Bienvenidx</b>
      </div>
    </>
  );
};

export default Docs;