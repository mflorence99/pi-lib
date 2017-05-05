import * as fs from 'fs';

/**
 * Self-signed cert for HTTPS
 */

export const cert = {
  key  : fs.readFileSync(`${__dirname}/key.pem`),
  ca   : fs.readFileSync(`${__dirname}/csr.pem`),
  cert : fs.readFileSync(`${__dirname}/cert.pem`)
};
