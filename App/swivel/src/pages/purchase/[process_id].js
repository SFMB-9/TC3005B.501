import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Process() {
    const router = useRouter();
    const { process_id } = router.query;

    console.log("process_id: " + process_id);
    const [process, setProcess] = useState(null);

    const fetchProcess = async () => {
        const response = await fetch(
            `http://localhost:3000/api/purchase-docs/with-mongo?process_id=${process_id}`,
            { method: "GET" }
        );

        const data = await response.json();

        if(data.result){
            setProcess(data.result);
        }
    };

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
                
            </div>
        );
    }else{
        return (
            <div>
                <p>Loading Process...</p>
            </div>
        );
    }
    
}