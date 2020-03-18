import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-mortality-settings',
  templateUrl: './mortality-settings.component.html',
  styleUrls: ['./mortality-settings.component.css']
})
export class MortalitySettingsComponent implements OnInit {
  faE = faInfoCircle;
  constructor(public simulation: SimulationService) { }

  ngOnInit(): void {
  }

  updateMortalities() {
  }
}
