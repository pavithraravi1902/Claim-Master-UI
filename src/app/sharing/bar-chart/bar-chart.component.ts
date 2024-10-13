import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  constructor(private service: ClaimService){

  }
  Highcharts: typeof Highcharts = Highcharts; // Highcharts namespace
  chartOptions: Highcharts.Options | any = {
    chart: {
      type: 'bar' // Set the chart type to 'bar'
    },
    title: {
      text: 'Average Processing Timeline'
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
        text: 'Fruit eaten',
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
      bar: {
        dataLabels: {
          enabled: true // Enable data labels
        }
      }
    },
    series: [{
      name: 'Jane',
      data: [10, 15, 7, 12, 5] 
    }, {
      name: 'John',
      data: [8, 12, 5, 8, 10]
    }]
  };

  ngOnInit(){
    this.service.getBarChart().subscribe((data)=>{
      console.log(data);
    })
  }
}
