import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent {
  Highcharts: typeof Highcharts = Highcharts; // Highcharts namespace
  chartOptions: Highcharts.Options | any = {
    chart: {
      type: 'column' // Set the chart type to 'column'
    },
    title: {
      text: 'Regional Average'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges', 'Pears', 'Grapes'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Fruits eaten',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' fruits'
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true // Enable data labels
        }
      }
    },
    series: [{
      name: 'Jane',
      data: [10, 15, 7, 12, 5] // Sample data
    }, {
      name: 'John',
      data: [8, 12, 5, 8, 10]
    }]
  };
}
