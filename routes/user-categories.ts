import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import userCategoriesController from '@/controllers/user-categories.controller';

const router = promiseRouter();

//  @ts-ignore
router
  .route('/:userId/categories')
  .post(
    [body('name').exists(), body('description').isString().exists()],
    auth.required,
    userCategoriesController.create
  )
  //  @ts-ignore
  .get(auth.required, userCategoriesController.get);

//  @ts-ignore
router
  .route('/:userId/categories/:categoryId')
  .put(
    [param('categoryId').isMongoId()],
    auth.required,
    userCategoriesController.update
  )
  .delete(
    [param('categoryId').isMongoId()],
    auth.required,
    userCategoriesController.remove
  );

export default router;
