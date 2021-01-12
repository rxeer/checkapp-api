import auth from './auth';
import incomesController from '@/controllers/incomes.controller';

const router = promiseRouter();

router
  .route('/:userId/incomes')
  .post(
    [
      body('date').exists(),
      body('type').exists(),
      body('income').exists(),
      body('description').isString().exists(),
    ],
    auth.required,
    //  @ts-ignore
    incomesController.create
  )
  .get(auth.required, incomesController.get);

router
  .route('/:userId/incomes/:incomeId')
  //  @ts-ignore
  .put([param('incomeId').isMongoId()], auth.required, incomesController.update)
  .delete(
    [param('incomeId').isMongoId()],
    auth.required,
    //  @ts-ignore
    incomesController.remove
  );

export default router;
