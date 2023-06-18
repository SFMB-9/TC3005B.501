/*
This component is a table that is used in the swivel app to display data
Author: Mateo Herrera
*/

import { DataGrid, esES } from '@mui/x-data-grid';
import UsersActions from './UserActions';
import { useState } from 'react';

export default function DataTable(props) {
  const [rowId, setRowId] = useState(null);
  const columns = props.save ? [
      ...props.columns,
      {
        field: 'actions',
        headerName: '',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions 
            {...{ params, rowId, setRowId, endpoint: props.endpoint, info: props.requiredInfo}}
          />
        ),
      },
    ] : props.columns;
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        onCellEditStop={(params) => setRowId(params.id)}
        hideFooterSelectedRowCount={true}
        rowSelection={props.rowSelection}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          ...props.sx, 
          '.MuiTablePagination-displayedRows': {
            'margin-top': '1em',
            'margin-bottom': '1em'
          },
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
            'margin-top': '1em',
            'margin-bottom': '1em'
          },
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
}
