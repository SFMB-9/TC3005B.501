
//Registers a car object to the database

import dbConnect from "@/config/dbConnect";
import Auto from "@/models/auto";

export default async (req, res) => {
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Metodo no permitido" });
    }

    const auto = req.body;
    await dbConnect();

    try {
        const newAuto = await Auto.create(auto);
        res.status(200).json({ message: "Auto creado", data: newAuto });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }


};