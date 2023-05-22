import * as React from 'react';
import Drawer from '@mui/material/Drawer';

export default function TemporaryDrawer(props) {

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    props.setState(open);
  };

  return (
    <div>
        <div>
          <Drawer
            anchor={props.anchor}
            open={props.open}

            onClose={toggleDrawer(false)}
            sx={{'& .MuiPaper-root': {
              overflowX: 'hidden',
              overflowWrap: 'anywhere',
              wordWrap: 'break-word',
              maxHeight: '75vh',
            },
            width: 'auto'
          }}
          >
            {props.children}
          </Drawer>
        </div>
    </div>
  );
}