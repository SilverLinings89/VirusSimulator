import { Injectable } from '@angular/core';
import { BaseDataService } from './flight-data.service';
import { Subject } from 'rxjs';
import { GlobalSimulationData, Country } from './types';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  public timeStepLength: number;
  public timeSpan: number;
  public beta: number;
  public gamma: number;
  public simulationHasFinised: boolean;
  public SimulationDone: Subject<boolean>;
  public baseMortalityRate = 0.001;
  public infectionBasedMortalityEnabled = false;
  public criticalMortality = 1.0;
  public criticalThreshold = 0.01;
  public globaldata: GlobalSimulationData;
  public immunityRate: number;

  constructor(private baseData: BaseDataService) {
    this.simulationHasFinised = false;
    this.beta = 0.21;
    this.gamma = 0.2;
    this.timeStepLength = 1;
    this.timeSpan = 200;
    this.SimulationDone = new Subject<boolean>();
    this.immunityRate = 0;
  }

  setCriticalProperties(enableCriticalTracking: boolean, baseMortality: number, criticalMortality: number, criticalThreshold: number) {
    this.infectionBasedMortalityEnabled = enableCriticalTracking;
    this.baseMortalityRate = baseMortality;
    this.criticalMortality = criticalMortality;
    this.criticalThreshold = criticalThreshold;
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
      if(this.baseData.countries[incomingCountry].fractionIncoming > 0 ) {
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
        if (this.immunityRate > 0 && this.immunityRate <= 1) {
          dS *= (1 - this.immunityRate);
        }
        const dR = this.gamma * this.baseData.countries[incomingCountry].getLatestI();
        stepS[incomingCountry] = dS * this.timeStepLength;
        stepI[incomingCountry] = (-dS - dR) * this.timeStepLength;
        stepR[incomingCountry] = dR * this.timeStepLength;
      }
    }

    for (let i = 0; i < countryCount; i++) {
      if(this.baseData.countries[i].fractionIncoming > 0) {
        this.baseData.countries[i].addSimulationResultS(stepS[i]);
        this.baseData.countries[i].addSimulationResultI(stepI[i]);
        this.baseData.countries[i].addSimulationResultR(stepR[i]);
      }else {
        this.baseData.countries[i].addSimulationResultS(0);
        this.baseData.countries[i].addSimulationResultI(0);
        this.baseData.countries[i].addSimulationResultR(0);
      }
    }
  }

  clear() {
    this.baseData.countries.forEach(c => {
      c.clear();
    });
  }

  setMaxRunTime(inNumber: number) {
    this.timeSpan = inNumber;
  }

  run() {
    const ready = this.validateBeforeRun();
    if (ready) {
      this.simulationHasFinised = false;
      this.compute();
      this.simulationHasFinised = true;
      this.SimulationDone.next(true);
    }
    return ready;
  }

  compute() {
    for (let c = 0; c < this.baseData.countries.length; c++) {
      this.baseData.countries[c].setMortality(this.baseMortalityRate);
      if (this.infectionBasedMortalityEnabled) {
        this.baseData.countries[c].setCriticalProperties(true, this.baseMortalityRate, this.criticalMortality, this.criticalThreshold);
      } else {
        this.baseData.countries[c].setCriticalProperties(false, this.baseMortalityRate, this.baseMortalityRate, this.criticalThreshold);
      }
      this.baseData.countries[c].setMortality(this.baseMortalityRate);
    }

    this.clear();
    let time = 0;
    while (time < this.timeSpan) {
      this.computeStep();
      time += this.timeStepLength;
    }
    this.computeGlobalStatistics();
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

  computeTotalDeaths(rate: boolean): number[] {
    const ret = [];
    for (let i = 0; i < this.baseData.countries[0].simulationResultI.length; i++) {
      ret[i] = 0;
    }
    this.baseData.countries.forEach(c => {
      const inp = c.getFatalities( rate);
      for (let i = 0; i < inp.length; i++) {
        ret[i] += inp[i];
      }
    });
    return ret;
  }

  computeGlobalStatistics() {
    const simulationResultS = [];
    const simulationResultI = [];
    const simulationResultR = [];
    const simulationResultF = [];
    const countryCount = this.baseData.countries.length;
    for ( let step = 0; step < this.baseData.countries[0].simulationResultS.length; step++) {
      let s = 0;
      let i = 0;
      let r = 0;
      let f = 0;
      for (let c = 0; c < countryCount; c++) {
        s += this.baseData.countries[c].simulationResultS[step];
        i += this.baseData.countries[c].simulationResultI[step];
        r += this.baseData.countries[c].simulationResultR[step];
        f += this.baseData.countries[c].simulationResultF[step];
      }
      simulationResultS.push(Math.floor(s));
      simulationResultI.push(Math.floor(i));
      simulationResultR.push(Math.floor(r));
      simulationResultF.push(Math.floor(f));
    }
    this.baseData.countries.forEach( (c) => {
      c.computeGlobalPeak();
    });
    let earlyPeak = this.baseData.countries[0];
    let latePeak = this.baseData.countries[0];
    let lowPeak = this.baseData.countries[0];
    let highPeak = this.baseData.countries[0];
    this.baseData.countries.forEach(c => {
      if (c.globalPeakRate > highPeak.globalPeakRate) {
        highPeak = c;
      }
      if (c.globalPeakRate < lowPeak.globalPeakRate) {
        lowPeak = c;
      }
      if (c.globalPeakStep < earlyPeak.globalPeakStep) {
        earlyPeak = c;
      }
      if (c.globalPeakStep > latePeak.globalPeakStep) {
        latePeak = c;
      }
    });
    this.globaldata = {
      simulationResultS,
      simulationResultI,
      simulationResultR,
      simulationResultF,
      globalFatalities: simulationResultF[simulationResultF.length - 1],
      globalInfected: simulationResultI[simulationResultI.length - 1],
      globalSusceptible: simulationResultS[simulationResultS.length - 1],
      globalRecovered: simulationResultR[simulationResultR.length - 1],
      earlyPeak,
      latePeak,
      lowPeak,
      highPeak
    };
    console.log(this.globaldata);
  }

  validateBeforeRun(): boolean {
    if (this.gamma <= 1 && this.gamma >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
