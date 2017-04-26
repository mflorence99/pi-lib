import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as gpio from './gpio';

import { config } from './config';
import { content } from './lib/content';
import { cors } from './lib/cors';
import { deploy } from './lib/deploy';
import { isalive } from './lib/isalive';

console.log(config);

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.get('/isalive', isalive);
gpio.routes(app);
app.get('*', content);

deploy(app, 3000);
gpio.ws(app, 4000);
