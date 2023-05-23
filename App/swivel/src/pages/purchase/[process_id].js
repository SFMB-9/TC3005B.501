import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import FileUpload from '@/pages/api/uploadBucketDoc/uploadBucketDoc';

export default function Process() {
    const router = useRouter();
    const { process_id } = router.query;

    console.log("process_id: " + process_id);
    const [process, setProcess] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [changedDocumentIndices, setChangedDocumentIndices] = useState([]);
    const [changedDocuments, setChangedDocuments] = useState([]);
    const [uploadedDocument, setUploadedDocument] = useState([]);
    const [isOpen, setIsOpen] = useState([]);

    const fetchProcess = async () => {
        const response = await fetch(
            `http://localhost:3000/api/purchase-docs/with-mongo?process_id=${process_id}`,
            { method: "GET" }
        );

        const data = await response.json();

        if (data.result) {
            setProcess(data.result);
            setDocuments(data.result.documentos);
        }
    };

    const addToIsOpen = async (newKey) => {
        let currentOpen = [...isOpen];
        currentOpen.push(newKey);
        setIsOpen(currentOpen);
    }

    // Save the indices that were changed
  const handleDocumentEdit = (event, indx) => {    
    const documentIndices = [...changedDocumentIndices];
    documentIndices.push(indx);
    setChangedDocumentIndices(documentIndices);

    const currentChangedDocuments = [...changedDocuments];
    currentChangedDocuments.push(event);
    setChangedDocuments(currentChangedDocuments);

    const isOpenWithoutIndx = isOpen.filter(function (i) {
      return i !== indx;
    });

    setIsOpen(isOpenWithoutIndx);
    handleSubmit();
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    // Store the changed documents inside firebase
    for(const [i, doc] of changedDocuments.entries()) {
      // Upload to firebase
      documentUrl = await FileUpload(doc);
      // Assign new URL
      currentDocs[changedDocumentIndices[i]].url = documentUrl;
      // Change modification date
      currentDocs[changedDocumentIndices[i]].fecha_modificacion = new Date().toISOString();
    }
    console.log("Documents: " + JSON.stringify(currentDocs));
    setDocuments(currentDocs);
  }

  

    useEffect(() => {
        if (!process_id) {
            return;
        }
        fetchProcess();
    }, [process_id]);

    if (process != null) {
        return (
            <div>
                <h1>Process: {process_id}</h1>
                <h1>Documentos de Compra</h1>
                <h2>{process.auto.marca} {process.auto.modelo} {process.auto.ano}</h2>
                <h3>Info Vendedor</h3>
                <p>Hola! Soy {process.vendedor.nombres}</p>
                <p>Yo voy a estar revisando tus documentos, contactame con el chat  copiando este numero: 1337</p>
                <p>Email: {process.vendedor.email}</p>

                <h3>Info Agencia</h3>
                <p>Nombre: {process.agencia.nombres}</p>
                <p>
                    Direccion: {process.agencia.direccion.calle}
                    {process.agencia.direccion.numero_exterior}
                    {process.agencia.direccion.ciudad}
                    {process.agencia.direccion.estado}
                    {process.agencia.direccion.pais}
                    {process.agencia.direccion.codigo_postal}
                </p>
                <p>Telefono: {process.agencia.numero_telefonico}</p>
                <p>Email: {process.agencia.email}</p>

                <h1>Documentos</h1>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>URL</th>
                            <th>Estatus</th>
                            <th>Ultima modificación</th>
                            <th>Comentarios</th>
                            <th>Editar</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document, i) => (
                            <tr key={i}>
                                <td>{document.nombre_documento}</td>
                                <td>{document.url}</td>
                                <td>{document.estatus}</td>
                                <td>{document.fecha_modificacion}</td>
                                <td>{document.comentarios}</td>
                                <td><button onClick={() => addToIsOpen(i)}> Editar </button></td>
                                {isOpen.includes(i) && (
                                    <td>
                                        <div>
                                            <input type="file" name="documents" onChange={(e) => setUploadedDocument(e.target.files[0])} />
                                            <button type="submit" onClick={() => handleDocumentEdit(uploadedDocument, i)}>Confirm</button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    } else {
        return (
            <div>
                <p>Loading Process...</p>
            </div>
        );
    }

}