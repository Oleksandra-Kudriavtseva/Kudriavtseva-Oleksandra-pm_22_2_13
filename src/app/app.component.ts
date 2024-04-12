import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopmenuComponent} from "./topmenu/topmenu.component";
import {SidemenuComponent} from "./sidemenu/sidemenu.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {StatisticsGraphComponent} from "./statistics-graph/statistics-graph.component";
import {CircularGraphComponent} from "./circular-graph/circular-graph.component";
import {TicketsComponent} from "./tickets/tickets.component";
import {UpdatesComponent} from "./updates/updates.component";
import {StatusComponent} from "./status/status.component";
import {BottomComponent} from "./bottom/bottom.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopmenuComponent, SidemenuComponent,DashboardComponent, StatisticsComponent, StatisticsGraphComponent,CircularGraphComponent, TicketsComponent, UpdatesComponent,StatusComponent, BottomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kudriavtseva-Oleksandra-pm_22_2_13';
}
