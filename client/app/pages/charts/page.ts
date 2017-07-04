import { Component } from '@angular/core';

/**
 * Google charts demo page
 */

@Component({
  selector: 'lib-charts-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class ChartsPageComponent {

  chartData = {
    chartType: 'BarChart',
    dataTable: [
      ['Month', 'Value'],
      ['January',   Math.random()],
      ['February',  Math.random()],
      ['March',     Math.random()],
      ['April',     Math.random()],
      ['May',       Math.random()],
      ['June',      Math.random()],
      ['July',      Math.random()],
      ['August',    Math.random()],
      ['September', Math.random()],
      ['October',   Math.random()],
      ['November',  Math.random()],
      ['December',  Math.random()]
    ],
    options: {
      animation: {
        duration: 400,
        startup: true
      },
      chartArea: {
        height: '80%',
        width: '60%'
      },
      fontSize: 10,
      hAxis: {
        maxValue: 1,
        minValue: 0
      },
      height: 480,
      legend: {
        position: 'none'
      },
      width: 640
    }
  };

}
