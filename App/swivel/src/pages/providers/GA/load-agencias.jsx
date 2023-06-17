import React, { useEffect, useState } from "react";

export default function LoadAgencia() {
  const [agencias, setAgencias] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchAgencias = async () => {
      const response = await fetch(
        "/api/GA/pull-agencias?role=agencia&GA=Nissan" // GAId=1 is a test
      )
        .then((res) => res.json())
        .then((data) => data);
      setAgencias(response);
    };
  }, []);

  return (
    <div>
      <h1>Load Agencia</h1>
      <table>
        <thead>
          <tr>
            <th>Agencia</th>
            <th>Numero</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {agencias &&
            agencias.map((agencia) => (
              <tr key={agencia.id}>
                <td>{agencia.nombre}</td>
                <td>{agencia.numero_telefonico}</td>
                <td>{agencia.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
