import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import FileUpload from "@pages/api/uploadBucketDoc/uploadBucketDoc"

const RegistroAgencia = () => {
  const [docs, setDocs] = useState(null);
  const router = useRouter();
  const { _id } = router.query;
  const [files, setFiles] = useState([]);

  const getDocs = async () => {
    const response = await axios.get("http://localhost:3000/api/DrivingRequest/getDrivingRequest", {
      params: { _id: _id }
    });
    setDocs(response.data);
  };

  const uploadDocs = async () => {
    const response = await axios.put("http://localhost:3000/api/GA/uploadDocsGA", {
      id: _id,
      documentos: docs
    });
    console.log(response.data);
  };

  const handleFileChange = async(event, index) => {
    const uploadedFile = event.target.files[0];
    const updatedFiles = [...files];
    updatedFiles[index] = uploadedFile;
    setFiles(updatedFiles);
    for (let i = 0; i < files.length; i++){
        const url = await FileUpload(files[i]);
        const updatedDocs = docs;
        updatedDocs.documentos[i].url = url;
        setDocs(updatedDocs);
    }
    uploadDocs();
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha Actualización</th>
          <th>Estatus</th>
          <th>Comentarios</th>
          <th>File Upload</th>
        </tr>
      </thead>
      <tbody>
        {docs.documentos.map((item, index) => (
          <tr key={index}>
            <td>{item.nombre}</td>
            <td>{item.fechaActualizacion}</td>
            <td>{item.estatus}</td>
            <td>{item.comentarios}</td>
            <td>
              <input type="file" onChange={(event) => handleFileChange(event, index)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegistroAgencia;

    


