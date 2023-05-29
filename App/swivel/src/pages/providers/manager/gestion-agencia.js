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
            flexDirection: 'column',
          }}
        >
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
              padding: "2% 5%"
              // paddingLeft: '5%',
              // paddingRight: '5%',
              // paddingTop: '2%',

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
                <CardContent
                  sx={{
                    width: '100%',
                    padding: '5%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '5%',
                    }}
                  >
                    <Typography variant="h4" component="div"
                      sx={{
                        marginBottom: '2%',
                        justifyContent: 'center',
                      }}
                    >
                      Horario de atención
                    </Typography>
                    <Typography sx={{
                      marginBottom: '2%',
                      textAlign: 'center',
                    }} color="text.secondary">
                      Seleccione los horarios en los que opera el servicio, así como los días mínimos y máximos para agendar una prueba de manejo.
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0% 5%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '2%',
                        marginBottom: '2%',
                      }}
                    >
                      <TextField
                        id="time"
                        label="Hora de apertura"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1800,
                        }}
                        sx={{
                          flex: '50%',
                          marginRight: '1rem',
                        }}
                        onChange={handleStartTimeChange}
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
                          step: 1800, // 5 min
                        }}
                        sx={{
                          flex: '50%',
                          marginLeft: '1rem',
                        }}
                        onChange={handleEndTimeChange}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '4%',
                      }}
                    >
                      <TextField
                        id="number"
                        label="Días de antelación"
                        type="number"
                        defaultValue="0"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1,
                        }}
                        sx={{
                          flex: '50%',
                          marginRight: '1rem',
                        }}
                        onChange={handlePreDaysChange}
                      />
                      <TextField
                        id="number"
                        label="Días máximos"
                        type="number"
                        defaultValue="0"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1,
                        }}
                        sx={{
                          flex: '50%',
                          marginLeft: '1rem',
                          marginBottom: '2%',
                        }}
                        onChange={handleMaxDaysChange}
                      />
                    </div>
                  </div>
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
                <CardContent
                  sx={{
                    width: '100%',
                    padding: '5%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '5%',
                    }}
                  >
                    <Typography variant="h4" component="div"
                      sx={{
                        marginBottom: '2%',
                        justifyContent: 'center',
                      }}
                    >
                      Horario de atención
                    </Typography>
                    <Typography sx={{
                      marginBottom: '2%',
                      textAlign: 'center',
                    }} color="text.secondary">
                      Seleccione los horarios en los que opera el servicio, así como los días mínimos y máximos para agendar una prueba de manejo.
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '2%',
                        marginBottom: '2%',
                      }}
                    >
                      <TextField
                        id="time"
                        label="Hora de apertura"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1800,
                        }}
                        sx={{
                          flex: '50%',
                          marginRight: '0.5rem',
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
                          step: 1800, // 5 min
                        }}
                        sx={{
                          flex: '50%',
                          marginLeft: '0.5rem',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '4%',
                      }}
                    >
                      <TextField
                        id="number"
                        label="Días de antelación"
                        type="number"
                        defaultValue="0"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1,
                        }}
                        sx={{
                          flex: '50%',
                          marginRight: '0.5rem',
                        }}
                      />
                      <TextField
                        id="number"
                        label="Días máximos"
                        type="number"
                        defaultValue="0"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1,
                        }}
                        sx={{
                          flex: '50%',
                          marginLeft: '0.5rem',
                          marginBottom: '2%',
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '2%',
            }}
          >
            <button
              // onClick={handleSubmit}
              style={{
                width: '10rem',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                height: '50%',
                padding: '0.5rem 1rem',
                marginRight: '1rem',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              style={{
                width: '10rem',
                backgroundColor: '#F55C7A',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                height: '50%',
                padding: '0.5rem 1rem',
                marginLeft: '1rem',
              }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
        {/* <div>
          
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
        </div> */}
      </ManagerLayout>
    </>
  );
};
