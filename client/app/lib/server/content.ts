import * as express from 'express';
import * as path from 'path';

/**
 * Deploy static Angular-generated content
 */

export function content(req: express.Request,
                        res: express.Response) {
    const name = req.path.substring(1);
    if (name.startsWith('bower_components'))
      res.sendFile(path.join(__dirname, '../../../..', name));
    else if (name)
      res.sendFile(path.join(__dirname, '../../../../dist', name));
    else res.sendFile(path.join(__dirname, '../../../../dist', 'home.html'));
};
