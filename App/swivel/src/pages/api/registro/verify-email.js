import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler (req, res) {
  if(req.method === "POST"){
    const { token, email } = req.query;
    dbConnect();

    let verification = await User.exists({ email_verification_token: token, email: email });

    if (verification) {
      await User.findOneAndUpdate({ email: email }, { is_account_verified: true, email_verification_token: null })
      res.status(200).json({ message: "Email has been validated" }); // display a confirmation message to the user
    }
    else {
      res.status(401).json({ message: "Email could not be validated" }); // display an error message to the user
    }
  }
  else {
    res.status(400).json({ message: "Wrong request method" });
  }
} 