import Router from 'koa-router';

import familyGroupController from '@/controllers/family-group.controller';

const router = new Router({
  prefix: '/api/v1/users',
});

router
  .post('/:userId/family-group', familyGroupController.create)
  .get('/:userId/family-group', familyGroupController.get);

router
  .put('/:userId/family-group/:familyId', familyGroupController.update)
  .delete('/:userId/family-group/:familyId', familyGroupController.remove);

export default router;
