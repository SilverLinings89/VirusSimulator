import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-disease-parameter-settings',
  templateUrl: './disease-parameter-settings.component.html',
  styleUrls: ['./disease-parameter-settings.component.css']
})
export class DiseaseParameterSettingsComponent implements OnInit {

  constructor(public simulation: SimulationService) { }

  ngOnInit(): void {
  }

}
