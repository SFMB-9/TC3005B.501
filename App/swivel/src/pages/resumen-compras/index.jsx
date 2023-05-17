import React from "react";
import { storage } from "@/utils/firebase/firebase";

const DocLister = ({ title, status, handleFileUpload }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <h1>{title}</h1>
    <button>Borrar</button>
    <p>Estado: {status}</p>
  </div>
);

export default function ResumenCompra() {
  const [proceso, setProceso] = React.useState([]);
  const [fileHolder, setFileHolder] = React.useState("");
  const user_id = 1; // get from session

  const handleFileUpload = (event, docId) => {
    const file = event.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    fileRef.put(file).then(() => {
      console.log("File uploaded successfully!");
      fileRef.getDownloadURL().then((url) => {
        console.log("File URL:", url);
        setFileHolder(url);
        // Do something with the URL, such as storing it in your component state
      });
    });

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/resumen-compra/upload-file",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docId: docId,
              url: fileHolder,
              procesoId: proceso.proceso_id,
            }),
          }
        );
        const jsonData = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

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
          <DocLister title={doc.nombre} key={doc._id} status={doc.status} />
        ))}
    </div>
  );
}
