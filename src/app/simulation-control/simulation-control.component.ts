import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../flight-data.service';
import { SimulationService } from '../simulation.service';
import {ThemePalette} from '@angular/material/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
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
  faCalendar = faCalendar;
  constructor( public simulation: SimulationService,
               private flights: BaseDataService,
               private notification: NotificationServiceService,
               private router: Router) {

  }

  ngOnInit() {
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
