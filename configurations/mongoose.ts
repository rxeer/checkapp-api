import config from 'config';
import mongoose from 'mongoose';

export const configureConnection = (options: any = {}) => {
  if (config.has('database.config.host')) {
    const dbHost: string = config.get('database.config.host');

    //  @ts-ignore
    mongoose.Promise = Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(dbHost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...options,
    });
  }
};
