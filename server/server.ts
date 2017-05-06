import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';

import { config } from './config';
import { content } from './lib/content';
import { cors } from './lib/cors';
import { deploy } from './lib/deploy';
import { isalive } from './lib/isalive';

console.log(config);

const app: express.Application = express();

const cert = {
  key  : fs.readFileSync(`${__dirname}/key.pem`),
  ca   : fs.readFileSync(`${__dirname}/csr.pem`),
  cert : fs.readFileSync(`${__dirname}/cert.pem`)
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.get('/isalive', isalive);
app.get('*', content);

deploy(app, 3000, cert);
