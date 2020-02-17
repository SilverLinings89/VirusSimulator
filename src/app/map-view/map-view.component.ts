import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { PlotlyService } from 'angular-plotly.js';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  data: any;
  currentTime: number;
  dateString: string;
  layout = {
    title: 'Prediciton of infected people worldwide',
    geo: {
        showframe: false,
        showcoastlines: false,
        projection: {
            type: 'mercator'
        }
    }
};

  constructor(private simulation: SimulationService, private baseData: BaseDataService, public plotlyService: PlotlyService) {

   }

  ngOnInit() {
    const values = [];
    const countries = [];
    for (let i = 0; i < this.baseData.countries.length; i++) {
      values[i] = 0;
      countries[i] = this.baseData.countries[i].nameCode;
    }
    this.data =  [{
      type: 'choropleth',
      locations: countries,
      z: values,
      text: [],
      colorscale: [[0, 'rgb(255,255,255)'], [ 100, 'rgb(255,0,0)']],
      autocolorscale: true,
      reversescale: false,
      marker: {
          line: {
              color: 'rgb(180,180,180)',
              width: 0.5
          }
      },
      tick0: 0,
      zmin: 0,
      zmax: 1,
      dtick: 1000,
      colorbar: {
          autotic: true,
          tickprefix: '',
          title: 'Infected Part of the popoulation in % '
      }
    }];
    const Plotly = this.plotlyService.getPlotly();
    Plotly.newPlot('myDiv', this.data, this.layout, {showLink: false});
    this.currentTime = 0;
    this.simulation.SimulationDone.subscribe((res) => {
      if (res) {
        this.visualize();
      }
    });
  }

  visualize() {
    let time = 0;
    const id = setInterval(() => {
      this.drawForTime(time);
      time += this.simulation.timeStepLength;
      if (time > this.simulation.timeSpan) {
        clearInterval(id);
      }
    }, 100);
  }

  fractionToRGBCode(inFraction: number): string {
    if (inFraction < 0 || inFraction > 1) {
      return '#ffffff';
    }
    let ret = '#';
    const temp = Math.floor(inFraction * 255);
    ret += temp.toString(16);
    ret += 'ffff';
    return ret;
  }

  drawForTime(inTime: number) {
    for (let i = 0; i < this.baseData.countries.length; i++) {
      this.data[0].z[i] = 100 * this.baseData.countries[i].interpolateRateForTime(inTime).i;
    }
    this.layout.title = 'Prediciton of infected people worldwide on day ' + inTime ;
    const Plotly = this.plotlyService.getPlotly();
    Plotly.newPlot('myDiv', this.data, this.layout, {showLink: false});
  }

}
