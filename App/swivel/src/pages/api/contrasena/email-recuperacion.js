import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        
        const verificationLink = `http://localhost:3000/contrasena/email-recuperacion?email=${email}`; // cambiar a http://localhost:3000/contrasena/recuperar-contrasena?email=${email} 

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
            subject: 'Recuperación de contraseña',
            html: `<p>Click the following link to recover your password:</p> <p><a href="${verificationLink}">Recover</a></p>`,
        };

        transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
            console.log('Error');
            } else {
            console.log('Email Sent');
            }
        });

        res.status(200).json({ message: "Recovery email sent" });
    }
    else {
        res.status(400).json({ message: "Wrong request method" });
    }
}