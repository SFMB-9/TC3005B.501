// Autor: Mateo Herrera
// Descripcion: Este componente representa un acordeon, el cual es utilizado para mostrar
// informacion en la pagina de ayuda

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion(props) {
  return (
    <div>
      <Accordion disableGutters className='rounded'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor: props.backgroundColorTitle}}
          className='py-2 rounded'
        >
          {props.children}
        </AccordionSummary>
        <AccordionDetails className='py-3'>
          <Typography
            fontFamily={props.fontFamily}
            fontSize={props.fontSize}
            color={props.color}
          >
            {props.content}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}