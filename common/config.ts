/**
 * Common configuration used by both client-side and server-side code.
 *
 * NOTE: don't store environment data here, just settings you don't want as constants
 * and you want to be well-known.
 *
 * import { config } from '../config';
 *
 * console.log(config);
 *
 */

export class Config {

  gpioCaptureInterval = 1000;

}

export const config = new Config();
