export class Country {
    fractionIncoming: number;
    fractionOutgoing: number;
    nameCode: string;
    nameFull: string;
    totalInhabitants: number;
    initialInfected: number;
    public simulationResultS: number[];
    public simulationResultI: number[];
    public simulationResultR: number[];
    
    constructor(inCode: string, inName: string, inInitialInfected: number, inTotalInhabitants: number, inInc: number, inOut: number) {
        this.initialInfected = inInitialInfected;
        this.totalInhabitants = inTotalInhabitants;
        this.fractionIncoming = inInc;
        this.fractionOutgoing = inOut;
        this.nameCode = inCode;
        this.nameFull = inName;
        this.clear()
    }

    interpolateDataForTime(inTime: number): {s: number, i: number, r: number} {
        let ret = {s: 0, i: 0, r: 0};
        if(inTime > this.simulationResultR.length - 1) {
            inTime = this.simulationResultR.length-1;
        }
        if(inTime < 0) inTime = 0;
        if(Math.floor(inTime) === inTime) {
            ret.s = this.simulationResultS[inTime];
            ret.i = this.simulationResultI[inTime];
            ret.r = this.simulationResultR[inTime];
        } else {
            const lower = Math.floor(inTime);
            const frac = inTime - lower;
            ret.s += frac * this.simulationResultS[lower];
            ret.s += (1-frac) * this.simulationResultS[lower+1];
            ret.i += frac * this.simulationResultI[lower];
            ret.i += (1-frac) * this.simulationResultI[lower+1];
            ret.r += frac * this.simulationResultR[lower];
            ret.r += (1-frac) * this.simulationResultR[lower+1];
        }
        return ret;
    }

    interpolateRateForTime(inTime: number): {s: number, i: number, r: number} {
        const ret = this.interpolateDataForTime(inTime);
        ret.i /= this.totalInhabitants;
        ret.r /= this.totalInhabitants;
        ret.s /= this.totalInhabitants;
        return ret;
    }

    getMaxRRate(): number {
        let ret = 0;
        this.simulationResultR.forEach((val) => {
            if(val > ret) ret = val;
        });
        return ret/this.totalInhabitants;
    }

    getMaxIRate(): number {
        let ret = 0;
        this.simulationResultI.forEach((val) => {
            if(val > ret) ret = val;
        });
        return ret/this.totalInhabitants;
    }

    clear() {
        this.simulationResultS = [];
        this.simulationResultI = [];
        this.simulationResultR = [];
        this.simulationResultS.push(this.totalInhabitants);
        this.simulationResultI.push(this.initialInfected);
        this.simulationResultR.push(0);
    }

    getLatestS(): number {
        if(this.simulationResultS.length > 0) {
            return this.simulationResultS[this.simulationResultS.length - 1];
        } else {
            return 0;
        }
    }

    getLatestI(): number {
        if(this.simulationResultI.length > 0) {
            return this.simulationResultI[this.simulationResultI.length - 1];
        } else {
            return 0;
        }
    }

    getLatestIShare(): number {
        return this.getLatestI() / this.totalInhabitants;
    }

    getLatestSShare(): number {
        return this.getLatestS() / this.totalInhabitants;
    }

    getLatestR(): number {
        if(this.simulationResultR.length > 0) {
            return this.simulationResultR[this.simulationResultR.length - 1];
        } else {
            return 0;
        }
    }

    addSimulationResultS(newS: number) {
        this.simulationResultS.push(this.getLatestS() + newS);
    }

    addSimulationResultI(newI: number) {
        this.simulationResultI.push(this.getLatestI() + newI);
    }

    addSimulationResultR(newR: number) {
        this.simulationResultR.push(this.getLatestR() + newR);
    }
}