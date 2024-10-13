import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap';
import { ClaimService } from '../../service/claim.service';

Heatmap(Highcharts);

@Component({
  selector: 'app-heat-chart',
  templateUrl: './heat-chart.component.html',
  styleUrls: ['./heat-chart.component.scss']
})
export class HeatChartComponent implements OnInit {
  constructor(private service: ClaimService) {}
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
      categories: [] 
    },
    yAxis: {
      categories: [], 
      title: null
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#000000'
    },
    series: [{
      name: 'Average Processing',
      borderWidth: 1,
      type: 'heatmap',
      data: [], 
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  };

  ngOnInit() {
    this.service.getHeatChart().subscribe((data) => {
      console.log(data);
      this.chartOptions.xAxis.categories = data.stages;
      this.chartOptions.yAxis.categories = data.averages.map((_: any, index: any) => `Average ${index + 1}`); // Create labels for yAxis
      const heatmapData: any = [];
      data.averages.forEach((avgRow: any, rowIndex: any) => {
        avgRow.forEach((value: any, colIndex: any) => {
          heatmapData.push([colIndex, rowIndex, value]);
        });
      });
      this.chartOptions.series[0].data = heatmapData;
      this.Highcharts.chart('heat-map-container', this.chartOptions);
    });
  }
}
