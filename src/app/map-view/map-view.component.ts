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
  autoTicks = false;
  disabled = true;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical = false;
  tickInterval = 1;
  time = 0;
  is_running = false;


  layout = {
    title: 'Prediciton of infected people worldwide',
    geo: {
        showframe: false,
        showcoastlines: false,
        projection: {
            type: 'mercator'
        }
    },
  };

  constructor(private simulation: SimulationService, private baseData: BaseDataService, public plotlyService: PlotlyService) {
    
    this.simulation.SimulationDone.subscribe((d) => {
      if (d) {
        this.disabled = false;
        this.min = 0;
        this.max = this.simulation.timeSpan;
        this.step = this.simulation.timeStepLength;
        this.tickInterval = this.simulation.timeStepLength;
      }
    });
   }

  ngOnInit() {
    const values = [];
    const countries = [];
    for (let i = 0; i < this.baseData.countries.length; i++) {
      values[i] = 0;
      countries[i] = this.baseData.countries[i].nameCode;
    }
    let max_z = 0.001;
    for(let i = 0; i < this.baseData.countries.length; i++) {
      if(this.baseData.countries[i].simulationResultI[0] + this.baseData.countries[i].simulationResultS[0] + this.baseData.countries[i].simulationResultR[0] > 50000000) {
        max_z = Math.max(max_z, this.baseData.countries[i].globalPeakRate * 100);
      }
    }
    this.data =  [{
      type: 'choropleth',
      locations: countries,
      // locationmode: 'country names',
      z: values,
      text: [],
      colorscale: [[ 100, 'rgb(255,0,0)']],
      reversescale: false,
      marker: {
          line: {
              color: 'rgb(180,180,180)',
              width: 0.5
          }
      },
      tick0: 0,
      zmin: 0,
      zmax: max_z,
      dtick: 1000,
      colorbar: {
          autotic: true,
          tickprefix: '',
          title: 'Infectionrate in %'
      }
    }];
    const Plotly = this.plotlyService.getPlotly();
    Plotly.newPlot('myDiv', this.data, this.layout, {showLink: false});
    this.currentTime = 0;
  }

  reset() {
    this.time = 0;
    this.is_running = false;
  }

  stop() {
    this.is_running = false;
  }

  visualize() {
    this.max = this.simulation.timeSpan;
    this.is_running = true;
    const id = setInterval(() => {
      this.drawForTime(this.time);
      this.time += this.simulation.timeStepLength;
      if (this.time > this.simulation.timeSpan || !this.is_running) {
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

  draw() {
    this.drawForTime(this.currentTime);
  }

  drawForTime(inTime: number) {
    this.currentTime = inTime;
    for (let i = 0; i < this.baseData.countries.length; i++) {
      this.data[0].z[i] = 100 * this.baseData.countries[i].interpolateRateForTime(inTime).i;
    }
    this.layout.title = 'Prediciton of infected people worldwide on day ' + inTime ;
    const Plotly = this.plotlyService.getPlotly();
    Plotly.newPlot('myDiv', this.data, this.layout, {showLink: false});
  }

}
