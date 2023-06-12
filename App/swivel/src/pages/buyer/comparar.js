import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Comparison() {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const ids = router.query.ids; // <-- pass as a comma-separated string of ids. i.e. E5S_dIgB6Fc17-h0xcKz,mZS_dIgB6Fc17-h09MIB,SZTAdIgB6Fc17-h0J8OE
    const response = await axios.get('/api/comparar-prod/comparar-productos', { params: { lst: ids } });
    setVehicles(response.data);
  };

  useEffect(() => {
    if (!router.query.ids) return
    fetchData();
  }, [router.query.ids]);

  return (
    vehicles.length > 1 ? 
    <div>
      {vehicles.map((vehicle, index) => (
        <div key={index}>
          <h2>{vehicle.marca}</h2>
          <p>Modelo: {vehicle.modelo}</p>
          <p>Año: {vehicle.año}</p>
          <p>Precio: {vehicle.precio}</p>
          <p>Motor: {vehicle.motor}</p>
          <p>Litros: {vehicle.litros}</p>
          {/*add more components*/}
        </div>
      ))}
    </div> : 
    <div>
      <h2>No hay suficientes autos para la comparación</h2>
    </div>
  );
}
