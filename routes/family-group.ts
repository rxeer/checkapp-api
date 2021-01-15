import Router from 'koa-router';

import familyGroupController from '@/controllers/family-group.controller';

var router = new Router({
  prefix: '/api/v1/users',
});

router
  .post('/family-group', familyGroupController.create)
  .get('/family-group', familyGroupController.get);

router
  .put('/:userId/family-group/:familyId', familyGroupController.update)
  .delete('/:userId/family-group/:familyId', familyGroupController.remove);

export default router;
