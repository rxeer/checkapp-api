import { Request, Response } from 'express';
import promiseRouter from 'express-promise-router';
import { body } from 'express-validator/check';

import auth from './auth';
import userController from '@/controllers/user.controller';

const router = promiseRouter();

router
  .route('/login')
  .post(
    [
      body('email').isEmail().withMessage('Email is not valid'),
      body('password').exists(),
    ],
    auth.optional,
    userController.login
  );

router
  .route('/register')
  .post(
    [
      body('email').isEmail().exists().withMessage('Email is not valid'),
      body('password').exists(),
      body('firstName').exists(),
      body('lastName').exists(),
    ],
    auth.optional,
    userController.register
  );

//  @ts-ignore
router.route('/').put([], auth.required, userController.update);

//  @ts-ignore
router.route('/current').get(auth.required, userController.getCurrent);

router.route('/logout').post((req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

export default router;
