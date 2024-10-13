import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('containerPieChart', { static: false }) container!: ElementRef; // Ensure it's initialized correctly

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options | any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Stagewise Time Taken'
    },
    series: [{
      name: 'Stages',
      colorByPoint: true,
      type: 'pie',
      data: [] // Start with an empty data array
    }]
  };

  constructor(private service: ClaimService) {}

  ngAfterViewInit() {
    if (this.container) {
      console.log(this.container.nativeElement);  // Ensure the element is loaded before accessing nativeElement
    } else {
      console.log('Container is not initialized');
    }
  }

  ngOnInit() {
    this.fetchChartData(); // Fetch data on component initialization
  }

  fetchChartData() {
    this.service.getPieChart().subscribe((data) => {
      console.log(data); // Log the fetched data to ensure it's correct

      // Assuming the backend returns data in this format:
      // [
      //   { "average_time_taken": 5.0, "stage": "CLAIM_LOADED" },
      //   { "average_time_taken": 5.8, "stage": "CLAIM_REGISTERED" }
      // ]

      const seriesData = data.map((item: any) => ({
        name: item.stage.replace('_', ' '), // Replace underscores with spaces for better readability
        y: item.average_time_taken // Use the average_time_taken for the pie value
      }));

      this.chartOptions.series[0].data = seriesData; // Update the chart data
      this.renderChart(); // Render the chart
    });
  }

  renderChart() {
    Highcharts.chart(this.container.nativeElement, this.chartOptions); // Ensure it renders in the correct container
  }
}
