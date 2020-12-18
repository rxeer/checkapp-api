import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import productsController from '@/controllers/products.controller';

const router = promiseRouter();

//  @ts-ignore
router
  .route('/:userId/products')
  .post(
    [
      body('createdDate').isString().exists(),
      body('count').isString().exists(),
      body('category').exists(),
      body('familyGroup').exists(),
    ],
    auth.required,
    productsController.createProduct
  )
  //  @ts-ignore
  .get(auth.optional, productsController.get);

//  @ts-ignore
router
  .route('/:userId/products/:productId')
  .put(
    [param('productId').isMongoId()],
    auth.required,
    productsController.update
  )
  .delete(
    [param('productId').isMongoId()],
    auth.required,
    productsController.remove
  );

export default router;
