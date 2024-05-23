import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';
import { DataServiceService } from '../data-service.service';



Chart.register(...registerables);

@Component({
  selector: 'app-statistics-graph',
  standalone: true,
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit {
  constructor(private service: DataServiceService) {
    Chart.register(...registerables);
  }

  chartdata: any;
  labeldata: any[] = [];
  monthdata: any[] = [];
  usadata: any[] = [];
  chinadata: any[] = [];
  ukdata: any[] = [];

  ngOnInit(): void {
    this.service.getData().subscribe((result: any) => {
      this.chartdata = result;
      console.log(2)
      if (this.chartdata != null) {
        this.monthdata = this.getMonth();
        this.usadata = this.getUSA();
        this.chinadata = this.getChina();
        this.ukdata = this.getUK();

        this.RenderChart(this.monthdata, this.usadata, this.chinadata, this.ukdata);
      }
    });
  }

  getMonth() {
    return this.chartdata.map((item: any) => item.month);
  }

  getChina() {
    return this.chartdata.map((item: any) => item.China);
  }

  getUSA() {
    return this.chartdata.map((item: any) => item.USA);
  }

  getUK() {
    return this.chartdata.map((item: any) => item.UK);
  }

  RenderChart(monthdata: any, usadata: any, chinadata: any, ukdata: any) {
    const ctx = (document.getElementById("Chart-1") as HTMLCanvasElement)?.getContext("2d");
    if (!ctx) {
      return;
    }

    const gradientChina = ctx.createLinearGradient(0, 0, 0, 400);
    const gradientUSA = ctx.createLinearGradient(0, 0, 0, 400);
    const gradientUK = ctx.createLinearGradient(0, 0, 0, 400);

    gradientChina.addColorStop(0.2, "#cc87fa");
    gradientChina.addColorStop(1, "#884ddb");

    gradientUK.addColorStop(0.2, "#2adbe8");
    gradientUK.addColorStop(1, "#4daceb");

    gradientUSA.addColorStop(0.2, "#f2a885");
    gradientUSA.addColorStop(1, "#e33974");

    const data: ChartData<'bar'> = {
      labels: monthdata,
      datasets: [
        {
          label: "CHN",
          barThickness: "flex" as const,
          barPercentage: 0.4,
          backgroundColor: gradientChina,
          data: chinadata
        },
        {
          label: "USA",
          barThickness: "flex" as const,
          barPercentage: 0.4,
          backgroundColor: gradientUSA,
          data: usadata
        },
        {
          label: "UK",
          barThickness: "flex" as const,
          barPercentage: 0.4,
          backgroundColor: gradientUK,
          data: ukdata
        }
      ]
    };

    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        resizeDelay: 2,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
            align: "end",
            labels: {
              pointStyle: "circle",
              usePointStyle: true
            }
          },
          title: {
            text: "Visit & Sales Statistics",
            display: false,
            position: "top",
            align: "start",
            font: {
              size: 24,
              weight: "bold"
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false
            },
            grid: {
              drawTicks: false
            }
          }
        }
      }
    });
  }
}
