import React from 'react';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { withStyles } from '@mui/styles';

const PhasesIndicator = ({ currentPhaseIndex, phases }) => {
  const StyledConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        background: 'black',
      },
    },
    completed: {
      '& $line': {
        background: 'black',
      },
    },
    line: {
      height: 2,
      border: 0,
      backgroundColor: 'lightgray',
      borderRadius: 1,
    },
  })(StepConnector);

  return (
    <Stepper alternativeLabel activeStep={currentPhaseIndex} connector={<StyledConnector />}>
      {phases.map((phase, index) => (
        <Step key={index} completed={index < currentPhaseIndex}>
          <StepLabel>{phase}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default PhasesIndicator;