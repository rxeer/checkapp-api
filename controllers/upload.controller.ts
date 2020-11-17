import boom from 'boom';
import { Request, Response } from 'express';

const uploadFile = (req: Request, res: Response) => {
  if (req.file && req.file.path) {
    return res.send({
      url: `${req.protocol}://${req.hostname}:3003/${req.file.path}`,
    });
  }

  throw boom.unsupportedMediaType('User not found');
};

export default {
  uploadFile,
};
