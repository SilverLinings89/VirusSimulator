import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-simulation-control',
  templateUrl: './simulation-control.component.html',
  styleUrls: ['./simulation-control.component.css']
})
export class SimulationControlComponent implements OnInit {
  private endTime: number;
  private beta: number;
  private gamma: number;
  private stepLength: number;
  private mortality: number;
  color: ThemePalette = 'primary';
  mode = 'determinate';

  constructor(public simulation: SimulationService, private flights: BaseDataService) { }

  ngOnInit() {
  }



  run() {
    console.log("Run simulation...");
    this.simulation.setMaxRunTime(this.endTime);
    this.simulation.run(this.beta,this.gamma,this.stepLength,{"China": 1000});
    console.log("Done running simulation");
    console.log("Max Infected:" + this.simulation.getMaxIRate());
    console.log("Max Infected:" + this.simulation.getMaxRRate());
  }

}
