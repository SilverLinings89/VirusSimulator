import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import {ThemePalette} from '@angular/material/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-simulation-control',
  templateUrl: './simulation-control.component.html',
  styleUrls: ['./simulation-control.component.css']
})
export class SimulationControlComponent implements OnInit {
  public endTime: number;
  public beta: number;
  public gamma: number;
  public stepLength: number;
  public mortality: number;
  color: ThemePalette = 'primary';
  mode = 'determinate';
  faCalendar = faCalendar;
  constructor(public simulation: SimulationService, private flights: BaseDataService) {
    this.beta = 1.1;
    this.gamma = 1.2;
    this.stepLength = 1;
    this.endTime = 80;
    this.mortality = 0.001
    
  }

  ngOnInit() {
  }



  runSimulation() {
    this.simulation.run();
  }

}
