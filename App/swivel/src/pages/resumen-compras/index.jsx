import React from "react";
import { storage } from "@/utils/firebase/firebase";

const DocLister = ({ title, status, handleFileUpload }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <h1>{title}</h1>
    <input type="file" onChange={handleFileUpload}>
      Upload File
    </input>
    <button>Borrar</button>
    <p>Estado: {status}</p>
  </div>
);

export default function ResumenCompra() {
  const [proceso, setProceso] = React.useState({});
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
        // Do something with the URL, such as storing it in your component state
      });
    });

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/resumen-compra/get-proceso-venta?userId=" +
            { user_id }
        );
        const jsonData = await response.json();
        setProceso(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/resumen-compra/get-proceso-venta?userId=" +
            { user_id }
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
      <h2>Datos del coche</h2>
      <p>Modelo de coche: {}</p>
      <p>Precio de coche: {}</p>
      <h1>Documentos:</h1>
      {proceso.documentos.map((doc, index) => (
        <DocLister
          title={doc.title}
          status={doc.status}
          handleFileUpload={handleFileUpload}
          key={index}
        />
      ))}
    </div>
  );
}
