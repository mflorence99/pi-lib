import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';


/**
 * Pipe wrapper around moment.js
 */

@Pipe({ name: 'libDuration' })

export class DurationPipe implements PipeTransform {

  transform(value: any,
            fmt: any): string {
    return moment.duration(value, fmt).humanize();
  }

}
