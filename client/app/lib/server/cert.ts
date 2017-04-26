import * as fs from 'fs';

/**
 * Self-signed cert for HTTPS
 */

export const cert = {
  key  : fs.readFileSync(`${__dirname}/ssl/key.pem`),
  ca   : fs.readFileSync(`${__dirname}/ssl/csr.pem`),
  cert : fs.readFileSync(`${__dirname}/ssl/cert.pem`)
};
