import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";

const RegistroAgencia = () => {
  const [docs, setDocs] = useState();
  const router = useRouter();
  const { _id } = router.query;
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadDocs = async () => {
    const response = await axios.put(
      "/api/GA/uploadDocsGA",
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
      let response ="";
      try {
        response = await FileUpload(uploadedFile);
      } catch (error) {
        // Handle the error here. For example, you can show a popup with the error message.
        console.error('File upload failed:', error.message);
        // Show a popup with the error message
        // alert(error.message);
        setError(error.message); // Set the error message
        handleClickOpen(); // Open the modal
        return;
      }
      const updatedDocs = { ...docs };
      updatedDocs.documentos[i].url = response;
      setDocs(updatedDocs);
    }
    await uploadDocs();

    routLP();
  };

  const routLP = () => {
    router.push(`/providers/GA`);
  }
 
  useEffect( () => {
    const getDocs = async () => {
      const response = await axios.get(
        "/api/DrivingRequestsSeller/getDrivingRequest",
        {
          params: { _id: _id },
        }
      );
      setDocs(response.data.proceso);
      
    };
    console.log(docs)
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

