/*
This component is a simple toggle menu that is used in the swivel app to filter 
the data
Author: Mateo Herrera
*/

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function SimpleToggleButton(props) {
  const [alignment, setAlignment] = useState("all");

  const handleChange = (event, newAlignment) => {
    newAlignment === null
      ? props.onChange("all")
      : props.onChange(newAlignment);
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      size="small"
      width="100%"
      sx={props.sx}
    >
      {props.filters.map((filter) => (
        <ToggleButton value={filter.value} key={filter.name}>
          {filter.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
