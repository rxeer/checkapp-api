import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import countriesController from '@/controllers/categories.controller';

const router = promiseRouter();

router
  .route('/')
  .post(
    [body('name').isString().exists()],
    auth.required,
    countriesController.create
  )
  .get(auth.optional, countriesController.get);

router
  .route('/:categoryId')
  .put(
    [param('categoryId').isMongoId()],
    auth.required,
    countriesController.update
  )
  .delete(
    [param('categoryId').isMongoId()],
    auth.required,
    countriesController.remove
  );

export default router;
