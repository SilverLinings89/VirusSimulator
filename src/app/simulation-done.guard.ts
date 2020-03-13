import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SimulationService } from './simulation.service';

@Injectable({
  providedIn: 'root'
})
export class SimulationDoneGuard implements CanActivate {
  constructor(private simulation: SimulationService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.simulation.simulationHasFinised;
  }

}
