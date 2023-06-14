import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import FileUpload from '@/pages/api/uploadBucketDoc/uploadBucketDoc';
import CheckoutPage from "@/components/general/checkout";

export default function Process() {
    const router = useRouter();
    const { process_id, session_id } = router.query;

    const [process, setProcess] = useState(null);
    const [updated, setUpdated] = useState(false);

    const fetchProcess = async () => {
        const response = await fetch(
            `/api/purchase-docs/with-mongo?process_id=${process_id}`,
            { method: "GET" }
        );

        const data = await response.json();

        if (data.result) {
            setProcess(data.result);
        }
    };

    const updateProcess = async () => {
      const response = await fetch(
          `/api/success/update-document?process_id=${process_id}&session_id=${session_id}`,
          { method: "PUT" }
      );

      const data = await response.json();

      if (data.message) {
          setUpdated(true);
      }
  };

    useEffect(() => {
        if (!process_id) {
            return;
        }

        console.log("praocess_id: " + session_id);
        fetchProcess();
        updateProcess();
    }, [process_id]);

    if (process != null) {
        return (
          <Container maxWidth="md">
          <div className="section p-5">
            <Typography
              fontFamily="Lato"
              color="#1F1F1F"
              fontSize={{ xs: 25, md: 28, lg: 33 }}
              className="pt-2 pb-2 text-center"
            >
              ¡Su pago ha sido procesado exitosamente!
            </Typography>
          </div>
        

        <div className="section px-5 text-sm-start text-center mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Resumen de compra
        </Typography>
          <div className="row align-items-center border rounded p-2">
            <div className="col-12 col-sm-6">
            <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Marca:</strong> <span style={{color: '#333333'}}>{process.auto.marca}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Modelo:</strong> <span style={{color: '#333333'}}>{process.auto.modelo}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Año:</strong> <span style={{color: '#333333'}}>{process.auto.ano}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Cantidad Pagado:</strong> <span style={{color: '#333333'}}>${process.cantidad_a_pagar}</span>
        </Typography>

            </div>
            <div className="col-12 col-sm-6">
              <img src={process.auto.array_fotografias_url[0]} alt="auto" className="img-fluid rounded" />
            </div>
        </div>
        </div>

        <div className="section px-5 text-sm-start text-center">
          <div className="row">
            <div className="col-12 col-sm-6 mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Detalles Agencia
        </Typography>

        <div className="border p-2 rounded">

            <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Agencia:</strong> <span style={{color: '#333333'}}>{process.agencia.nombres}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Email:</strong> <span style={{color: '#333333'}}>{process.agencia.email}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Teléfono:</strong> <span style={{color: '#333333'}}>{process.agencia.numero_telefonico}</span>
        </Typography>
        </div>

            </div>
            <div className="col-12 col-sm-6 mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Detalles Agente
        </Typography>

        <div className="border p-2 rounded">

        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Nombre:</strong> <span style={{color: '#333333'}}>{process.vendedor.nombres} {process.vendedor.apellidos}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Email:</strong> <span style={{color: '#333333'}}>{process.vendedor.email}</span>
        </Typography>
        </div>

            </div>
        </div>
        </div>

        <div className="text-center">
        <Button
    variant="contained"
    sx={{
      fontFamily: "Lato",
      ":hover": {
        backgroundColor: "#F68E70",
      },
    }}
    disableElevation
    type="button"
    disabled={!updated}
    href="/"
  >
    Finalizar
  </Button>
        </div>
          </Container>
            // <div>
            //     <h1>Process: {process_id}</h1>
            //     <h1>Documentos de Compra</h1>
            //     <h2>{process.auto.marca} {process.auto.modelo} {process.auto.ano}</h2>
            //     <h3>Info Vendedor</h3>
            //     <p>Hola! Soy {process.vendedor.nombres}</p>
            //     <p>Yo voy a estar revisando tus documentos, contactame con el chat  copiando este numero: 1337</p>
            //     <p>Email: {process.vendedor.email}</p>

            //     <h3>Info Agencia</h3>
            //     <p>Nombre: {process.agencia.nombres}</p>
            //     <p>
            //         Direccion: {process.agencia.direccion.calle}
            //         {process.agencia.direccion.numero_exterior}
            //         {process.agencia.direccion.ciudad}
            //         {process.agencia.direccion.estado}
            //         {process.agencia.direccion.pais}
            //         {process.agencia.direccion.codigo_postal}
            //     </p>
            //     <p>Telefono: {process.agencia.numero_telefonico}</p>
            //     <p>Email: {process.agencia.email}</p>

            //     <h1>Documentos</h1>
            //     <table style={{ width: "100%" }}>
            //         <thead>
            //             <tr>
            //                 <th>Nombre</th>
            //                 <th>URL</th>
            //                 <th>Estatus</th>
            //                 <th>Ultima modificación</th>
            //                 <th>Comentarios</th>
            //                 <th>Editar</th>
            //                 <th></th>
            //                 <th></th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {documents.map((document, i) => (
            //                 <tr key={i}>
            //                     <td>{document.nombre_documento}</td>
            //                     <td>{document.url}</td>
            //                     <td>{document.estatus}</td>
            //                     <td>{document.fecha_modificacion}</td>
            //                     <td>{document.comentarios}</td>
            //                     <td><button onClick={(e) => {
            //                         e.preventDefault();
            //                         addToIsOpen(i)}
            //                         }> Editar </button></td>
            //                     {isOpen.includes(i) && (
            //                         <td>
            //                             <div>
            //                                 <input type="file" name="documents" onChange={(e) => {
            //                                     e.preventDefault();
            //                                     const file = e.target.files[0];
            //                                     setUploadedDocument(file)
            //                                     console.log(uploadedDocument)}} />
            //                                 <button type="submit" onClick={() => handleDocumentEdit(uploadedDocument, i)}>Confirm</button>
            //                             </div>
            //                         </td>
            //                     )}
            //                 </tr>
            //             ))}
            //         </tbody>
            //     </table>

            //     <button></button>
            //     <CheckoutPage
            //       id={process_id}
            //       items={[
            //         {
            //           price_data: {
            //             currency: 'mxn',
            //             product_data: {
            //               name: `${process.auto.marca} ${process.auto.modelo} ${process.auto.ano}`,
            //             },
            //             unit_amount: parseFloat(process.cantidad_a_pagar)*100,
            //           },
            //           quantity: 1,
            //         },
            //       ]}
            //     />

            // </div>
        );
    } else {
        return (
            <div>
                <p>Loading Process...</p>
            </div>
        );
    }

}