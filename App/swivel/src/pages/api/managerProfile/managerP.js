import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";
//will change this when sessions are implemented
//import {getSession} from 'next-auth/client'

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  const client = await connectToDatabase;
  const db = client.db("test");
  const userCollection = db.collection("usuarios");

  const { id } = req.query;

  try {
    const userData = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!userData) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario encontrado", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
