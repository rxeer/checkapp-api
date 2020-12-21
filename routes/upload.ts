import promiseRouter from 'express-promise-router';

import auth from './auth';
import uploadController from '@/controllers/upload.controller';

const router = promiseRouter();

//  @ts-ignore
router.route('/avatar').post([], auth.required, uploadController.uploadAvatar);

export default router;
