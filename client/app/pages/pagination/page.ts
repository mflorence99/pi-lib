import { Component } from '@angular/core';
import { TestDataSourceService } from './datasource';
import { ToolbarControl } from '../../lib/decorators/toolbar-control';

/**
 * Pagination demo page
 */

@Component({
  selector: 'lib-pagination-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class PaginationPageComponent {

  xxx = 'Hello!';

  /** ctor */
  constructor(public testData: TestDataSourceService) { }

  @ToolbarControl({
    order: 2,
    tag: 'Expert Mode',
    type: 'toggle'
  })
  expertMode(event) {
    console.log(event.target.checked, this.xxx);
  }

  @ToolbarControl({
    checked: true,
    order: 1,
    tag: 'Help Mode',
    type: 'checkbox'
  })
  helpMode(event) {
    console.log(event.target.checked);
  }

  @ToolbarControl({
    icon: 'help',
    order: 3,
    type: 'button'
  })
  whatsup(event) {
    console.log(event.target.checked);
  }


}
