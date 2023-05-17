import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

// TODOs:
// 1. Encriptar id de coche y desencriptar en el endpoint

// 6. Agregar funcionalidad de checkout


export default function CarDetails() {
    const router = useRouter();
    const { car_id } = router.query;
    const [carDetails, setCarDetails] = useState(null);

    // States for selected down payment
    const [selectedDownPayment, setSelectedDownPayment] = useState(0);
    const [downPayment, setDownPayment] = useState(0);

    const [selectedTerm, setSelectedTerm] = useState(null);
    const [interestRate, setInterestRate] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const [carPrice, setCarPrice] = useState(0);

    const [totalCarPrice, setTotalCarPrice] = useState(0);

    // State for extras
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [totalPriceExtras, setTotalPriceExtras] = useState(0);

    // State for color
    const [selectedColor, setSelectedColor] = useState(null);

    // State for delivery price
    const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState(0);



    const fetchCarDetails = async () => {
        const response = await fetch(
            `http://localhost:3000/api/catalogoNuevo/detalles-auto?car_id=${car_id}`
        );

        const data = await response.json();

        setCarDetails(data.result);
        setCarPrice(data.result.precio);
        setSelectedColor(data.result.colores[0]);
    };

    useEffect(() => {
        if (!car_id) {
            return;
        }
        fetchCarDetails();
        calculateTotalPriceExtras();
        calculateDownPaymentAmount();
        calculateMonthlyPayment();
    }, [car_id, selectedExtras, selectedDownPayment, selectedTerm, interestRate]);


    // Calculate the total price based on selected extras
    const calculateTotalPriceExtras = () => {
        const extrasPrice = selectedExtras.reduce((total, extra) => total + extra.precio, 0);
        setTotalPriceExtras(extrasPrice);
    };

    const calculateDownPaymentAmount = () => {
        let downPaymentAmmount = carPrice * (selectedDownPayment / 100);
        setDownPayment(downPaymentAmmount);
    };

    const calculateMonthlyPayment = () => {
        const carPriceWithDownPayment = (carPrice + totalPriceExtras) - downPayment;
        const monthlyPayment = carPriceWithDownPayment / selectedTerm;
        const monthlyPaymentTotal = monthlyPayment + (monthlyPayment * (interestRate / 100));

        setMonthlyPayment(monthlyPaymentTotal.toFixed(2));
    };


    // Function to handle checkbox change of
    const handleCheckboxChange = (event) => {
        const extraTitulo = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            const selectedExtra = carDetails.extras.find(
                (extra) => extra.titulo === extraTitulo
            );
            setSelectedExtras((prevSelectedExtras) => [...prevSelectedExtras, selectedExtra]);
        } else {
            setSelectedExtras((prevSelectedExtras) =>
                prevSelectedExtras.filter((extra) => extra.titulo !== extraTitulo)
            );
        }
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

                    <p style={{ color: selectedColor.valor_hexadecimal, }}>{selectedColor.nombre}</p>
                    {selectedColor.imagenes.map((imagen) => (
                        <img src={imagen} alt={carDetails.modelo} />
                    ))}
                </div>

                <div>
                    <h3>Seleccionar color</h3>
                    {carDetails.colores.map((color) => (
                        <div>
                            <button onClick={() => setSelectedColor(color)}>{color.nombre}</button>
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

                <div>
                    <div>
                        <h2>Select Extras:</h2>
                        {carDetails.extras.map((extra) => (
                            <div key={extra.titulo}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={extra.titulo}
                                        checked={selectedExtras.some((selectedExtra) => selectedExtra.titulo === extra.titulo)}
                                        onChange={(e) => {
                                            handleCheckboxChange(e);
                                            calculateTotalPriceExtras();
                                        }}
                                    />
                                    {extra.titulo} (+${extra.precio}) {extra.descripcion}
                                </label>
                            </div>
                        ))}
                    </div>
                    <p>Total Price Extras: ${totalPriceExtras}</p>
                </div>

                <h2>Financiamiento</h2>
                <div>
                    <div>
                        <label>
                            Porcentaje Enganche:
                            <select
                                value={selectedDownPayment.toString()}
                                onChange={(e) => {
                                    setSelectedDownPayment(parseInt(e.target.value));
                                }}
                            >
                                <option value="0">Seleccione Porcentaje de Enganche</option>
                                {carDetails.enganche.map((option) => (
                                    <option key={option} value={option.toString()}>
                                        {option}%
                                    </option>
                                ))}
                            </select>
                        </label>
                        <p>Enganche: {downPayment}</p>
                    </div>
                    <div>
                        <label>
                            Plazo:
                            <select value={selectedTerm} onChange={(e) => {
                                setSelectedTerm(e.target.value);
                                setInterestRate(carDetails.plazo[e.target.value]);
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
                        {/* <p>Pago Total: </p> */}
                    </div>
                    <p>Final Car Price: {carPrice + totalPriceExtras}</p>
                </div>
                <h2>Entrega</h2>
                <div>
                    {carDetails.entrega.map((metodo_entrega) => (
                        <div>
                            <p>Metodo de Entrega: {metodo_entrega.nombre}</p>
                            <p>Precio: {metodo_entrega.precio}</p>
                            <p>Descripcion: {metodo_entrega.descripcion}</p>
                            <button onClick={() => setSelectedDeliveryPrice(metodo_entrega.precio)}>Seleccionar</button>
                        </div>

                    ))}
                    <p>Precio por Entega: {selectedDeliveryPrice}</p>
                </div>
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