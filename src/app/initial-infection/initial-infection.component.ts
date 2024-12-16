import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';
import { BaseDataService } from '../flight-data.service';

import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-initial-infection',
    templateUrl: './initial-infection.component.html',
    styleUrls: ['./initial-infection.component.css'],
    standalone: false
})
export class InitialInfectionComponent implements OnInit {
  showAll = false;
  faE = faExclamation;
  constructor(public baseData: BaseDataService) { }

  ngOnInit(): void {
  }

}
