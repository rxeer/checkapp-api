import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import familyGroupController from '@/controllers/family-group.controller';

const router = promiseRouter();

router
  .route('/:userId/family-group')
  .post(
    [body('name').exists(), body('description').exists()],
    auth.required,
    //  @ts-ignore
    familyGroupController.create
  )
  .get(auth.required, familyGroupController.get);

router
  .route('/:userId/family-group/:familyId')
  .put(
    [param('familyId').isMongoId()],
    auth.required,
    //  @ts-ignore
    familyGroupController.update
  )
  .delete(
    [param('familyId').isMongoId()],
    auth.required,
    //  @ts-ignore
    familyGroupController.remove
  );

export default router;
