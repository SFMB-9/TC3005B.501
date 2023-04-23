import EmailVerification from "../../models/emailVerification";
import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

export default async function handler (req, res) {
    const token = req.query.token; // retrieve the token from the query string
  
    dbConnect();

    let verification = await EmailVerification.exists({ token: token });

    if (verification) {
        let account = EmailVerification.findOneAndDelete({ token: token });
        let email = account.email;
        User.findOneAndUpdate({ email: email }, {verified: true})
    }
  
    res.status(200).json({ message: "Email has been validated" }); // display a confirmation message to the user
  };
  