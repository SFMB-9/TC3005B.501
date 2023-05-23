import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Card, CardContent } from '@mui/material';

import ManagerLayout from "@/components/providers/manager/layout";

export default function WorkingHoursComponent() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [preDays, setPreDays] = useState(0);
  const [maxDays, setMaxDays] = useState(0);
  const [agency, setAgency] = useState('');

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
      await axios.put('/api/agencia/modificar-disponibilidad-pruebas', { agency: agency, horas_min: horas_min, horas_max: horas_max, dias_anticipo: dias_anticipo, dias_max: dias_max });
    }
    catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <ManagerLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            paddingLeft: '3%',
            paddingRight: '3%',
            paddingTop: '2%',
          }}
        >
          <Typography variant="h4" 
              sx={{
                display: 'flex',
                justifyContent: 'start',
                fontWeight: 'bold', 
                fontFamily: 'Raleway',
              }}>
                Gestionar servicios
              </Typography>
        </div>
        <Grid container spacing={3} sx={
          {
            display: 'flex',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '2%',
          }}>
          <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Horario de atención
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Ingrese el horario de atención de la agencia
                </Typography>
                <TextField
                  id="time"
                  label="Hora de apertura"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField

                  id="time"
                  label="Hora de cierre"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Horario de atención
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Ingrese el horario de atención de la agencia
                </Typography>
                <TextField
                  id="time"
                  label="Hora de apertura"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField

                  id="time"
                  label="Hora de cierre"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div>
          
          <label>Hora de apertura</label>
          <input
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <label>Hora de cierre</label>
          <input
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
          />
          <label>Días de antelación</label>
          <input
            type="number"
            value={preDays}
            onChange={handlePreDaysChange}
            inputProps={{ min: 0 }}
          />
          <label>Número de días disponible</label>
          <input
            type="number"
            value={maxDays}
            onChange={handleMaxDaysChange}
            inputProps={{ min: 0 }}
          />

          <div>
            <label htmlFor="agency_field">Agencia</label>
            <input
              type="text"
              id="agency_field"
              className="form-control"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              required
            />
          </div>

          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </ManagerLayout>
    </>
  );
};
