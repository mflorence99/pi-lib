import * as express from 'express';

/**
 * Simple /isalive handler
 */

export function isalive(req: express.Request,
                        res: express.Response) {
  res.sendStatus(200);
};
