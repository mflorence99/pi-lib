import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Deploy static Angular-generated content
 */

 const RETRIES = 5;

export function content(req: express.Request,
                        res: express.Response) {

    const name = req.path.substring(1);

    // this is awkward: we know dist is SOMEWHERE based on build config
    // we accept the over head because we are dealing with an SPA
    // and the content gets loaded only once

    let file, i, pfx = '';
    for (i = 0; i < RETRIES; i++) {
      file = path.join(__dirname, `${pfx}dist`, name? name : 'home.html');
      try {
        fs.accessSync(file);
        break;
      }
      catch (ignored) { }
      pfx = `../${pfx}`;
    }

    // only try so many times then give up

    if (i === RETRIES)
      res.sendStatus(404);
    else res.sendFile(file);
};
