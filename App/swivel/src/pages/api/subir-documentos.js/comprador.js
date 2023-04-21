/*
H_016: Endpoint de subir documento como Usuario Comprador

@catlikeflyer
*/
import { getSession } from "next-auth/client";
import multer from "multer"; // Import package
import { v4 as uuidv4 } from "uuid"; // Import package
import { connectToDatabase } from "@/utils/mongodb";

const thisUserType = "comprador";

// Helper function to upload files
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); // check storage location, if possible cloud storage
    },
    filename: (req, file, cb) => {
      const fileName = `${uuidv4()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, multer will handle it
  },
};

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      const userType = session.user.userType;

      if (userType !== thisUserType) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      upload.single("document")(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to upload document" });
        }

        const { title, description } = req.body;
        const filePath = req.file.path;

        const result = await db
          .collection("documentos-" + thisUserType)
          .insertOne({ title, description, filePath, userId: session.user.id });

        if (!result) {
          return res.status(500).json({ message: "Failed to upload document" });
        }

        return res
          .status(200)
          .json({ message: "Document uploaded successfully" });
      });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
