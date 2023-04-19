import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {

    const { name, email, password, role } = req.body;
    const encrypted_role = encryptRole(role);

    if (!/[a-zA-Z]+/.test(name)){ // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "Front, please check formats properly" });
    }

    if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){// regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "Front, please check formats properly" });
    }

    let ping = require("ping");

    ping.sys.probe(email, function(isAlive){ // email existence validation, pings the email and returns if non-existent
      isAlive ? function(){
        // continue
      }
      : function(){
        return res.status(400).json({ message: "Email is invalid" });
      }
    });
    
    dbConnect();

    let user;

    User.exists({email:email}, async function (err, doc) { // email existence check within the db, returns if there is already an account with the email
      if (doc){
        user = await User.create({ name, email, password, encrypted_role});
        res.status(201).json({ user });
      }
      else{
        res.status(400).json({ message: "Account already exists" });
      }
    }); 
  }
}