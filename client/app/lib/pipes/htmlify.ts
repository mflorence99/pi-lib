import { Pipe, PipeTransform } from '@angular/core';


/**
 * Converts text where < and > are encoded as &lt; and &gt; into real HTML.
 *
 * NOTE: must pipe into [innerHTML]
 */

@Pipe({ name: 'libHTMLify' })

export class HTMLifyPipe implements PipeTransform {

  transform(s: string): string {
   return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

}
