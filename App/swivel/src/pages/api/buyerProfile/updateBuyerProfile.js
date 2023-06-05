
import { User, BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { id, nombres, apellidos, email, numero_telefonico, direccion } = req.body;

    await BuyerUser.updateOne(
        { _id: id },
        { $set: { nombres: nombres, 
                  apellidos: apellidos, 
                  email: email, 
                  numero_telefonico: numero_telefonico, 
                  direccion: direccion } 
        }

    );

    res.status(200).json({ message: "profile info updated correctly" });

  }
}