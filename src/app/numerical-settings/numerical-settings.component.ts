import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-numerical-settings',
  templateUrl: './numerical-settings.component.html',
  styleUrls: ['./numerical-settings.component.css']
})
export class NumericalSettingsComponent implements OnInit {
  faInfo = faInfoCircle;
  constructor(public simulation: SimulationService) { }

  ngOnInit(): void {
  }

}
