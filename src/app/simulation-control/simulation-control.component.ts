import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { ThemePalette } from '@angular/material/core';
import { faPlay, faSkullCrossbones, faBiohazard, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { NotificationServiceService } from '../notification-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-simulation-control',
  templateUrl: './simulation-control.component.html',
  styleUrls: ['./simulation-control.component.css']
})
export class SimulationControlComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode = 'determinate';
  faPlay = faPlay;
  faSuC = faSkullCrossbones;
  faE = faExclamation;
  faBH = faBiohazard;
  constructor( public simulation: SimulationService,
               private flights: BaseDataService,
               private notification: NotificationServiceService,
               private router: Router) {
  }

  ngOnInit() {
  }

  setCoronaDefault() {

  }

  setMeaselesZeroVac() {
    this.setMeaselesHighVac();
    this.simulation.immunityRate = 0;
    this.simulation.timeSpan = 200;
  }

  setMeaselesHighVac() {
    this.simulation.timeStepLength = 1.0;
    this.simulation.timeSpan = 400;
    this.simulation.beta = 0.95;
    this.simulation.gamma = 1.0 / (19.5);
    this.simulation.immunityRate = 0.95;
    this.simulation.baseMortalityRate = 0.001;
  }

  runSimulation() {
    if (this.simulation.run()) {
      this.notification.displayNotification('The computation has been completed successfully!');
      this.router.navigateByUrl('/world');
    } else {
      this.notification.displayNotification('The input values are not valid.');
    }

  }

}
