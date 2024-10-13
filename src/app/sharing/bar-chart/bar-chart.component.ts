import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Processing Timeline',
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Claim Stages',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Average Time Taken',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' hours',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [],
  };

  constructor(private service: ClaimService) {}

  ngOnInit() {
    this.fetchChartData();
  }

  fetchChartData() {
    this.service.getHeatChart().subscribe((data: any) => {
      console.log(data);
      const stages = data.stages;
      const seriesData = data.averages.map(
        (average: number[], index: number) => ({
          name: data.stages[index],
          data: average,
        })
      );

      this.chartOptions.xAxis.categories = stages; 
      this.chartOptions.series = seriesData; 
      this.renderChart(); 
    });
  }

  renderChart() {
    Highcharts.chart('bar-chart-container', this.chartOptions);
  }
}
