import { Response, Request } from 'express';
import { IGetUserAuthInfoRequest } from '@/@types/models/General';

const uploadAvatar = async (req: Request, res: Response) => {
  const {
    //  @ts-ignore
    payload: { id },
  } = req;
  //  @ts-ignore
  const file = req.files.file;

  res.json({ url: `${file.tempFilePath}/${file.name}` });
};

export default {
  uploadAvatar,
};
