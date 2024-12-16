import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-preset-list',
    templateUrl: './preset-list.component.html',
    styleUrls: ['./preset-list.component.css'],
    standalone: false
})
export class PresetListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  setToCoronaOutbreak() {

  }

  setToNonVaccinatedMeaslesOutbreak() {
  }

  setToVaccinatedMeaslesOutbreak() {
    this.setToNonVaccinatedMeaslesOutbreak();
  }
}
