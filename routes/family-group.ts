import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import familyGroupController from '@/controllers/family-group.controller';

const router = promiseRouter();

//  @ts-ignore
router
  .route('/:userId/family-group')
  .post(
    [body('name').exists(), body('description').exists()],
    auth.required,
    familyGroupController.create
  )
  .get(auth.required, familyGroupController.get);

//  @ts-ignore
router
  .route('/:userId/family-group/:familyId')
  .put(
    [param('familyId').isMongoId()],
    auth.required,
    familyGroupController.update
  )
  .delete(
    [param('familyId').isMongoId()],
    auth.required,
    familyGroupController.remove
  );

export default router;
