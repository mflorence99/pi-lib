import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';


/**
 * Pipe wrapper around moment.js
 */

@Pipe({ name: 'libFromUnixTime' })
export class FromUnixTimePipe implements PipeTransform {

  transform(value: any): any {
    return moment.unix(Number(value) / 1000);
  }

}
