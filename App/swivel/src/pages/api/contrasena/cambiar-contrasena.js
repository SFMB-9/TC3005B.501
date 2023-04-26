import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
import { passwordStrength } from 'check-password-strength';

export default async function handler(req, res){
    if(req.method === "PUT"){
        dbConnect();

        const email = req.query.email;
        const { password } = req.body;

        const savedPassword = await User.findOne({ email: email }, 'password');

        if (password === savedPassword) {
            return res.status(400).json({ message: "Password can't be the same" });
        }

        if (passwordStrength(password).value !== "Strong" || passwordStrength(password).value !== "Medium") {
          return res.status(400).json({ message: "Password is too weak" }); // this should be primarily checked in the front end before making the request
        }    

        if (token !== savedToken) {
            return res.status(400).json({ message: "Wrong token" });
        }
        
        User.updateOne({ email: email }, { password: password });
        return res.status(200).json({ message: "Password updated" });        
    }
    else{
        res.status(400).json({ message: "Wrong request method" });
    }
}