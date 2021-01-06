import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import userCategoriesController from '@/controllers/user-categories.controller';

const router = promiseRouter();

router
  .route('/:userId/categories')
  .post(
    [body('name').exists(), body('description').isString().exists()],
    auth.required,
    //  @ts-ignore
    userCategoriesController.create
  )
  //  @ts-ignore
  .get(auth.required, userCategoriesController.get);

router
  .route('/:userId/categories/:categoryId')
  .put(
    [param('categoryId').isMongoId()],
    auth.required,
    //  @ts-ignore
    userCategoriesController.update
  )
  .delete(
    [param('categoryId').isMongoId()],
    auth.required,
    //  @ts-ignore
    userCategoriesController.remove
  );

export default router;
