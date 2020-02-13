import { Component } from '@angular/core';
import { SimulationService } from './simulation.service';
import { FlightDataService } from './flight-data.service';

declare var Worldmap : any;

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
  endTime: number = 100;
  map: any;

  constructor(private simulation: SimulationService, private flights: FlightDataService) {

  }

  loadData() {
    this.flights.initialize();
  }

  run() {
    this.loadData();
    this.runSimulation();
    this.visualize();
  }

  initWorldMap() {
    // Whatever
    this.map = new Worldmap({  
      elementid: "#mapcontainer",
      project: {
        name: "Mercator"
      },
      mapstyle: {
        ocean: "#4A5B62",
        region: "#F3F3F3",
        border : "#ffffff"
      }
     });
  }

  visualize() {
    this.initWorldMap();
    let speed = 1;
    const maxRRate = this.simulation.getMaxRRate();
    const maxIRate = this.simulation.getMaxIRate();
    while(this.currentTime < this.endTime) {
      this.drawForTime(this.currentTime);  
      this.currentTime += speed;
      this.flights.countries.forEach((c) => {
        this.map.update({"location": c.nameCode, "color": this.fractionToRGBCode(c.interpolateRateForTime(this.currentTime).i/maxIRate)});
      });
    }
  }

  fractionToRGBCode(inFraction: number): string {
    let ret = "#";
    let temp = Math.floor(inFraction * 255);
    ret += temp.toString(16);
    ret += "ffff";
    return ret;
  }

  drawForTime(inTime: number) {

  }

  runSimulation() {

  }
}
