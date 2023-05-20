import React, { useState } from 'react';

const CarRegistrationForm = () => {
  const [car, setCar] = useState({
    cantidad: 0,
    marca: '',
    modelo: '',
    colores: [],
    color_interior: '',
    combustible: '',
    motor: '',
    ano: 0,
    transmision: '',
    rendimiento: '',
    pasajeros: 0,
    nombre_agencia: '',
    estado_agencia: '',
    municipio_agencia: '',
    direccion_agencia: '',
    tipo_vehiculo: '',
    precio: 0,
    caracteristicas: [],
    extras: [],
    enganche: [],
    plazo: {},
    entrega: [],
    disponible_prueba: '',
    visible_catalogo: '',
    descripcion: '',
    ficha_tecnica: '',
    fotos_3d: [],
  });

  const [caracteristicas, setCaracteristicas] = useState([]);
  const [extras, setExtras] = useState([]);
  const [enganche, setEnganche] = useState([]);
  const [color, setColor] = useState([]);
  const [plazo, setPlazo] = useState({});
  const [entrega, setEntrega] = useState([]);
  
  
  const handleColorChange = (index, event) => {
    const { name, value } = event.target;
    setColor((prevColor) => {
      const updatedColor = [...prevColor];
      updatedColor[index] = { ...updatedColor[index], [name]: value };
      return updatedColor;
    });
  };

  const handleEntregaChange = (index, event) => {
    const { name, value } = event.target;
    setEntrega((prevEntregas) => {
      const updatedEntregas = [...prevEntregas];
      updatedEntregas[index] = { ...updatedEntregas[index], [name]: value };
      return updatedEntregas;
    });
  };

  const handleCaracteristicaChange = (index, value) => {
    const updatedCaracteristicas = [...caracteristicas];
    updatedCaracteristicas[index] = value;
    setCaracteristicas(updatedCaracteristicas);
  };

  const handleExtraChange = (index, event) => {
    const { name, value } = event.target;
    setExtras((prevExtras) => {
      const updatedExtras = [...prevExtras];
      updatedExtras[index] = { ...updatedExtras[index], [name]: value };
      return updatedExtras;
    });
  };

  const handleEngancheChange = (index, value) => {
    const updatedEnganche = [...enganche];
    updatedEnganche[index] = value; 
    setEnganche(updatedEnganche); 
  };

  const handleRemoveColor = (index) => {
    setColor((prevColor) => {
      const updatedColor = [...prevColor];
      updatedColor.splice(index, 1);
      return updatedColor;
    });
  };


  const handleRemoveCaracteristica = (index) => {
    setCaracteristicas((prevCaracteristicas) => {
      const updatedCaracteristicas = [...prevCaracteristicas];
      updatedCaracteristicas.splice(index, 1);
      return updatedCaracteristicas;
    });
  };

  const handleRemoveExtra = (index) => {
    setExtras((prevExtras) => {
      const updatedExtras = [...prevExtras];
      updatedExtras.splice(index, 1);
      return updatedExtras;
    });
  };

  const handleRemoveEnganche = (index) => {
    setEnganche((prevEnganche) => {
      const updatedEnganche = [...prevEnganche];
      updatedEnganche.splice(index, 1);
      return updatedEnganche;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleAddRow = (setStateFunc, createEmptyFunc) => {
      setStateFunc((prevState) => [...prevState, createEmptyFunc()]);
  };

  
  const createEmptyColor = () => ({ nombre: '', hex: '' });
  const createEmptyCaracteristica = () => ('');
  const createEmptyExtra = () => ({ nombre: '', precio: 0, descripcion: '' });
  const createEmptyEnganche = () => (0);
  const createEmptyEntrega = () => ({ nombre: '', precio: 0, descripcion: '' });

  const handleKeyChange = (index, key) => {
    const updatedPlazo = { ...plazo };
    updatedPlazo[index] = { ...updatedPlazo[index], key };
    setPlazo(updatedPlazo);
  };

  const handleValueChange = (index, value) => {
    const updatedPlazo = { ...plazo };
    updatedPlazo[index] = { ...updatedPlazo[index], value };
    setPlazo(updatedPlazo);
  };

  const handleRemovePlazo = (index) => {
    const updatedPlazo = { ...plazo };
    delete updatedPlazo[index];
    setPlazo(updatedPlazo);
  };

  const handleRemoveEntrega = (index) => {
    const updatedEntrega = [...entrega];
    updatedEntrega[index] = createEmptyEntrega();
    setEntrega(updatedEntrega);
  };

  const handlePlazoAddRow = () => {
    const newIndex = Object.keys(plazo).length;
    setPlazo({ ...plazo, [newIndex]: { key: '', value: '' } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCar = { ...car, colores: color, caracteristicas: caracteristicas, extras: extras, enganche: enganche, plazo: plazo,entrega: entrega };
    // Do something with the car data, like sending it to an API or storing it in a database
    console.log(updatedCar);
    // Reset the form
    setCar({
      cantidad: 0,
      marca: '',
      modelo: '',
      colores: [],
      color_interior: '',
      combustible: '',
      motor: '',
      ano: 0,
      transmision: '',
      rendimiento: '',
      pasajeros: 0,
      nombre_agencia: '',
      estado_agencia: '',
      municipio_agencia: '',
      direccion_agencia: '',
      tipo_vehiculo: '',
      precio: 0,
      caracteristicas: [],
      extras: [],
      enganche: [],
      plazo: {},
      entrega: [],
      disponible_prueba: '',
      visible_catalogo: '',
      descripcion: '',
      ficha_tecnica: '',
      fotos_3d: [],
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={car.cantidad}
          onChange={handleChange}
        />
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          name="marca"
          id="marca"
          value={car.marca}
          onChange={handleChange}
        />
        <label htmlFor="modelo">Modelo</label>
        <input
          type="text"
          name="modelo"
          id="modelo"
          value={car.modelo}
          onChange={handleChange}
        />
        <label htmlFor="color_interior">Color Interior</label>
        <input
          type="text"
          name="color_interior"
          id="color_interior"
          value={car.color_interior}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="combustible">Combustible</label>
        <input
          type="text"
          name="combustible"
          id="combustible"
          value={car.combustible}
          onChange={handleChange}
        />
        <label htmlFor="motor">Motor</label>
        <input
          type="text"
          name="motor"
          id="motor"
          value={car.motor}
          onChange={handleChange}
        />
        <label htmlFor="ano">Año</label>
        <input
          type="number"
          name="ano"
          id="ano"
          value={car.ano}
          onChange={handleChange}
        />
        <label htmlFor="transmision">Transmisión</label>
        <input
          type="text"
          name="transmision"
          id="transmision"
          value={car.transmision}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="rendimiento">Rendimiento</label>
        <input
          type="text"
          name="rendimiento"
          id="rendimiento"
          value={car.rendimiento}
          onChange={handleChange}
        />
        <label htmlFor="pasajeros">Pasajeros</label>
        <input
          type="number"
          name="pasajeros"
          id="pasajeros"
          value={car.pasajeros}
          onChange={handleChange}
        />
        <label htmlFor="nombre_agencia">Nombre Agencia</label>
        <input
          type="text"
          name="nombre_agencia"
          id="nombre_agencia"
          value={car.nombre_agencia}
          onChange={handleChange}
        />
        <label htmlFor="estado_agencia">Estado Agencia</label>
        <input
          type="text"
          name="estado_agencia"
          id="estado_agencia"
          value={car.estado_agencia}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="municipio_agencia">Municipio Agencia</label>
        <input
          type="text"
          name="municipio_agencia"
          id="municipio_agencia"
          value={car.municipio_agencia}
          onChange={handleChange}
        />
        <label htmlFor="direccion_agencia">Dirección Agencia</label>
        <input
          type="text"
          name="direccion_agencia"
          id="direccion_agencia"
          value={car.direccion_agencia}
          onChange={handleChange}
        />
        <label htmlFor="tipo_vehiculo">Tipo Vehículo</label>
        <select
          name="tipo_vehiculo"
          id="tipo_vehiculo"
          value={car.tipo_vehiculo}
          onChange={handleChange}
        >
          <option value="sedan">Sedán</option>
          <option value="coupe">Coupé</option>
          <option value="convertible">Convertible</option>
          <option value="deportivo">Deportivo</option>
          <option value="familiar">Familiar</option>
          <option value="hatchback">Hatchback</option>
          <option value="pickup">Pickup</option>
        </select>
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={car.precio}
          onChange={handleChange}
        />
        <label htmlFor="disponible_prueba">Disponible Prueba</label>
        <input
          type="checkbox"
          name="disponible_prueba"
          id="disponible_prueba"
          value={car.disponible_prueba}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="visible_catalogo">Visible Catálogo</label>
        <input
          type="checkbox"
          name="visible_catalogo"
          id="visible_catalogo"
          value={car.visible_catalogo}
          onChange={handleChange}
        />
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          overflow="scroll"
          height="20px"
          value={car.descripcion}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ficha_tecnica">Ficha Técnica</label>
        <input
          type="file"
          name="ficha_tecnica"
          id="ficha_tecnica"
          value={car.ficha_tecnica}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <h3>Colores:</h3>
        {color.map((object, index) => (
          <div key={index}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={object.nombre}
                onChange={(event) => handleColorChange(index, event)}
              />
            </label>
            <span> | </span>
            <label>
              Hex:
              <input
                type="text"
                name="hex"
                value={object.hex}
                onChange={(event) => handleColorChange(index, event)}
              />
            </label>
            <span> | </span>
            <button type="button" onClick={() => handleRemoveColor(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setColor, createEmptyColor)}>
           Add Row
        </button>
      </div>
      <br />
      <div>
        <h3>Características:</h3>
        {caracteristicas.map((value, index) => (
          <div key={index}>
            <label>
              Caract:
              <input
                type="text"
                name="nombre"
                value={value}
                onChange={(event) => handleCaracteristicaChange(index, event.target.value)}
              />
            </label>
            <span> | </span>
            <button type="button" onClick={() => handleRemoveCaracteristica(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setCaracteristicas, createEmptyCaracteristica)}>
           Add Row
        </button>
      </div>
      <br />
      <div>
        <h3>Extras:</h3>
        {extras.map((object, index) => (
          <div key={index}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={object.nombre}
                onChange={(event) => handleExtraChange(index, event)}
              />
            </label>
            <span> | </span>
            <label>
              Precio:
              <input
                type="number"
                name="precio"
                value={object.precio}
                onChange={(event) => handleExtraChange(index, event)}
              />
            </label>
            <span> | </span>
            <label>
              Descripción:
              <input
                type="text"
                name="descripcion"
                value={object.descripcion}
                onChange={(event) => handleExtraChange(index, event)}
              />
            </label>
            <span> | </span>
            <button type="button" onClick={() => handleRemoveExtra(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setExtras, createEmptyExtra)}>
           Add Row
        </button>
      </div>
      <br />
      <div>
        <h3>%Enganche:</h3>
        {enganche.map((value, index) => (
          <div key={index}>
            <label>
              %:
              <input
                type="number"
                name="porcentaje"
                value={value}
                onChange={(event) => handleEngancheChange(index, event.target.value)}
              />
            </label>
            <span> | </span>
            <button type="button" onClick={() => handleRemoveEnganche(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setEnganche, createEmptyEnganche)}>
           Add Row
        </button>
      </div>
      <br />
      <div>
        <h3>Plazo:</h3>
        {Object.entries(plazo).map(([index, item]) => (
          <div key={index}>
            <label>
              Key:
              <input
                type="text"
                name="key"
                value={item.key}
                onChange={(event) => handleKeyChange(index, event.target.value)}
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                name="value"
                value={item.value}
                onChange={(event) => handleValueChange(index, event.target.value)}
              />
            </label>
            <button type="button" onClick={() => handleRemovePlazo(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={handlePlazoAddRow}>
          Add Row
        </button>
      </div>
      <br />
      <div>
        <h3>Entrega:</h3>
        {entrega.map((object, index) => (
          <div key={index}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={object.nombre}
                onChange={(event) => handleEntregaChange(index, event)}
              />
            </label>
            <span> | </span>
            <label>
              Precio:
              <input
                type="number"
                name="precio"
                value={object.precio}
                onChange={(event) => handleEntregaChange(index, event)}
              />
            </label>
            <span> | </span>
            <label>
              Descripción:
              <input
                type="text"
                name="descripcion"
                value={object.descripcion}
                onChange={(event) => handleEntregaChange(index, event)}
              />
            </label>
            <span> | </span>
            <button type="button" onClick={() => handleRemoveEntrega(index)}>
              X
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setEntrega, createEmptyEntrega)}>
           Add Row
        </button>
      </div>

      <br />

      <button type="submit">Register Car</button>
    </form>
  );
};

export default CarRegistrationForm;
