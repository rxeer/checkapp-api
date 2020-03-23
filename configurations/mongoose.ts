import config from 'config';
import mongoose from 'mongoose';

export const configureConnection = (options: any = {}) => {
  if (config.has('database.config.host')) {
    const dbHost = config.get('database.config.host');

    mongoose.Promise = Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    //@ts-ignore
    mongoose.connect(dbHost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...options
    });
  }
};
