import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../simulation.service';
import { BaseDataService } from '../flight-data.service';

@Component({
  selector: 'app-initial-infection',
  templateUrl: './initial-infection.component.html',
  styleUrls: ['./initial-infection.component.css']
})
export class InitialInfectionComponent implements OnInit {
  showAll = false;
  constructor(public baseData: BaseDataService) { }

  ngOnInit(): void {
  }

}
