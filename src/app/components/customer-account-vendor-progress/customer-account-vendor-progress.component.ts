import { Component, OnInit,ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-customer-account-vendor-progress',
  templateUrl: './customer-account-vendor-progress.component.html',
  styleUrls: ['./customer-account-vendor-progress.component.css']
})
export class CustomerAccountVendorProgressComponent implements OnInit {

  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Car Products",
          data: [44, 55, 41, 64]
        },
        {
          name: "Motarcycle Products",

          data: [53, 32, 33, 52]
        },
        {
          name: "Bicycle",
           
          data: [53, 12, 32, 52]
        },
        {
          name: "Oils",
          data: [44, 55, 41, 64]
        }
      ],
      chart: {
        type: "bar",
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#1f1e1e"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ["Liked", "Explored", "In-Cates", "Rated"]
      }
    };
  }

}
