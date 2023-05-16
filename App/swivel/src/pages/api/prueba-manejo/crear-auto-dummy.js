/* 
Author: Diego Corrales
Date: 1/5/23
Endpoint to create a dummy car in the db used 
for testing purposes
*/

import Auto from "../../../models/auto";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        dbConnect();

        try {
            // Create the Auto with the defined data
            const auto = await Auto.create({ 
                marca: "Mazda",
                modelo: "MX-5",
                ano: "2020",
                precio: "100000",
                color: "Rojo",
                combustible: "Gasolina",
                autonomia: 15,
                transmision: "Manual",
                cantidad: "10",
                motor: "V8",
                agencia_id: "1234567890",
                estado_agencia: "CDMX",
                municipio_agencia: "Alvaro Obregon",
                tipo_vehiculo: "Deportivo",
                descripcion: "Un auto pequeno y agil",
                array_fotografias_url: ["/dummy_car_image1.png", "/dummy_car_image2.png"],
                grupo_automotriz_id: "0987654321",
                grupo_automotriz: "Mazda Co.",
                gerente_id: "6458716c0628c82dc52b0cba",
                horas_min: 4,
                horas_max: 20,
                dias_anticipo: 6,
                dias_max: 9,
            });

            const autoJSON = auto.toJSON();
            
            const result = {
                auto_id: autoJSON._id,
            }; 

            return res
                .status(200)
                .json({ message: 'Auto dummy creado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al crear auto dummy', error: err});
        }
    }
}
