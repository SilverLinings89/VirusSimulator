import { Injectable } from '@angular/core';
import { Country } from './types';
import { FlightDataService } from './flight-data.service';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  public timeStepLength: number; // in days
  public timeSpan: number;
  private beta: number;
  private gamma: number;

  constructor(private flights: FlightDataService) {
    this.beta = 2;
    this.gamma = 0.2;
    this.timeStepLength = 1;
    this.timeSpan = 10;
  }

  computeStep() {
    const countryCount = this.flights.countries.length;
    const stepS = [];
    const stepI = [];
    const stepR = [];
    for(let i = 0; i < countryCount; i++) {
      stepS.push(0);
      stepR.push(0);
      stepI.push(0);
    }

    for(let incomingCountry = 0; incomingCountry < countryCount; incomingCountry++ ){
      let dS = 0;
      for(let j = 0; j < countryCount; j++) {
        for(let k = 0; k < countryCount; k++) {
          const i = incomingCountry;
          dS -= this.beta *
            this.flights.computeCoupling(i,j)*this.flights.countries[i].getLatestS() * 
            this.flights.computeCoupling(k,j)*this.flights.countries[k].getLatestI() / 
            this.flights.countries[j].totalInhabitants;
        }
      }
      let dR = this.gamma * this.flights.countries[incomingCountry].getLatestI();
      stepS[incomingCountry] = dS * this.timeStepLength;
      stepI[incomingCountry] = (-dS - dR) * this.timeStepLength;
      stepR[incomingCountry] = dR * this.timeStepLength;
    }

    for(let i = 0; i < countryCount; i++) {
      this.flights.countries[i].addSimulationResultS(stepS[i]);
      this.flights.countries[i].addSimulationResultI(stepI[i]);
      this.flights.countries[i].addSimulationResultR(stepR[i]);
    }
  }

  clear() {
    this.flights.countries.forEach(c => {
      c.clear();
    });
  }

  setMaxRunTime(inNumber: number) {
    this.timeSpan = inNumber;
  }

  run(inBeta: number, inGamma: number, stepLength: number, inInitialPatiens: {[countryCode: string]: number}) {
    this.compute(inBeta, inGamma, stepLength, inInitialPatiens);
    // potentially more code;
  }

  compute(inBeta: number, inGamma: number, stepLength: number, inInitialPatiens: {[countryCode: string]: number}) {
    console.log("Start computing");
    this.beta = inBeta;
    this.gamma = inGamma;
    this.timeStepLength = stepLength;
    this.clear();
    this.flights.setInitialPatients(inInitialPatiens);
    let time = 0; 
    while(time < this.timeSpan) {
      console.log("Time: " + time);
      this.computeStep();
      time += this.timeStepLength;
    }
  }

  getMaxIRate(): number {
    let ret = 0;
    this.flights.countries.forEach(c => {
      const ir = c.getMaxIRate();
      if(ir > ret) ret = ir;
    });
    return ret;
  }

  getMaxRRate(): number {
    let ret = 0;
    this.flights.countries.forEach(c => {
      const rr = c.getMaxRRate();
      if(rr > ret) ret = rr;
    });
    return ret;
  }
}
