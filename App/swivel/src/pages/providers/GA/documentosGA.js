import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";


const RegistroAgencia = () => {
  const [docs, setDocs] = useState();
  const router = useRouter();
  const { _id } = router.query;
  const [files, setFiles] = useState([]);


  const uploadDocs = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/GA/uploadDocsGA",
      {
        _id: _id,
        documentos: docs.documentos,
      }
    );
    console.log(response.data);
  };
  

  const handleFileChange = (event, index) => {
    const uploadedFile = event.target.files[0];
    const updatedFiles = [...files];
    updatedFiles[index] = uploadedFile;
    setFiles(updatedFiles);
  };
  
  const handleSubmit = async () => {
    for (let i = 0; i < files.length; i++) {
      const uploadedFile = files[i];
      const response = await FileUpload(uploadedFile);
      const updatedDocs = { ...docs };
      updatedDocs.documentos[i].url = response;
      setDocs(updatedDocs);
    }
    await uploadDocs();
  };
 
  useEffect( () => {
    const getDocs = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/DrivingRequestsSeller/getDrivingRequest",
        {
          params: { _id: _id },
        }
      );
      setDocs(response.data.proceso);
      
    };
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
      {docs && docs.documentos.map((item, index) => (
        <tr key={index}>
          <td>{item.nombre_documento}</td>
          <td>{item.fecha_modificacion}</td>
          <td>{item.estatus}</td>
          <td>{item.comentarios}</td>
          <td>
            <input
              type="file"
              onChange={(event) => handleFileChange(event, index)}
            />
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="5">
          <button onClick={handleSubmit}>Submit</button>
        </td>
      </tr>
    </tfoot>
    </table>
  );
};

export default RegistroAgencia;

