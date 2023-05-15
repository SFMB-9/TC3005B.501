import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';

const UsersActions = ({ params, rowId, setRowId, endpoint}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState(false);
  
  const handleSubmit = async () => {
    endpoint()
    setLoading(true);
    setChanged(false);
    setTimeout(async() => {
      // const { role, active, _id } = params.row;
      // const result = await updateStatus({ role, active }, _id, dispatch);
      if (true) {
        setSuccess(true);
        setRowId(null);
      }
      setLoading(false);
    }, 1000);
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
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'green',
            '&:hover': { bgcolor: 'green' },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color='green'
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={(params.id !== rowId || loading) && !changed}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: 'green',
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;