import { Pipe, PipeTransform } from '@angular/core';


declare var numeral: any;

/**
 * Pipe wrapper around numeral.js
 */

@Pipe({ name: 'libNumeral' })

export class NumeralPipe implements PipeTransform {

  transform(value: any,
            fmt: string): string {
    return numeral(Number(value)).format(fmt);
  }

}
