import { EnvService } from '../lib/services/env';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Simple operations on R-Pi GPIO pins 1-40
 */

@Injectable()
export class GPIOPinsService {

  constructor(private env: EnvService,
              private http: Http) { }

  setOne(pin: string,
         state: boolean): Observable<boolean[]> {
    const uri = `${this.env['PI_LIB_HOST']}/api/gpio/${pin}/${state}`;
    return this.http.put(uri, null)
      .map(response => response.json());
  }

}
