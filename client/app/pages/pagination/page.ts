import { Component } from '@angular/core';
import { TestDataSourceService } from './datasource';

/**
 * Pagination demo page
 */

@Component({
  selector: 'lib-pagination-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class PaginationPageComponent {

  /** ctor */
  constructor(public testData: TestDataSourceService) { }

}
