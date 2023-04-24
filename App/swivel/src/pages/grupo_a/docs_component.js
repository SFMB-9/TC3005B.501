import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
//import styles from "../../styles/ga_documents_compt.module.css";

const arch = (value) => {
  if (value == "Vista Previa") {
    return "primary"
  } else {
    return "secondary"
  }
}

const stat = (value) => {
  if (value == "En proceso") {
    return true
  } else {
    return false
  }
}

const status = (value) => {
  if (value == "Rechazado") {
    return "error"
  } else if (value == "Aprovado") {
    return "success"
  } else {
    return "info"
  }
}

const columns = [
  { name: "Nombre", label: "Nombre", options: { filter: false, sort: true } },
  {
    name: "Archivo", label: "Archivo", options: {
      filter: false, sort: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Button
          sx={{ width: 150 }}
          variant="contained"
          color={arch(value)}
        >
          {value}
        </Button>
      )
    }
  },
  { name: "Ultima modificación", label: "Ultima modificación", options: { filter: false, sort: true } },
  {
    name: "Estatus", label: "Estatus", options: {
      filter: true, sort: true,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Button
          sx={{ width: 132.2635498046875 }}
          variant="outlined"
          color={status(value)}
          disableElevation
          disableRipple
          disableFocusRipple
          disabled={stat(value)}
        >
          {value}
        </Button>
      )
    }
  },
  { name: "Comentarios", label: "Comentarios", options: { filter: false, sort: true } }
];

const data = [
  ["Doc_1", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_2", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_3", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_4", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_5", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_6", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_7", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_8", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_9", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_10", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_11", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_12", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_13", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_14", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_15", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_16", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_17", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_18", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_19", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_20", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_21", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_22", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_23", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_24", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_25", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_26", "Vista Previa", "DD/MM/AAAA", "En proceso", "Sin Comentarios"],
  ["Doc_27", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_28", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_29", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_30", "Seleccionar Archivo", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
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
export default function Docs_comp() {
  return (
    <>
      <MUIDataTable
        title={"Documentos"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  )
}