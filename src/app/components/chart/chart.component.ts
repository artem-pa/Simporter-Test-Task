import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexTheme, ApexYAxis } from "ng-apexcharts";

import { MONTHS } from 'src/app/constants/date.constant';
import { IBook } from 'src/app/interfaces/book.interface';

type ChartData = {
  xaxis: string[];
  yaxis: number[];
}
type ChartOptions = {
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  theme: ApexTheme;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  @Input() bookList: IBook[] = [];

  constructor() { }
  public chartOptions: ChartOptions = {
    series: [
      {
        name: "Books count",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "Number of books by publish date",
      style: { fontSize: '20px' }
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Publish date',
        style: {
          cssClass: 'chart-axis'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Books count',
        style: {
          cssClass: 'chart-axis'
        }
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#ababab'
      }
    }
  }

  ngOnInit(): void {
    this.chartOptions.series = [{
      data: this.chartData.yaxis
    }]
    this.chartOptions.xaxis.categories = this.chartData.xaxis;
  }

  get chartData(): ChartData {
    const sortedBooks = [...this.bookList].sort((a, b) => (Date.parse(a.publishDate) - Date.parse(b.publishDate)));
    const result: ChartData = { xaxis: [], yaxis: [] };
    sortedBooks.forEach(book => {
      const date = new Date(book.publishDate);
      const dateString = MONTHS[date.getMonth()] + ' ' + date.getFullYear();
      if (result.xaxis.includes(dateString)) {
        result.yaxis[result.xaxis.indexOf(dateString)]++;
        return;
      }
      result.xaxis.push(dateString);
      result.yaxis[result.xaxis.length - 1] = 1;
    })
    return result;
  }
}
