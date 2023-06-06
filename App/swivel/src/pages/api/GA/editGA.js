import { AdminUser } from "@/models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { id, nombres, apellidos, email, numero_telefonico } = req.body;

    await AdminUser.updateOne(
        { _id: id },
        { $set: { nombres: nombres, 
                  apellidos: apellidos, 
                  email: email, 
                  numero_telefonico: numero_telefonico } 
        }
    );

    res.status(200).json({ message: "profile info updated correctly" });

  }
}