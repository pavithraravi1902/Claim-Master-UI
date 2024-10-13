import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('containerPieChart', { static: false }) container!: ElementRef; // Add static: false to ensure it's initialized correctly

  Highcharts: typeof Highcharts = Highcharts;
 isHeatChart: boolean = false; // Default view is bar chart

  toggleChart() {
    this.isHeatChart = !this.isHeatChart; // Toggle between heat map and bar chart
  }
  chartOptions: Highcharts.Options | any= {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      renderTo: 'container-pie-chart',  // Explicitly render the chart in the container ID
    },
    title: {
      text: 'Sample Pie Chart'
    },
    series: [{
      name: 'Categories',
      colorByPoint: true,
      type: 'pie',
      data: [{
        name: 'Category 1',
        y: 61.41,
      }, {
        name: 'Category 2',
        y: 11.84,
      }, {
        name: 'Category 3',
        y: 10.85,
      }]
    }]
  };

  ngAfterViewInit() {
    if (this.container) {
      console.log(this.container.nativeElement);  // Ensure the element is loaded before accessing nativeElement
    } else {
      console.log('Container is not initialized');
    }
  }
}
