import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap';

// Initialize the heatmap module
Heatmap(Highcharts);

@Component({
  selector: 'app-heat-chart',
  templateUrl: './heat-chart.component.html',
  styleUrls: ['./heat-chart.component.scss']
})
export class HeatChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1
    },
    title: {
      text: 'Average Processing Timeline'
    },
    xAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    yAxis: {
      categories: ['8 AM', '12 PM', '4 PM'],
      title: null
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#000000'
    },
    series: [{
      name: 'Sales per day',
      borderWidth: 1,
      type: 'heatmap',
      data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [1, 0, 24], [1, 1, 67]],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  };
}
