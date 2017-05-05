import { } from '@types/marked';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe wrapper around marked.js
 */

@Pipe({ name: 'libMarkdown' })

export class MarkdownPipe implements PipeTransform {

  public static setOptions(options: MarkedOptions): void {
    marked.setOptions(options);
  }

  public transform(markdown: string,
                   options?: MarkedOptions): string {
    return markdown? marked(markdown, options) : '';
  }

}
