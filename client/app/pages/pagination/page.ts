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

  exportFields = ['firstName', 'lastName', 'emailAddress', 'jobTitle', 'phoneNumber', 'city', 'state', 'amount'];
  exportHeader = ['First Name', 'Last Name', 'Email Address', 'Job Title', 'Phone Number', 'City', 'State', 'Balance'];

  /** ctor */
  constructor(public testData: TestDataSourceService) { }

}
