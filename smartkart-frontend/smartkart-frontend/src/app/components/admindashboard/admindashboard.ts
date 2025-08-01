import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../service/order-service';
import { DashboardSummary} from '../../model/AdminOrder.model';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ApexTitleSubtitle,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  
  ApexAxisChartSeries,
  ApexPlotOptions
} from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  dataLabels: ApexDataLabels | any;
  markers: ApexMarkers|any;
  title: ApexTitleSubtitle|any;
  yaxis: ApexYAxis|any;
  xaxis: ApexXAxis|any;
  tooltip: ApexTooltip|any;
  stroke: ApexStroke|any;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;

  seriess: ApexAxisChartSeries |any;
  plotOptions: ApexPlotOptions|any;
  colorss: string[];
  
};

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css'
})
export class Admindashboard implements OnInit{
  
  summaryCards: any[] = [];
  recentOrders: any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public chart1options!: Partial<ChartOptions>;
  public chart2options!: Partial<ChartOptions>;
  public chart3options!: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions>= {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return "";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
  };

  constructor(private orderService:OrderService,
    private cdr:ChangeDetectorRef
  ){
    this.chartOptions = {
      series: [44, 55, 41, 17, 15],
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels: ["Electronics", "Fashion", "Grocery", "Beauty", "Mobiles"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.initCharts();

  }

  public initCharts(): void {
    this.chart1options = {
      series: [
        {
          name: "chart1",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 160
      },
      colors: ["#008FFB"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart2options = {
      series: [
        {
          name: "chart2",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 30
            }
          )
        }
      ],
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        height: 160
      },
      colors: ["#546E7A"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart3options = {
      series: [
        {
          name: "chart3",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 160
      },
      colors: ["#00E396"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.barChartOptions = {
      seriess: [
        {
          name: "Q1 Budget",
          group: "budget",
          data: [44000, 55000, 41000, 67000, 22000, 43000]
        },
        {
          name: "Q1 Actual",
          group: "actual",
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        {
          name: "Q2 Budget",
          group: "budget",
          data: [13000, 36000, 20000, 8000, 13000, 27000]
        },
        {
          name: "Q2 Actual",
          group: "actual",
          data: [20000, 40000, 25000, 10000, 12000, 28000]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      dataLabels: {
        formatter: (val:any) => {
          return Number(val) / 1000 + "K";
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: [
          "Online advertising",
          "Sales Training",
          "Print advertising",
          "Catalogs",
          "Meetings"
        ],
        labels: {
          formatter: (val:any) => {
            return Number(val) / 1000 + "K";
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
      legend: {
        position: "top",
        horizontalAlign: "left"
      }
    };
  }

  public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  ngOnInit(): void {
    this.orderService.getAdminDashBoardSummary().subscribe(
      (data: DashboardSummary) =>{
        this.summaryCards=[
          { title: 'Revenue',
            value: `₹${data.revenue.toLocaleString()}`,
            icon: 'fa-money-bill-wave',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
          { title: 'Orders',
            value: data.orders,
            icon: 'fa-box',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { title: 'Customers',
            value: data.customers,
            icon: 'fa-users',
            gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
          { title: 'Products',
            value: data.products,
            icon: 'fa-cart-shopping',
            gradient: 'linear-gradient(135deg, #f54ea2 0%, #ff7676 100%)' }
        ]
        this.cdr.detectChanges();
      }
    );
    this.fetchRecentOrders();
  }
 
  fetchRecentOrders(): void {
    this.orderService.fetchRecentOrders().subscribe(data => {
      this.recentOrders = data;
      this.cdr.detectChanges();
    });
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Delivered': return 'bg-success';
      case 'Pending': return 'bg-warning';
      case 'Shipped': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }
 

}
