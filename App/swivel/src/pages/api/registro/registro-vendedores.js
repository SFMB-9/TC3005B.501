import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller register function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, last_name, email, password, cellphone, agency } = req.body;
    
    let usedEmail = await User.exists({ email: email });
    
    if (!usedEmail) { // email existence check within the db, returns if there is already an account with the email
      await User.create({  
        tipo_usuario: "seller", 
        nombres: name,      
        apellidos: last_name, 
        email: email,
        contraseña: password,  
        numero_telefonico: cellphone,
        agencia: agency,
        is_account_verified: true, 
      });

      res.status(200).json({ message: "User registered successfully" });
    }
    else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else{
    res.status(400).json({ message: "Wrong request method" });
  }
}