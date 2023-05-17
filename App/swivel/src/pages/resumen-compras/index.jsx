import React from "react";
import FileUpload from "./FileUpload";

const DocLister = ({ title, status, docId, procesoId }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p>{title}</p>
    <FileUpload docId={docId} procesoId={procesoId} />
    <button>Borrar</button>
    <p>Estado: {status}</p>
  </div>
);

export default function ResumenCompra() {
  const [proceso, setProceso] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/resumen-compra/get-proceso-ventas?userId=645497ccd204363b117ce157&procesoId=6461507301ef5a23678e01c1",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setProceso(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Resumen de Compra</h1>
      <p>Tipo de Proceso: {proceso.tipo_proceso}</p>
      <h2>Datos del coche</h2>
      {JSON.stringify(proceso.auto)}
      <h1>Documentos:</h1>
      {proceso.documentos &&
        proceso.documentos.map((doc) => (
          <DocLister
            title={doc.nombre}
            key={doc._id}
            status={doc.status}
            docId={doc._id}
            procesoId={proceso.proceso_id}
          />
        ))}
    </div>
  );
}
