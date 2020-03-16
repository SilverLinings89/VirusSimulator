import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-mortality-settings',
  templateUrl: './mortality-settings.component.html',
  styleUrls: ['./mortality-settings.component.css']
})
export class MortalitySettingsComponent implements OnInit {

  constructor(private simulation: SimulationService) { }

  ngOnInit(): void {
  }

  updateMortalities() {
    
  }
}
