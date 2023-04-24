import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import formatCheck from "../../../utils/regex";
import pingEmail from "../../../utils/ping";
import tokenGenerator from "../../../utils/token-generator";
import nodemailer from 'nodemailer';
import EmailVerification from "../../../models/emailVerification"; 

import { encryptRole } from "../../../utils/crypto";

/* 
default register function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, email, password, role } = req.body;
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
    
    let usedEmail = await User.exists({ email: email });
    
    if (!usedEmail) { // email existence check within the db, returns if there is already an account with the email
      await User.create({ name, email, password, encrypted_role, verified: false });
      res.status(200).json({ message: "User registered successfully" });
    }
    else {
      res.status(400).json({ message: "Account already exists" });
    }

    let token = tokenGenerator();

    const verificationLink = `https://localhost:3000/registro/verify-email?token=${token}`; 

    await EmailVerification.create({email: email, token: token});

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
}