import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function CustomSlider(props) {
  return (
      <Slider
        aria-label="Restricted values"
        defaultValue={props.defaultValue}
        step={null}
        valueLabelDisplay="auto"
        min={props.min}
        onChange={props.onChange}
        max={props.max}
        marks={props.marks}
        sx = {props.sx}
      />
  );
}
