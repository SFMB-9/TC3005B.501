import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import formatCheck from "../../../utils/regex";
import pingEmail from "../../../utils/ping";
import tokenGenerator from "../../../utils/token-generator";
import nodemailer from 'nodemailer';
import { passwordStrength } from 'check-password-strength';

import { encryptRole } from "../../../utils/crypto";

/* 
default register function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, last_name, email, cellphone, password, role } = req.body;
    const encrypted_role = encryptRole(role);

    if (!formatCheck(/[a-zA-Z]+/, name)) { // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong NAME format" });
    }

    if (!formatCheck(/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/, email)) { // regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "Wrong EMAIL format" });
    }

    if (!pingEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    /* if (passwordStrength(password).value !== "Strong" || passwordStrength(password).value !== "Medium") {
      return res.status(400).json({ message: "Password is too weak" }); // this should be primarily checked in the front end before making the request
    } */
    
    let usedEmail = await User.exists({ email: email });

    let token = tokenGenerator();
    
    if (!usedEmail) { // email existence check within the db, returns if there is already an account with the email
      await User.create({ name, last_name, email, cellphone, password, encrypted_role, verified: false, token });
      res.status(200).json({ message: "User registered successfully" });

      const verificationLink = `https://localhost:3000/api/registro/verify-email?token=${token}&email=${email}`;

      const transporter = nodemailer.createTransport({
            service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: `Swivel <${process.env.EMAIL_ADDRESS}>`,
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