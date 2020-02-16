import { Component, ViewChild } from '@angular/core';
import { SimulationService } from './simulation.service';
import { BaseDataService } from './flight-data.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import * as environment from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoronaSimulator';
  constructor(private simulation: SimulationService, private flights: BaseDataService) {
    this.flights.initialize();
  }

}
