import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { useSession } from "next-auth/react";

const WorkingHoursComponent = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [preDays, setPreDays] = useState(0);
    const [maxDays, setMaxDays] = useState(0);
    
    const [session, loading] = useSession();
  
    // Handle input changes
    const handleStartTimeChange = (event) => {
      setStartTime(event.target.value);
    };
  
    const handleEndTimeChange = (event) => {
      setEndTime(event.target.value);
    };
  
    const handlePreDaysChange = (event) => {
      setPreDays(event.target.value);
    };
  
    const handleMaxDaysChange = (event) => {
      setMaxDays(event.target.value);
    };
  
    // Handle form submission
    const handleSubmit = async () => {
        try {
            await axios.put('/api/agencia/modificar-disponibilidad-pruebas', { agency: session.user.agency, horas_min, horas_max, dias_anticipo, dias_max });
        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    return (
      <div>
        <TextField
          label="Hora de apertura"
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <TextField
          label="Hora de cierre"
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        <TextField
            label="Días de antelación"
            type="number"
            value={preDays}
            onChange={handlePreDaysChange}
            inputProps={{ min: 0 }}
        />
        <TextField
            label="Número de días disponible"
            type="number"
            value={maxDays}
            onChange={handleMaxDaysChange}
            inputProps={{ min: 0 }}
        />

        <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
        </Button>
      </div>
    );
  };
  