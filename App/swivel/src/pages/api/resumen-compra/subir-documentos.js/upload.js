import admin from "firebase-admin";
import formidable from "formidable";

/**
 * This is a Firebase Storage upload endpoint.
 *
 * It expects a POST request with a file in the body.
 *
 * Se tiene que mandar como body la informacion de un <form> con el atributo enctype="multipart/form-data"
 *
 * @catlikeflyer
 */

const serviceAccount = require("@/utils/firebase/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "your-firebase-storage-bucket", // <-- this is your Firebase Storage Bucket name
  });
}

const bucket = admin.storage().bucket();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm(); // 

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to process file upload." });
      }

      const file = files.file;
      const fileBuffer = await fs.promises.readFile(file.path);

      const fileName = `${file.name}_${Date.now()}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.type,
        },
      });

      stream.on("error", (error) => {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to upload file to Firebase Storage." });
      });

      stream.on("finish", () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        return res.status(200).json({ url });
      });

      stream.end(fileBuffer);
    });
  } else {
    res.status(405).json({ error: "Only POST requests are allowed." });
  }
}
