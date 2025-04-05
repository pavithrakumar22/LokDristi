import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // ❌ Remove this line ↓
    // acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${uuidv4()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

export default upload;
