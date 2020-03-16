import { Component, AfterViewInit} from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements AfterViewInit  {
  ready = false;
  selectedViewTypes = [];
  valueTypes = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  lineChartData: any;
  lineChartLabels = [];
  showRate = false;
  public countryIndex = 15;
  chart: Chart;

  constructor(public simulation: SimulationService, private baseData: BaseDataService) {
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
    this.selectedViewTypes = [{'id': 1, 'itemName': 'Infected' }, {'id': 2, 'itemName': 'Recovered' }];
    for (let i = 0; i < this.baseData.countries.length; i++) {
      this.dropdownList.push({id: i, 'itemName': this.baseData.countries[i].nameFull});
      if (this.baseData.countries[i].nameFull === 'Germany') {
        this.selectedItems.push({id: i, 'itemName': this.baseData.countries[i].nameFull});
      }
    }
    this.valueTypes = [];
    this.valueTypes.push({'id': 0, 'itemName': 'Susceptible' });
    this.valueTypes.push({'id': 1, 'itemName': 'Infected' });
    this.valueTypes.push({'id': 2, 'itemName': 'Recovered' });
    this.valueTypes.push({'id': 3, 'itemName': 'Deaths' });
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
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.selectedViewTypes.forEach((vt) => {
          if (vt.id === 0) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].getSVectorTotal(this.showRate),
                name: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Susceptible'
              }
            );
          }
          if (vt.id === 1) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].getIVectorTotal(this.showRate),
                name: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Infected'
              }
            );
          }
          if (vt.id === 2) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].getRVectorTotal(this.showRate),
                name: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Recovered'
              }
            );
          }
          if (vt.id === 3) {
            this.lineChartData.push(
              {
                data: this.baseData.countries[this.selectedItems[i].id].getFVectorTotal(this.showRate),
                name: this.baseData.countries[this.selectedItems[i].id].nameFull + ' Deaths'
              }
            );
          }
        });
      }
      this.lineChartLabels = [];
      for (let i = 0; i < this.simulation.timeSpan; i++) {
        this.lineChartLabels.push(i.toString());
      }
    }
    let yAxis = {};
    if (this.showRate) {
      yAxis = {title: {text: 'Percentage of people affected'}};
    } else {
      yAxis = {title: {text: 'Number of people affected'}};
    }
    this.chart = new Chart({
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
    this.ready = true;
  }
}
