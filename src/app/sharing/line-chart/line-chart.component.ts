// // import { Component } from '@angular/core';
// // import * as Highcharts from 'highcharts';

// // @Component({
// //   selector: 'app-line-chart',
// //   templateUrl: './line-chart.component.html',
// //   styleUrls: ['./line-chart.component.scss']
// // })
// // export class LineChartComponent {
// //   Highcharts: typeof Highcharts = Highcharts; // Highcharts namespace
// //   chartOptions: Highcharts.Options = {
// //     title: {
// //       text: 'Sample Line Chart'
// //     },
// //     xAxis: {
// //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
// //     },
// //     yAxis: {
// //       title: {
// //         text: 'Values'
// //       }
// //     },
// //     series: [{
// //       name: 'Sample Data',
// //       type: 'line',
// //       data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
// //     }]
// //   };
// // }

// import { Component } from '@angular/core';
// import * as Highcharts from 'highcharts';
// import { ClaimService } from '../../service/claim.service';

// @Component({
//   selector: 'app-line-chart',
//   templateUrl: './line-chart.component.html',
//   styleUrls: ['./line-chart.component.scss']
// })
// export class LineChartComponent {
//   constructor(private service: ClaimService){

//   }
//   Highcharts: typeof Highcharts = Highcharts; // Highcharts namespace
//   selectedOption: 'month' | 'year' = 'month'; // Default to month

//   // Separate datasets for year and month
//   monthData = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]; // Sample month data
//   yearData = [100, 200, 150, 300, 400, 250, 500]; // Sample year data

//   // Initial chart options
//   chartOptions: Highcharts.Options | any = {
//     title: {
//       text: 'LOB Monthwise Average'
//     },
//     xAxis: {
//       categories: this.getCategories(this.selectedOption) // Get categories based on selection
//     },
//     yAxis: {
//       title: {
//         text: 'Values'
//       }
//     },
//     series: [{
//       name: this.selectedOption === 'month' ? 'Monthly Data' : 'Yearly Data',
//       type: 'line',
//       data: this.getChartData(this.selectedOption), // Get the appropriate data
//     }]
//   };

//   // Method to get categories based on the selected option
//   getCategories(option: 'month' | 'year'): string[] {
//     return option === 'month' 
//       ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
//       : ['2021', '2022', '2023', '2024', '2025', '2026', '2027']; // Example years
//   }

//   // Method to get data based on selected option
//   getChartData(option: 'month' | 'year'): number[] {
//     return option === 'month' ? this.monthData : this.yearData;
//   }

//   // Handle changes in the select field
//   onOptionChange(option: 'month' | 'year') {
//     this.selectedOption = option; // Update selected option
//     this.chartOptions.xAxis.categories = this.getCategories(option); // Update categories
//     this.chartOptions.series[0].data = this.getChartData(option); // Update data
//     this.chartOptions.series[0].name = option === 'month' ? 'Monthly Data' : 'Yearly Data'; // Update series name
//     Highcharts.chart('container', this.chartOptions); // Redraw chart
//   }

//   ngOnInit(){
//     this.service.getLineChart().subscribe((data)=>{
//       console.log(data)
//     })
//   }
// }


import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  constructor(private service: ClaimService) {}

  Highcharts: typeof Highcharts = Highcharts; // Highcharts namespace
  selectedOption: 'month' | 'year' = 'month'; // Default to month

  // Placeholder for the month and year data from the service
  monthData: number[] = [];
  yearData: number[] = [];
  categories: string[] = []; // To store categories (LOB names)

  // Initial chart options
  chartOptions: Highcharts.Options | any = {
    title: {
      text: 'LOB Average Time'
    },
    xAxis: {
      categories: this.getCategories(this.selectedOption), // Get categories based on selection
    },
    yAxis: {
      title: {
        text: 'Average Time'
      }
    },
    series: [{
      name: this.selectedOption === 'month' ? 'Monthly Data' : 'Yearly Data',
      type: 'line',
      data: this.getChartData(this.selectedOption), // Get the appropriate data
    }]
  };

  // Method to get categories based on the selected option
  getCategories(option: 'month' | 'year'): string[] {
    return this.categories; // Return the dynamically set categories
  }

  // Method to get data based on selected option
  getChartData(option: 'month' | 'year'): number[] {
    return option === 'month' ? this.monthData : this.yearData;
  }

  // Handle changes in the select field
  onOptionChange(option: 'month' | 'year') {
    this.selectedOption = option; // Update selected option
    this.chartOptions.xAxis.categories = this.getCategories(option); // Update categories
    this.chartOptions.series[0].data = this.getChartData(option); // Update data
    this.chartOptions.series[0].name = option === 'month' ? 'Monthly Data' : 'Yearly Data'; // Update series name
    Highcharts.chart('container', this.chartOptions); // Redraw chart
  }

  ngOnInit() {
    this.service.getLineChart().subscribe((data) => {
      // Process the received data to extract monthwise and yearwise average times
      const monthwiseAvg = data.monthwise_average;
      const yearwiseAvg = data.yearwise_average;

      // Set month data
      this.monthData = monthwiseAvg.map((avg: any) => avg.avg_time);
      this.categories = monthwiseAvg.map((avg: any) => avg.lob); // LOB names as categories

      // Set year data
      this.yearData = yearwiseAvg.map((avg: any) => avg.avg_time);

      // Update chart with initial data
      this.chartOptions.series[0].data = this.getChartData(this.selectedOption);
      this.chartOptions.xAxis.categories = this.getCategories(this.selectedOption);
      Highcharts.chart('line-chart-container', this.chartOptions); // Redraw chart
    });
  }
}
