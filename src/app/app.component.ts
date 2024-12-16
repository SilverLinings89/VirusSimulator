import { Component, ViewChild } from '@angular/core';
import { SimulationService } from './simulation.service';
import { BaseDataService } from './flight-data.service';
import * as environment from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'CoronaSimulator';
  constructor(public simulation: SimulationService, private flights: BaseDataService) {
    this.flights.initialize();
  }

}
