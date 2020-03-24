import promiseRouter from 'express-promise-router';

import auth from './auth';
import upload from '@/configurations/storage';
import uploadController from '@/controllers/upload.controller';

const router = promiseRouter();

router.route('/file').post(upload.single('file'), uploadController.uploadFile);

export default router;
