import React, { useState } from 'react';

export default function WorkingHoursComponent() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [preDays, setPreDays] = useState(0);
    const [maxDays, setMaxDays] = useState(0);
    const [agency, setAgency] = useState('');

    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState('');

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

    const addItem = () => {
      setList([...list, newItem]);
      setNewItem('');
    };

    const removeItem = (index) => {
      const updatedList = [...list];
      updatedList.splice(index, 1);
      setList(updatedList);
    };
  
    const timeSubmit = async () => {
        try {
            await axios.put('/api/agencia/modificar-disponibilidad-pruebas', { agency: agency, horas_min: horas_min, horas_max: horas_max, dias_anticipo: dias_anticipo, dias_max: dias_max });
        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const docSubmit = async () => {
      try {
          await axios.put('/api/agencia/actualizar-documentos-requeridos', { agency: agency, data: list });
      } 
      catch (error) {
          console.error('Error fetching search results:', error);
      }
  };
  
    return (
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
          
          <button onClick={timeSubmit}>
            Submit
          </button>
        </div>        

        <div>
          <label htmlFor="doc_field">Documentos</label>

          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={addItem}>Agregar documento</button>

          <ul>
            {list.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => removeItem(index)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <button onClick={docSubmit}>Guardar</button>
        </div>
      </div>
    );
  };
  