import { Context } from 'koa';
import Router from 'koa-router';

import userController from '@/controllers/user.controller';

var router = new Router({
  prefix: '/users',
});

router
  .post(
    '/login',
    userController.login
  );

router
  .post(
    '/register',
    userController.register
);

router.put('/' userController.update);

router.get('/current', userController.getCurrent);

router.post('/logout', (ctx: Context) => {
  ctx.logout();
  ctx.redirect('/');
});

export default router;
