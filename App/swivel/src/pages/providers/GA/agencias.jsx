import React, { useEffect, useState } from "react";

export default function Agencias() {
  const [agencias, setAgencias] = useState([]);
  const role = "ea32725caec36ffca1c1ee939e606cd1"; 
  const GA = "647ae7c7f25041c1b7b8a57b";
  // const [role, setRole] = useState("ea32725caec36ffca1c1ee939e606cd1");
  // const [GA, setGA] = useState("647ae7c7f25041c1b7b8a57b");
  // const [filters, setFilters] = useState([]); // Yet to add filters

  useEffect(() => {
    const fetchAgencias = async () => {
      const res = await fetch(
        `http://localhost:3000/api/GA/pull-agencias?tipo_usuario=${role}&grupo_automotriz_id=${GA}`
      );
      const data = await res.json();
      setAgencias(data.result);
    };
    fetchAgencias();
  }, []);

  console.log(agencias)
  return (
    <div>
      <h1>Agencias</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Numero</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {agencias && agencias.map((agencia) => (
                    <tr key={agencia._id}>
                        <td>{agencia.nombres}</td>
                        <td>{agencia.direccion.estado}</td>
                        <td>{agencia.numero_telefonico}</td>
                        <td>{agencia.email}</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
