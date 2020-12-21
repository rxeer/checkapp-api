import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '@/@types/models/General';

const uploadAvatar = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const {
    payload: { id },
  } = req;
  //  @ts-ignore
  const file = req.files.file;

  res.json({ url: `${file.tempFilePath}/${file.name}` });
};

export default {
  uploadAvatar,
};
