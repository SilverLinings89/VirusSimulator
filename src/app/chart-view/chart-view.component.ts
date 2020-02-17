import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective, Color, ThemeService } from 'ng2-charts';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {
  selectedViewTypes = [];
  valueTypes = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  public countryIndex = 15;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
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
  public lineChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'I' },
    { data: [], label: 'R' }];
  public lineChartLabels: Label[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(public simulation: SimulationService, private baseData: BaseDataService) {
    this.simulation.SimulationDone.subscribe((ret) => {
      if (ret) {
        this.updateChart();
      }
    });
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: ''
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      text: 'Select Groups',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: ''
    };
    this.selectedViewTypes = [];
    for (let i = 0; i < this.baseData.countries.length; i++) {
      this.dropdownList.push({id: i, 'itemName': this.baseData.countries[i].nameFull});
    }
    this.valueTypes = [];
    this.valueTypes.push({'id': 0, 'itemName': 'Susceptible' });
    this.valueTypes.push({'id': 1, 'itemName': 'Infected' });
    this.valueTypes.push({'id': 2, 'itemName': 'Recovered' });
  }

  ngOnInit() {

  }

  updateChart() {
    if (this.simulation.simulationHasFinised) {
      this.lineChartData = [];
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.selectedViewTypes.forEach((vt) => {
          if (vt.id === 0) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].simulationResultS,
                label: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Susceptible'
              }
            );
          }
          if (vt.id === 1) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].simulationResultI,
                label: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Infected'
              }
            );
          }
          if (vt.id === 2) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].simulationResultR,
                label: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Recovered'
              }
            );
          }
        });
      }
      this.lineChartLabels = [];
      for (let i = 0; i < this.simulation.timeSpan; i++) {
        this.lineChartLabels.push(i.toString());
      }
      this.chart.update();
    }
  }
}
