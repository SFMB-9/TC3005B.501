import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import formatCheck from "../../../utils/regex";
import pingEmail from "../../../utils/ping";
import tokenGenerator from "../../../utils/token-generator";
import nodemailer from 'nodemailer';
import { passwordStrength } from 'check-password-strength';

/* 
default register function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const {  role, name, last_name, email, password, cellphone } = req.body;

    if (!formatCheck(/[a-zA-Z ]+/, name)) { // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong NAME format" });
    }
    
    if (!formatCheck(/[a-zA-Z ]+/, last_name)) { // regex to check last name format validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong LASTNAME format" });
    }

    if (!formatCheck(/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/, email)) { // regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong EMAIL format" });
    }

    if (!formatCheck(/[0-9]{10}/, cellphone)) { // regex to check cellphone length validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong CELLPHONE length (not 10 digits)" });
    }

    if (!pingEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    /* if (passwordStrength(password).value !== "Strong" || passwordStrength(password).value !== "Medium") {
      return res.status(400).json({ message: passwordStrength(password).value }); // this should be primarily checked in the frontend before making the request
    } */
    
    let usedEmail = await User.exists({ email: email });

    let token = tokenGenerator();
    
    if (!usedEmail) { // email existence check within the db, returns if there is already an account with the email
      await User.create({  
        tipo_usuario: role, 
        nombres: name,      
        apellidos: last_name, 
        email: email,
        contraseña: password,  
        numero_telefonico: cellphone,
        is_account_verified: false, 
        email_verification_token: token,   
      });
      res.status(200).json({ message: "User registered successfully" });

      const verificationLink = `http://localhost:3000/registro/verify-email?token=${token}&email=${email}`;

      const transporter = nodemailer.createTransport({
            service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: `Swivel <Swivel Team>`,
        to: email,
        subject: 'Verify your email',
        html: `<p>Click the following link to verify your email:</p> <p><a href="${verificationLink}">VERIFY</a></p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
    }
    else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else{
    res.status(400).json({ message: "Wrong request method" });
  }
}