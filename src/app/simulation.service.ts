import { Injectable } from '@angular/core';
import { BaseDataService } from './flight-data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  public timeStepLength: number;
  public timeSpan: number;
  private beta: number;
  private gamma: number;
  public simulationHasFinised: boolean;
  public SimulationDone: Subject<boolean>;
  public progress = 0;

  constructor(private baseData: BaseDataService) {
    this.simulationHasFinised = false;
    this.beta = 2;
    this.gamma = 0.2;
    this.timeStepLength = 1;
    this.timeSpan = 10;
    this.SimulationDone = new Subject<boolean>();
  }

  computeStep() {
    const countryCount = this.baseData.countries.length;
    const stepS = [];
    const stepI = [];
    const stepR = [];
    for (let i = 0; i < countryCount; i++) {
      stepS.push(0);
      stepR.push(0);
      stepI.push(0);
    }

    for (let incomingCountry = 0; incomingCountry < countryCount; incomingCountry++ ) {
      let dS = 0;
      for (let j = 0; j < countryCount; j++) {
        for (let k = 0; k < countryCount; k++) {
          const i = incomingCountry;
          dS -= this.beta *
            this.baseData.computeCoupling(i, j) * this.baseData.countries[i].getLatestS() *
            this.baseData.computeCoupling(k, j) * this.baseData.countries[k].getLatestI() /
            this.baseData.countries[j].totalInhabitants;
        }
      }
      const dR = this.gamma * this.baseData.countries[incomingCountry].getLatestI();
      stepS[incomingCountry] = dS * this.timeStepLength;
      stepI[incomingCountry] = (-dS - dR) * this.timeStepLength;
      stepR[incomingCountry] = dR * this.timeStepLength;
    }

    for (let i = 0; i < countryCount; i++) {
      this.baseData.countries[i].addSimulationResultS(stepS[i]);
      this.baseData.countries[i].addSimulationResultI(stepI[i]);
      this.baseData.countries[i].addSimulationResultR(stepR[i]);
    }
  }

  clear() {
    this.progress = 0;
    this.baseData.countries.forEach(c => {
      c.clear();
    });
  }

  setMaxRunTime(inNumber: number) {
    this.timeSpan = inNumber;
  }

  run(inBeta: number, inGamma: number, stepLength: number, inInitialPatiens: {[countryCode: string]: number}) {
    this.compute(inBeta, inGamma, stepLength, inInitialPatiens);
    this.simulationHasFinised = true;
    this.SimulationDone.next(true);
  }

  compute(inBeta: number, inGamma: number, stepLength: number, inInitialPatiens: {[countryCode: string]: number}) {
    console.log('Start computing');
    this.beta = inBeta;
    this.gamma = inGamma;
    this.timeStepLength = stepLength;
    this.clear();
    this.baseData.setInitialPatients(inInitialPatiens);
    let time = 0;
    while (time < this.timeSpan) {
      this.computeStep();
      time += this.timeStepLength;
      this.progress = 100 * this.timeSpan / time;
    }
  }

  getMaxIRate(): number {
    let ret = 0;
    this.baseData.countries.forEach(c => {
      const ir = c.getMaxIRate();
      if (ir > ret) {
        ret = ir;
      }
    });
    return ret;
  }

  getMaxRRate(): number {
    let ret = 0;
    this.baseData.countries.forEach(c => {
      const rr = c.getMaxRRate();
      if (rr > ret) {
        ret = rr;
      }
    });
    return ret;
  }
}
