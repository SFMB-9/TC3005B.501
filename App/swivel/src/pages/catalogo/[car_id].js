import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

// TODOs:
// 1. Encriptar id de coche y desencriptar en el endpoint
// 2. Agregar el resto de los campos del auto (tambien dummy)
// 3. Agregar fotos del auto
// 4. Agregar herramienta financiamiento

export default function CarDetails() {
    const router = useRouter();
    const { car_id } = router.query;
    const [carDetails, setCarDetails] = useState(null);

    const fetchCarDetails = async () => {
        const response = await fetch(
            `http://localhost:3000/api/catalogoNuevo/detalles-auto?car_id=${car_id}`
        );

        const data = await response.json();

        setCarDetails(data.result);
    };

    useEffect(() => {
        if (!car_id) {
            return;
        }
        fetchCarDetails();
    }, [car_id]);

    if (carDetails != null) {
        return (
            <div>
                <h1>Car Details</h1>
                
                <p>Marca: {carDetails.marca}</p>
                <p>Modelo: {carDetails.modelo}</p>
                <p>Año: {carDetails.año}</p>
                <p>Precio: {carDetails.precio}</p>
                <p>Color: {carDetails.color}</p>
                <p>Estado: {carDetails.estado_agencia}</p>

                <h2>Resumen del Auto</h2>
                
                <p>Combustible: {carDetails.combustible}</p>
                <p>Motor: {carDetails.motor}</p>
                <p>Tipo: {carDetails.tipo_vehiculo}</p>

                <h2>Características</h2>
                    <li>Característica 1</li>
                    <li>Característica 2</li>
                    <li>Característica 3</li>
                    <li>Característica 4</li>

                <h3>Extras</h3>
                    <li>Extra 1</li>
                    <li>Extra 2</li>
                    <li>Extra 3</li>
                    
                <h3>Financiamiento</h3>

                <h3>Entrega</h3>
            </div>
        );
    } else {
        return (
            <div>
                <p>Loading Car Details...</p>
            </div>
            );
    }
}