import morgan from 'morgan';
import express from 'express';

export const configureLogger = (app: express.Application, options?: any) => {
  app.use(morgan('common', options));
};
