import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SimulationService } from './simulation.service';
import { NotificationServiceService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class SimulationDoneGuard implements CanActivate {
  constructor(private simulation: SimulationService, private notification: NotificationServiceService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (! this.simulation.simulationHasFinised) {
        this.notification.displayNotification('You first have to run a simulation.');
        return false;
      } else {
        return true;
      }
  }

}
