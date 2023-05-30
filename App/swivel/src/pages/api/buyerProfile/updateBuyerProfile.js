
import { User, BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { id, name, surname, email, phone, address } = req.body;

    await BuyerUser.updateOne(
        { _id: id },
        { $set: { nombres: name, 
                  apellidos: surname, 
                  email: email, 
                  numero_telefonico: phone, 
                  address: address } 
        }

    );

    res.status(200).json({ message: "profile info updated correctly" });

  }
}