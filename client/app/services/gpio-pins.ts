import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { EnvService } from '../lib/services/env';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Simple operations on R-Pi GPIO pins 1-40
 */

@Injectable()
export class GPIOPinsService {

  /** ctor */
  constructor(private env: EnvService,
              private http: Http) { }

  /** Observe the state of all the pins */
  getAll(): Observable<boolean[]> {
    const ws = new $WebSocket(`${this.env['PI_LIB_WS']}/ws/gpio`);
    return ws.getDataStream()
      .map(response => JSON.parse(response.data));
  }

  /** Set the state of one pin, returning state of all of them */
  setOne(pin: string,
         state: boolean): Observable<boolean[]> {
    const uri = `${this.env['PI_LIB_HOST']}/api/gpio/${pin}/${state}`;
    return this.http.put(uri, null)
      .map(response => response.json());
  }

}
