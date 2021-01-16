import Router from 'koa-router';

import userCategoriesController from '@/controllers/user-categories.controller';

const router = new Router({
  prefix: '/api/v1/users',
});

router
  .post('/:userId/categories', userCategoriesController.create)
  .get('/:userId/categories', userCategoriesController.get);

router
  .put('/:userId/categories/:categoryId', userCategoriesController.update)
  .delete('/:userId/categories/:categoryId', userCategoriesController.remove);

export default router;
