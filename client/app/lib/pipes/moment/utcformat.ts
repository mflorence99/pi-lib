import * as moment from 'moment';

import {Pipe, PipeTransform} from '@angular/core';

/**
 * Pipe wrapper around moment.js
 */

@Pipe({ name: 'piUTCFormat' })

export class UTCFormatPipe implements PipeTransform {

  transform(date: Date,
            fmt: string): string {
    return moment(date).utc().format(fmt);
  }

}
