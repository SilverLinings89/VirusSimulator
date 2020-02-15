import { Component, OnInit } from '@angular/core';
import { FlightDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-simulation-control',
  templateUrl: './simulation-control.component.html',
  styleUrls: ['./simulation-control.component.css']
})
export class SimulationControlComponent implements OnInit {

  constructor(private simulation: SimulationService, private flights: FlightDataService) { }

  ngOnInit() {
  }

}
