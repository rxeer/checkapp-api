import path from 'path';
import { Request } from 'express';
import multer, { StorageEngine, diskStorage } from 'multer';

const storage: StorageEngine = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, './public/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

export default upload;
