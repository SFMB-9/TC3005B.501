import React, { useEffect, useState } from "react";

export default function Agencias() {
  const [agencias, setAgencias] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
  }); // Yet to add filters

  useEffect(() => {
    const fetchAgencias = async () => {
      const res = await fetch(
        `/api/GA/pull-agencias`
      );
      const data = await res.json();
      setAgencias(data);
    };
    fetchAgencias();
  }, []);

  return (
    <div>
      <h1>Agencias</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Numero</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {agencias && agencias.map((agencia) => (
                    <tr key={agencia._id}>
                        <td>{agencia.nombre}</td>
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
