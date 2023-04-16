
import fs from 'fs-extra';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads', // Change destination to cloud storage
});

const upload = multer({
  storage,
});

export default async function handler(
  req, res
) {
  const fileId = req.body._id // or req.query.id
  const filePath = path.join(process.cwd(), `/public/uploads/${fileId}.pdf`);
  if (await fs.pathExists(filePath)) {
    res.setHeader('Content-Disposition', `attachment; filename=${fileId}.pdf`);
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).end();
  }
}