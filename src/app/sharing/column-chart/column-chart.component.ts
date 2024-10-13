import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions: Highcharts.Options | any;

  constructor(private service: ClaimService) {}

  ngOnInit() {
    this.service.getColumnChart().subscribe((data) => {
      const regions = data.map((item: any) => item.region);
      const averageClaimsProcessed = data.map((item: any) => item.average_claims_processed);
      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Regional Average Claims Processed'
        },
        xAxis: {
          categories: regions, 
          title: {
            text: 'Regions'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Average Claims Processed',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' claims'
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true 
            }
          }
        },
        series: [{
          name: 'Average Claims Processed',
          data: averageClaimsProcessed 
        }]
      };
    });
  }
}
