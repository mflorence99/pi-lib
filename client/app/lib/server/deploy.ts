import * as chalk from 'chalk';
import * as express from 'express';
import * as https from 'https';

/**
 * Deploy HTTPS server
 */

export function deploy(app: express.Application,
                       port: number,
                       cert: any): https.Server {
  const server = https.createServer(cert, app);
  server.listen(port, () => {
    console.log(chalk.green('HTTPS'), `localhost:${port}`);
  });
  return server;
};
