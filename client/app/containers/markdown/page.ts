import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * Markdown demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-markdown-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class MarkdownPageComponent { }
