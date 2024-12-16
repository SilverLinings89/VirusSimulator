import { Component } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import { ThemePalette } from '@angular/material/core';
import { faPlay, faSkullCrossbones, faBiohazard, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { NotificationServiceService } from '../notification-service.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-simulation-control',
    templateUrl: './simulation-control.component.html',
    styleUrls: ['./simulation-control.component.css'],
    standalone: false
})
export class SimulationControlComponent {
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

  setCoronaDefault() {
    this.simulation.gamma = 1 / 12;
    this.simulation.beta = 0.25;
    this.simulation.immunityRate = 0;
    this.simulation.timeSpan = 300;
    this.simulation.baseMortalityRate = 0.006;
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
    this.simulation.immunityRate = 0.97;
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
