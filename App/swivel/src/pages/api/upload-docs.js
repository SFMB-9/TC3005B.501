import { v4 as uuid} from 'uuid' //npm install uuid
import multer from 'multer'//npm install --save multer
import connectToDatabase from '@/utils/mongodb'

connectToDatabase();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        const filenameParts = file.originalname.split('.');
        const extension = filenameParts.pop()
        const filename = `${filenameParts.join('.')}_${Date.now()}.${extension}`
        cb(null, filename)
    },
})

const upload = multer({storage})

export default upload.single('file')

export const config = {
    api: {
        bodyParser: false,
    },
}

export async function post(req, res) {
    try {
        const { filename } = req.file;

        const document = new Document({
            filename,
            filepath: '/uploads/${filename}',
        });

        await document.save()
        res.status(201).json(document)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
}