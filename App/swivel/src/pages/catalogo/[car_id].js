import { set } from 'mongoose';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

// TODOs:
// 1. Encriptar id de coche y desencriptar en el endpoint
// 2. Arreglar herramienta/seleccion financiamiento
// 3. Agregar seleccion de extras
// 4. Agregar seleccion de entrega
// 5. Agregar seleccion de color
// 6. Agregar funcionalidad de checkout


export default function CarDetails() {
    const router = useRouter();
    const { car_id } = router.query;
    const [carDetails, setCarDetails] = useState(null);

    const [selectedDownPayment, setSelectedDownPayment] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [interestRate, setInterestRate] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [carPrice, setCarPrice] = useState(0);

    const [selectedExtras, setSelectedExtras] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    // "enganche": [10,20,30,40,50],
    // "plazo": {"12": 5.7,"24": 5.8,"36": 6.0,"48": 6.2,"60": 6.6},

    const fetchCarDetails = async () => {
        const response = await fetch(
            `http://localhost:3000/api/catalogoNuevo/detalles-auto?car_id=${car_id}`
        );

        const data = await response.json();

        setCarDetails(data.result);
        setCarPrice(data.result.precio);
    };

    useEffect(() => {
        if (!car_id) {
            return;
        }
        fetchCarDetails();
    }, [car_id]);

    const calculateMonthlyPayment = () => {
        let carPriceWithDownPayment = carPrice - (carPrice * (selectedDownPayment / 100));
        let monthlyPayment = (carPriceWithDownPayment / selectedTerm);
        let monthlyPaymentTotal = monthlyPayment + (monthlyPayment * (interestRate / 100));

        setMonthlyPayment(monthlyPaymentTotal.toFixed(2));
    };

    // Function to handle checkbox selection
    const handleCheckboxChange = (event) => {
        const extraTitulo = event.target.value;
        const isChecked = event.target.checked;

        // Update the selected extras based on checkbox changes
        if (isChecked) {
            const selectedExtra = Object.values(carDetails.extras).find((extra) => extra.titulo === extraTitulo);
            setSelectedExtras([...selectedExtras, selectedExtra]);
            calculateTotalPrice();
            
        } else {
            const unSelectedExtra = Object.values(carDetails.extras).find((extra) => extra.titulo === extraTitulo);
            const updatedExtras = selectedExtras.filter((extra) => extra.titulo !== unSelectedExtra.titulo);
            setSelectedExtras(updatedExtras);
            calculateTotalPrice();
            
        }
    };

    // Calculate the total price based on selected extras
    const calculateTotalPrice = () => {
        const extrasPrice = selectedExtras.reduce((total, extra) => total + extra.precio, 0);
        setTotalPrice(extrasPrice);
    };

    if (carDetails != null) {
        return (
            <div>
                <a href='/catalogo'>Regresar al catalogo</a>

                <div>
                    <p>Año: {carDetails.año}</p>
                    <p>Marca: {carDetails.marca}</p>
                    <p>Modelo: {carDetails.modelo}</p>
                    <p>Ubicación: {carDetails.direccion_agencia}</p>
                    <p>Agencia: {carDetails.nombre_agencia}</p>
                    <p>Precio: {carDetails.precio}</p>
                </div>

                {/* Ver por que no funciona extraer colores*/}
                <div>
                    <h3>Fotos de auto por color</h3>
                    {Object.values(carDetails.colores).map((color) => (
                        <div>
                            <p style={{ color: color.valor_hexadecimal, }}>{color.nombre}</p>
                            {color.imagenes.map((imagen) => (
                                <img src={imagen} alt={carDetails.modelo} />
                            ))}
                        </div>
                    ))}
                </div>

                <h2>Resumen del Auto</h2>

                <p>Combustible: {carDetails.combustible}</p>
                <p>Motor: {carDetails.motor}</p>
                <p>Tipo: {carDetails.tipo_vehiculo}</p>
                <p>Transmisión: {carDetails.transmision}</p>
                <p>Rendimiento: {carDetails.rendimiento}</p>
                <p>Num. Pasajeros: {carDetails.pasajeros}</p>

                <h2>Características</h2>
                {carDetails.caracteristicas.map((caracteristica) => (
                    <li>{caracteristica}</li>
                ))}

                <h2>Extras</h2>
                {Object.values(carDetails.extras).map((extra) => (
                    <div>
                        <p>{extra.titulo}: {extra.descripcion}</p>
                        <p> Precio: {extra.precio}</p>
                    </div>
                ))}
                <div>
                    <div>
                        <h2>Select Extras:</h2>
                        {Object.values(carDetails.extras).map((extra) => (
                            <div key={extra.titulo}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={extra.titulo}
                                        checked={selectedExtras.some((selectedExtra) => selectedExtra.titulo === extra.titulo)}
                                        onChange={(e)=>{
                                            handleCheckboxChange(e);
                                            calculateTotalPrice();
                                        }}
                                    />
                                    {extra.titulo} (+${extra.precio}) {extra.descripcion}
                                </label>
                            </div>
                        ))}
                    </div>
                    <p>Total Price: ${totalPrice}</p>
                </div>

                <h2>Financiamiento</h2>
                <div>
                    <div>
                        <label>
                            Enganche:
                            <select value={selectedDownPayment} onChange={(e) => {
                                setSelectedDownPayment(e.target.value);
                            }}>
                                <option value="">Seleccione Porcentaje de Enganche</option>
                                {carDetails.enganche.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Plazo:
                            <select value={selectedTerm} onChange={(e) => {
                                setSelectedTerm(e.target.value);
                                setInterestRate(carDetails.plazo[e.target.value]);
                                calculateMonthlyPayment();
                            }}>
                                <option value="">Seleccione Plazo</option>
                                {Object.keys(carDetails.plazo).map((option) => (
                                    <option key={option} value={parseInt(option)}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <p>Tasa de Interes: {carDetails.plazo[selectedTerm]}</p>
                        </label>
                    </div>
                    <div>
                        <p>Pago Mensual: {monthlyPayment}</p>
                        <p>Pago Total: {monthlyPayment * selectedTerm + carPrice - (carPrice * (selectedDownPayment / 100))}</p>
                    </div>
                </div>
                <h2>Entrega</h2>
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