import cors from 'cors';
import express from 'express';

export const configureCors = (app: express.Application, options?: any) => {
  app.use(cors(options));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    );
    next();
  });
};
