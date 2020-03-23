import './moduleAlias.ts';

import boom from 'boom';
import express from 'express';

import router from '@/routes';
import {
  configureCors,
  configureLogger,
  configureConnection
} from '@/configurations';

const app: express.Application = express();

configureCors(app);
configureLogger(app);
configureConnection();

app.use('/api/v1', router);

app.use(() => {
  throw boom.notFound('Not found');
});

app.listen(process.env.PORT);
