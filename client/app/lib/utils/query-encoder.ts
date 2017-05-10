import { QueryEncoder } from '@angular/http';

/**
 * Custom QueryEncoder needed because Ratpack has different assumptions than Angular2
 *
 * See https://angular.io/docs/ts/latest/api/http/index/URLSearchParams-class.html
*/

export class LibQueryEncoder extends QueryEncoder {

  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

}
