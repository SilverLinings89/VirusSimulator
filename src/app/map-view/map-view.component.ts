import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { environment } from 'src/environments/environment';
declare var google : any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  myColumnNames = ['Country', 'Infected'];
  map: any;
  myData= [];
  currentTime: number;
  mapType: 'GeoChart';
  constructor(private simulation: SimulationService, private baseData: BaseDataService) {
    this.currentTime = 0;
    this.simulation.SimulationDone.subscribe((res) => {
      if(res) this.visualize();
    })
   }

  ngOnInit() {
  }

  visualize() {
    const maxRRate = this.simulation.getMaxRRate();
    const maxIRate = this.simulation.getMaxIRate();
    this.drawForTime(this.simulation.timeSpan - this.simulation.timeStepLength);
  }

  fractionToRGBCode(inFraction: number): string {
    if(inFraction <0 || inFraction > 1) return "#ffffff";
    let ret = "#";
    let temp = Math.floor(inFraction * 255);
    ret += temp.toString(16);
    ret += "ffff";
    return ret;
  }

  drawForTime(inTime: number) {
    let d = [];
    let maxIRate = this.simulation.getMaxIRate();
    for (let i = 0; i < this.baseData.countries.length; i++) {
      d[i+1] = [this.baseData.countries[i].nameCode, (this.baseData.countries[i].interpolateRateForTime(this.currentTime).i/maxIRate) ];
    }
    this.myData = d;
  }

}
