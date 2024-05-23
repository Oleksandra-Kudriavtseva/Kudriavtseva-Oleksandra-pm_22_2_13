import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataServiceService } from '../data-service.service';

Chart.register(...registerables);

@Component({
  selector: 'app-circular-graph',
  standalone: true,
  templateUrl: './circular-graph.component.html',
  styleUrls: ['./circular-graph.component.css'],
  providers: [DataServiceService]
})
export class CircularGraphComponent implements OnInit {
  constructor(private service: DataServiceService) { }

  chartdata: any;
  titledata: any[] = [];
  countdata: any[] = [];

  ngOnInit(): void {
    this.service.getData2().subscribe((result: any) => {
      this.chartdata = result;
      if (this.chartdata != null) {
        this.titledata = this.getTitle();
        this.countdata = this.getCount();
        this.RenderChart(this.titledata, this.countdata);
      }
    });
  }

  getTitle() {
    return this.chartdata.map((item: any) => item.title);
  }

  getCount() {
    return this.chartdata.map((item: any) => item.count);
  }

  RenderChart(titledata: any, countdata: any) {
    const canvas = document.getElementById("chart-2") as HTMLCanvasElement;
    if (!canvas) {
      console.error("Елемент canvas не знайдено.");
      return;
    }

    const ctx2 = canvas.getContext("2d");
    if (!ctx2) {
      console.error("Контекст 2D не підтримується.");
      return;
    }

    const gradientE = ctx2.createLinearGradient(0, 0, 0, 400);
    const gradientD = ctx2.createLinearGradient(0, 0, 0, 400);
    const gradientB = ctx2.createLinearGradient(0, 0, 0, 400);

    gradientE.addColorStop(0.2, "#83d4f7");
    gradientE.addColorStop(1, "#884ddb");

    gradientD.addColorStop(0.2, "#6fdeaf");
    gradientD.addColorStop(1, "#26a36e");

    gradientB.addColorStop(0.2, "#f2a885");
    gradientB.addColorStop(1, "#e33974");

    const data = {
      labels: titledata,
      datasets: [
        {
          label: "My First Dataset",
          data: countdata,
          backgroundColor: [gradientE, gradientD, gradientB],
          hoverOffset: 4
        }
      ]
    };

    new Chart(ctx2, {
      type: "doughnut",
      data: data,
      options: {
        resizeDelay: 2,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
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
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    });
  }
}
