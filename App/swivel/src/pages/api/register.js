import { User, SellerUser, ManagerUser} from "../../models/user";
import dbConnect from "../../config/dbConnect";

/* 
Required imports for email verification (to be finalized...)

import nodemailer from 'nodemailer';
import EmailVerification from "../../models/emailVerification"; 
*/

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, surname, email, password, street, number, postalCode, city, state, role } = req.body;
    const encrypted_role = encryptRole(role);

    if (!/[a-zA-Z]+/.test(name)) {
      // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong name format" });
    }

    if (!/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
      // regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong email format" });
    }

    let ping = require("ping");

    ping.sys.probe(email, function (isAlive) {
      // email existence validation, pings the email and returns if non-existent
      isAlive
        ? function () {
            // continue
          }
        : function () {
            return res.status(400).json({ message: "Email is invalid" });
          };
    });

    let usedEmail = await User.findOne({ email: email });
    // email existence check within the db, returns if there is already an account with the email
    if (!usedEmail) {
      
      if (role === "user") {
        await User.create({ 
          nombres: name, 
          apellidos: surname, 
          email: email, 
          contraseña: password, 
          direccion: {
            calle: street, 
            numero_exterior: number,
            ciudad: city,
            estado: state, 
            codigo_postal: postalCode
          },
          tipo_usuario: encrypted_role 
        });
        res.status(200).json({ message: "User registered successfully" });
      } 
      
      else if (role === "seller") {

        const agency = req.body.agency;
        const phone = req.body.phone;

        await SellerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          contraseña: password,
          tipo_usuario: encrypted_role,
          agencia: agency,
          telefono: phone,
        });
        res.status(200).json({ message: "Seller registered successfully" });
      }

      else if (role === "manager") {

        const agency = req.body.agency;
        const phone = req.body.phone;

        await ManagerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          contraseña: password,
          tipo_usuario: encrypted_role,
          agencia: agency,
          telefono: phone,
        });
        res.status(200).json({ message: "Manager registered successfully" });
      }
    } else {
      res.status(400).json({ message: "Account already exists" });
    }

    /* 
    base code for email verification, must be implemented above
    requires a functional email provider such as Mailgun in order to be finalized
    
    const newToken = function(length = 32) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let token = '';
    
      for (let i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
      }
    
      return token;
    };

    let token = newToken();

    const verificationLink = `https://localhost:3000/verify-email?token=${token}`; // dunno if this link can work, must be tested. Also requires an endpoint

    await emailVerification.create({email: email, token: token});

    const transporter = nodemailer.createTransport({
      // Configure your SMTP server or email provider here
    });

    await transporter.sendMail({
      from: 'noreply@swivel.com', // valid email? have to check this as well
      to: email,
      subject: 'Verify your email address',
      text: `Please click on the following link to verify your email address: ${verificationLink}`,
      html: `<p>Please click on the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
    }); 
    */
  }
}
