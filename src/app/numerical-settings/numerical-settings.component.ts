import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-numerical-settings',
  templateUrl: './numerical-settings.component.html',
  styleUrls: ['./numerical-settings.component.css']
})
export class NumericalSettingsComponent implements OnInit {

  constructor(public simulation: SimulationService) { }

  ngOnInit(): void {
  }

}
