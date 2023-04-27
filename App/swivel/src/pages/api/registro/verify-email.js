import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler (req, res) {
  if(req.method === "PUT"){
        const token = req.query.token; // retrieve the token from the query string
        const email = req.query.email; // retrieve the email from the query string
    
        dbConnect();

        let verification = await User.exists({ token: token, email: email });

        if (verification) {
          await User.findOneAndUpdate({ email: email }, { verified: true, token: null })
          res.status(200).json({ message: "Email has been validated" }); // display a confirmation message to the user
        }
        else {
          res.status(400).json({ message: "Email could not be validated" }); // display an error message to the user
        }
  }
  else {
    res.status(400).json({ message: "Wrong request method" });
  }
};
  