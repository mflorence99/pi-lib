import {Injectable} from '@angular/core';

/**
 * Exposes the server-side environment variables as prepared by the
 * build and deploy process as a standard Angular service.
 *
 * import { EnvService } from 'pi-lib';
 *
 * constructor(private env: EnvService) {
 *   console.log(this.env);
 * }
 *
 */

declare var ENV: any;

@Injectable()
export class EnvService {

  constructor() {
    Object.keys(ENV).forEach(k => this[k] = ENV[k]);
  }

}
