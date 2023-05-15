/*
Auxiliary component for the UsersTable component. 
It is used to display the save button and the loading icon when the user 
is editing a row.
Author: Mateo Herrera
*/

import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';

const UsersActions = ({ params, rowId, setRowId, endpoint, info}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    setChanged(false);
    const { _id } = params.row;
    await endpoint(info.rid, _id, params.row.comentarios);
    setSuccess(true);
    setRowId(null);
    setLoading(false);
  };
  
  useEffect(() => {
    if (params.id === rowId) setChanged(true);
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          sx={{
            width: 0,
            boxShadow: 'none',
            disabled: true,
          }}
        >
          <Check sx={{width: 20}}/>
        </Fab>
      ) : (
        <Fab
          color='green'
          size='small'
          sx={{
            width: 0,
            boxShadow: 'none',
          }}
          disabled={(params.id !== rowId || loading) && !changed}
          onClick={handleSubmit}
        >
          <Save sx={{width: 20}}/>
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={42}
          sx={{
            color: '#F55C7A',
            position: 'absolute',
            top: -2,
            left: -21,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;