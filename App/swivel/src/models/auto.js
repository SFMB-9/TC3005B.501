import mongoose, { model } from "mongoose";

const autoSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    ano: String,
    precio: String,
    color: String,
    combustible: String,
    autonomia: Number,
    transmision: String,
    cantidad: String,
    motor: String,
    agencia_id: String,
    estado_agencia: String,
    municipio_agencia: String,
    tipo_vehiculo: String,
    descripcion: String,
    array_fotografias_url: [String],
    grupo_automotriz_id: String,
    grupo_automotriz: String,
    gerente_id: String,
    horas_min: Number,
    horas_max: Number,
    dias_anticipo: Number,
    dias_max: Number
});

export default mongoose.models.Auto || mongoose.model("Auto", autoSchema);
