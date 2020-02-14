import { Component, ViewChild } from '@angular/core';
import { SimulationService } from './simulation.service';
import { FlightDataService } from './flight-data.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

declare var google : any;

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
  map: any;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          stepSize: 10
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {

    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line'
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'I' },
    { data: [], label: 'R' }
  ];
  public lineChartLabels: Label[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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
    google.charts.load('current', {
      'packages':['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);

  }

  drawRegionsMap() {
    this.map = new google.visualization.GeoChart(document.getElementById('regions_div'));
  }

  visualize() {
    this.initWorldMap();
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
