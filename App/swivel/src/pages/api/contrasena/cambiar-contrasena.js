import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import { passwordStrength } from 'check-password-strength';

export default async function handler(req, res){
    if(req.method === "PUT"){
        dbConnect();

        const email = req.body.email;
        const password = req.body.password;

        const savedPassword = await User.findOne({ email: email }, 'contraseña');

        const isPasswordMatched = await bcrypt.compare(password, savedPassword.contraseña);

        if (isPasswordMatched) {
            return res.status(400).json({ message: "Password can't be the same" });
        }

        /* if (passwordStrength(password).value !== "Strong" || passwordStrength(password).value !== "Medium") {
          return res.status(400).json({ message: passwordStrength(password).value }); // this should be primarily checked in the front end before making the request
        }  */   

        const newPassword = await bcrypt.hash(password, 10);
        
        const result = await User.updateOne({ email: email }, { contraseña: newPassword });

        if(result.acknowledged){
            return res.status(200).json({ message: "Password updated" });        
        }
        else {
            return res.status(400).json({ message: "Password not updated" });
        }
    }
    else{
        res.status(405).json({ message: "Wrong request method" });
    }
}