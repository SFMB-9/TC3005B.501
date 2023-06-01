import { AdminUser } from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {

    if(req.method != "PUT"){
        res.status(405).json({message: "Metodo incorrecto"});
    }

    const { id, name, surname, email, phone } = req.body;

    
    dbConnect();

    try {
        await AdminUser.findOneAndUpdate({ _id: id }, { nombres: name, apellidos: surname, email: email, numero_telefonico: phone }).exec()
        res.status(200).json({ message: "Gerente actualizado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar gerente" });
    }

}

