import { Component, OnInit } from '@angular/core';
import { FlightDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { environment } from 'src/environments/environment';
declare var google : any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  map: any;
  currentTime: number;
  constructor(private simulation: SimulationService, private flights: FlightDataService) {
    this.currentTime = 0;
   }

  ngOnInit() {
    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': environment.mapsApiKey
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap());
  }

  drawRegionsMap() {
    this.map = new google.visualization.GeoChart(document.getElementById('regions_div'));
  }

  visualize() {
    let speed = 1;
    const maxRRate = this.simulation.getMaxRRate();
    const maxIRate = this.simulation.getMaxIRate();
    while(this.currentTime < this.endTime) {
      this.drawForTime(this.currentTime);  
      this.currentTime += speed;
    }
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
    this.flights.countries.forEach(c=> {
      d.push([c.nameCode, (c.interpolateRateForTime(this.currentTime).i/maxIRate) ]);
    })
    var data = google.visualization.arrayToDataTable(d);
    let options = {};
    setTimeout(() => {this.map.draw(data, options);}, 200);
  }

}
