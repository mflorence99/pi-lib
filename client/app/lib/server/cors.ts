import * as express from 'express';

/**
 * Enable CORS
 */

export function cors(req: express.Request,
                     res: express.Response,
                     next: express.NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
