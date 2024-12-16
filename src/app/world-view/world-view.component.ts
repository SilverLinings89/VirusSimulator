import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SimulationService } from '../simulation.service';

@Component({
    selector: 'app-world-view',
    templateUrl: './world-view.component.html',
    styleUrls: ['./world-view.component.css'],
    standalone: false
})
export class WorldViewComponent implements AfterViewInit {
  public WorldChart: Chart;
  lineChartLabels: string[];
  lineChartData: any[];

  constructor(public simulation: SimulationService) {
    this.simulation.SimulationDone.subscribe((ret) => {
      if (ret) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    this.updateChart();
  }

  updateChart() {
    if (this.simulation.simulationHasFinised) {
      this.lineChartData = [];
      this.lineChartData.push({
        data: this.simulation.globaldata.simulationResultS,
        name: 'Global Susceptible'
      });
      this.lineChartData.push({
        data: this.simulation.globaldata.simulationResultI,
        name: 'Global Infected'
      });
      this.lineChartData.push({
        data: this.simulation.globaldata.simulationResultR,
        name: 'Global Recovered'
      });
      this.lineChartData.push({
        data: this.simulation.globaldata.simulationResultF,
        name: 'Global Fatalities'
      });
      this.lineChartLabels = [];
      for (let i = 0; i < this.simulation.timeSpan; i++) {
        this.lineChartLabels.push(i.toString());
      }
      const yAxis = {title: {text: 'Number of people affected'}};
      console.log(this.lineChartData);
      setTimeout(() => {
        this.WorldChart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Development of patient groups over time'
          },
          credits: {
            enabled: false
          },
          series: this.lineChartData,
          xAxis: {title: {text: 'Days'}},
          yAxis: yAxis
        });
      }, 100);
    }
  }
}
