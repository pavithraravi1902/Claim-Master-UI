import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  constructor(private service: ClaimService) {}

  Highcharts: typeof Highcharts = Highcharts;
  selectedOption: 'month' | 'year' = 'month'; // Default selection is 'month'

  options = [
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ];

  monthData: { [key: string]: number[] } = {}; // LOB-wise data for months
  yearData: { [key: string]: number[] } = {};  // LOB-wise data for years
  categories: string[] = []; // Categories for x-axis

  chartOptions: Highcharts.Options | any = {
    title: {
      text: 'LOB Average Time'
    },
    xAxis: {
      categories: this.getCategories(this.selectedOption), // Dynamically set categories
    },
    yAxis: {
      title: {
        text: 'Average Time'
      },
      tickInterval: 10, // Adjust based on data scale
    },
    series: [] // Will be populated dynamically based on API data
  };

  // Method to return categories for 'month' or 'year'
  getCategories(option: 'month' | 'year'): string[] {
    if (option === 'month') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
    } else {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString()).reverse(); // Last 10 years
    }
  }

  // Event handler for changing the display option (month/year)
  onSelectionChange1(event: any) {
    this.selectedOption = event.target.value as 'month' | 'year'; // Update based on the selected value
    this.updateChart(); // Update the chart with new data and categories
  }

  ngOnInit() {
    // Fetch the data from the API when the component initializes
    this.service.getLineChart().subscribe((data) => {
      const monthwiseAvg = data.monthwise_average;
      const yearwiseAvg = data.yearwise_average;

      // Process month-wise data
      monthwiseAvg.forEach((avg: any) => {
        const lob = avg.lob;
        const avg_time = avg.avg_time;
        if (!this.monthData[lob]) {
          this.monthData[lob] = [];
        }
        this.monthData[lob].push(avg_time);
      });

      // Process year-wise data
      yearwiseAvg.forEach((avg: any) => {
        const lob = avg.lob;
        const avg_time = avg.avg_time;
        if (!this.yearData[lob]) {
          this.yearData[lob] = [];
        }
        this.yearData[lob].push(avg_time); 
      });

      this.updateChart(); // Initially update the chart with month data
    });
  }

  // Method to update the chart based on the selected option (month/year)
  private updateChart() {
    const data = this.selectedOption === 'month' ? this.monthData : this.yearData;
    
    // Prepare the series for the chart based on the selected data
    const series: Highcharts.SeriesLineOptions[] = Object.keys(data).map(lob => ({
      name: lob, // Use LOB (line of business) as the series name
      type: 'line', // Line chart
      data: data[lob], // Data for the selected option (month/year)
    }));

    // Update the chart options
    this.chartOptions.series = series;
    this.chartOptions.xAxis.categories = this.getCategories(this.selectedOption); // Update the categories

    // Render the updated chart
    Highcharts.chart('line-chart-container', this.chartOptions); 
  }
}
