import * as chalk from 'chalk';
import * as express from 'express';
import * as https from 'https';
import * as rpio from 'rpio';

import { config } from './config';

/**
 * Simple operations on R-Pi GPIO pins 1-40
 */

const PINS = [1, 40];

const STATES = new Map([
  ['false', rpio.LOW],
  ['true', rpio.HIGH]
]);

const LOOKUP = new Map([
  [rpio.LOW, false],
  [rpio.HIGH, true]
]);

/**
 * Initialize the pins
 */
for (let pin = PINS[0]; pin <= PINS[1]; pin++) {
  try {
    rpio.open(pin, rpio.OUTPUT, rpio.LOW);
  } catch (ignored) { }
}

process.on('SIGINT', () => {
  for (let pin = PINS[0]; pin <= PINS[1]; pin++) {
    try {
      rpio.write(pin, rpio.LOW);
      rpio.close(pin, rpio.PIN_RESET);
    } catch (ignored) { }
  }
  process.exit();
});

/**
 * Pin operations
 */

function getAll(): boolean[] {
  const states: boolean[] = [];
  for (let pin = PINS[0]; pin <= PINS[1]; pin++) {
    try {
      states.push(LOOKUP.get(rpio.read(pin)));
    } catch (error) {
      states.push(false);
    }
  };
  return states;
};

function setOne(pin: number,
                state: boolean) {
  try {
    rpio.write(pin, STATES.get(String(state)));
  } catch (ignored) { }
};

/**
 * Routes for GPIO operations
 */

export function routes(app: express.Application) {

  app.get('/api/gpio',
    (req: express.Request, res: express.Response) => {
      const states = getAll();
      console.log(`GPIO STATE ${JSON.stringify(states)}`);
      res.json(states);
    });

  app.put('/api/gpio/:pin/:state',
    (req: express.Request, res: express.Response) => {
      setOne(Number(req.params['pin']), req.params['state'] === 'true');
      console.log(`GPIO PIN ${JSON.stringify(req.params)}`);
      res.json(getAll());
    });

};

/**
 * Web socket for continuous GPIO state
 */

export function ws(app: express.Application,
                   port: number,
                   cert: any) {

  const server = https.createServer(cert).listen(port);
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({path: '/ws/gpio', server: server});
  console.log(chalk.green('WS /ws/gpio'), `localhost:${port}`);

  wss.on('connection', ws => {
    let timer = null;
    const sender = () => {
      ws.send(JSON.stringify(getAll()), error => {
        if (error && timer)
          clearInterval(timer);
      });
    };
    timer = setInterval(sender, config.gpioCaptureInterval);
  });

};
