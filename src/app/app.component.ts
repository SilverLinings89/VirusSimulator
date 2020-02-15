import { Component, ViewChild } from '@angular/core';
import { SimulationService } from './simulation.service';
import { FlightDataService } from './flight-data.service';
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
  betaInput:string = "";
  gammaInput: string = "";
  timeStepInput: string = "1";
  currentTime: number = 0;
  endTime: number = 400;


  constructor(private simulation: SimulationService, private flights: FlightDataService) {
    
  }

  loadData() {
    this.flights.initialize();
  }

  run() {
    this.drawRegionsMap();
    this.loadData();
    this.runSimulation();
    this.visualize();
  }

  

  runSimulation() {
    console.log("Run simulation...");
    this.simulation.setMaxRunTime(this.endTime);
    this.simulation.run(0.4,0.2,1,{"China": 1000});
    this.lineChartData[0].data = this.flights.countries[15].simulationResultI;
    this.lineChartData[1].data = this.flights.countries[15].simulationResultR;
    for(let i = 0; i < this.endTime; i++) {
      this.lineChartLabels.push(i.toString());
    }
    this.chart.update();
    console.log(this.lineChartData[0].data);
    console.log("Done running simulation");
    console.log("Max Infected:" + this.simulation.getMaxIRate());
    console.log("Max Infected:" + this.simulation.getMaxRRate());
  }
}
