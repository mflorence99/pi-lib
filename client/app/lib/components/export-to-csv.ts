import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

/** Export to CSV component */

@Component({
  selector: 'lib-export-to-csv',
  styleUrls: ['export-to-csv.less'],
  templateUrl: 'export-to-csv.html'
})

export class ExportToCSVComponent {

  @Input() filename: string;

  @Output() ready = new EventEmitter<boolean>();

  @ViewChild('link') link: ElementRef;

  /** Perform export */
  export(data: any[][]) {
    if (data && (data.length > 0)) {
      // first convert data array to CSV
      const csv = data.map(row => {
        const items = row.map(col => {
          if ((col === null) || (col === undefined))
            return '';
          else if (Array.isArray(col) || (typeof col === 'object'))
            return `"${JSON.stringify(col).replace(new RegExp('"', 'g'), '')}"`;
          else if (typeof col.replace === 'function')
            return `"${col.replace(new RegExp('"', 'g'), '\\"')}"`;
          else return col;
        });
        return items.join(',');
      });
      // then download it from Blob
      const blob = new Blob([csv.join('\n')], {type: 'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const link = this.link.nativeElement;
      link.setAttribute('href', url);
      link.setAttribute('download', this.filename);
      link.click();
    }
  }

  /** Ready to accept data to export */
  fetch() {
    this.ready.emit(true);
  }

}
