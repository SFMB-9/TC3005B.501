/* 
@catlikeflyer

H_028 Endpoint de Baja de documento
*/

import fs from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import { getSession } from 'next-auth/client';

const upload = multer({ dest: 'public/uploads/' });

// Maybe change this as a util function
const requireAuthentication = (handler) => async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  return handler(req, res);
};

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const result = await db.collection('documents').findOne({ _id: new ObjectId(id) });

    if (!result) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    // Delete file from server storage location, change location to cloud storage
    const filePath = `public/uploads/${id}.pdf`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting file' });
        return;
      }

      // Delete document from database
      db.collection('documents').deleteOne({ _id: new ObjectId(id) }).then(() => {
        res.status(200).json({ message: 'File deleted successfully' });
      }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error deleting document' });
      });
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requireAuthentication(upload.single('document')(handler));
