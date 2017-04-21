import {Pipe, PipeTransform} from '@angular/core';


/**
 * Makes a string breakable by adding a zero-width space after otherwise
 * non-breakabke soecial characters (like underscore).
 *
 * <a [href]="{{'very_long_URL'}}">
 *   {{'very_long_URL' | piBreakable}}
 * </a>
 *
 */

@Pipe({ name: 'piBreakable' })

export class BreakablePipe implements PipeTransform {

  transform(s: string,
            dflt = '') {
    if ((s === null) || (s === undefined))
      return dflt;
    else if (typeof s.replace === 'function')
      return s.replace(/([\/;:\)\]\}\d\.,_])/g, '\u200b$1');
    else return s;
  }

}
