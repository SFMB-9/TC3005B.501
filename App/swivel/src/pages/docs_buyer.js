import { useState } from 'react'
import axios from 'axios'

export default function EditDocs()
{
    const[file, setFile] = useState(null);
    const [documents, setDocuments] = useState([])

    async function handleUpload(event) {
        event.preventDefault()
    

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDocuments((prevDocuments) => [...prevDocuments, response.data])
            
        } catch (error) {
            console.error(error);
        }
    }
    
    async function handleDelete(documentId) {
        try {
            await axios.delete('/api/documentos-solicitud-compra-comprador/${documentId}');
            setDocuments((prevDocuments) => {
                prevDocuments.filter((doc) => doc._id !== documentId)
            });
            
        } catch (error) {
            console.error(error)
        }
    }

    async function handleDownload(documentId) {
        try {
            const response = await axios.get('/api/documentos-solicitud-compra-comprador/${documentId}', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', '${documentId}.pdf')
            document.body.appendChild(link)
            link.click()
            
        } catch (error) {
            console.error(error)
        }
    }




    return(
        <>
        <div id="Navbar"></div>
        <div id="Docs">
            <h1>Documentos</h1>
            <div>
                <form onSubmit={handleUpload}>
                    <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                    <button type="submit">Subir</button>
                </form>
                <ul>
                    {documents.map((doc) => (
                    <li key={doc._id}>
                        <p>{doc.filename}</p>
                        <button onClick={() => handleDelete(doc._id)}>Borrar</button>
                        <button onClick={() => handleDownload(doc._id)}>Descargar</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}