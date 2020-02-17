import { Injectable } from '@angular/core';
import { Country } from './types';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  countries: Country[];
  totalFlights: number;
  arrivalsScalingFactor: number;
  averagePassengersPerFlight: number;

  constructor() {
    this.averagePassengersPerFlight = 100;
    this.initialize();
  }

  initialize() {
    this.countries = [];
    let totalDepartures = 0;
    let totalArrivals = 0;
    Departures.forEach(c => {
      totalDepartures += c.Latest;
    });
    Arrivals.forEach(c => {
      totalArrivals += c.Latest;
    });
    for(let i = 0; i < Departures.length; i++) {
      if(Arrivals[i]['Latest'] > 0 && Departures[i].Latest > 0) {
        let found = false;
        let pop = 10*Departures[i].Latest;
        Population.forEach(p => {
          if (p.Country_Code === Arrivals[i]['Country Code']) {
            found = true;
            pop = parseInt(p.Year_2016.toString());
          }
        });
        if(!found) {
          console.log('No population number for ' + Arrivals[i]["Country Name"] + ' was found in the database.');
        }
        this.countries.push(new Country(
          Arrivals[i]['Country Code'],
          Arrivals[i]['Country Name'],
          0,
          pop,
          Arrivals[i].Latest / totalArrivals,
          Departures[i].Latest / totalDepartures));
      }
    }
    this.countries.forEach(c => {
      if(c.nameFull === 'China') {
        c.initialInfected = 1000;
      }
    });
    this.totalFlights = (totalArrivals + totalDepartures) / 2;
  }

  setInitialPatients(patients: {[countryCode: string]: number}) {
    for (let key in patients) {
      this.countries.forEach(c => {
        if(c.nameCode == key) {
          c.initialInfected = patients[key];
        }
      })
    }
  }

  computeCoupling(countryFrom: number, countryTo: number) {
    if(this.countryIndexIsValid(countryFrom) && this.countryIndexIsValid(countryTo)) {
      if(countryFrom == countryTo) {
        return 1 - (this.totalFlights*
        this.countries[countryFrom].fractionOutgoing*
        this.averagePassengersPerFlight / (this.countries[countryFrom].totalInhabitants * 365));
      } else {
      return this.totalFlights*
        this.countries[countryFrom].fractionOutgoing*
        this.countries[countryTo].fractionIncoming*
        this.averagePassengersPerFlight / (this.countries[countryFrom].totalInhabitants * 365);
      }
    } else {
      return 0;
    }
  }

  countryIndexIsValid(idx: number): boolean {
    return (idx >= 0 && idx < this.countries.length);
  }
}

const Population = [
  {
    "Country": "Aruba",
    "Country_Code": "ABW",
    "Year_2016": 104822
  },
  {
    "Country": "Afghanistan",
    "Country_Code": "AFG",
    "Year_2016": 34656032
  },
  {
    "Country": "Angola",
    "Country_Code": "AGO",
    "Year_2016": 28813463
  },
  {
    "Country": "Albania",
    "Country_Code": "ALB",
    "Year_2016": 2876101
  },
  {
    "Country": "Andorra",
    "Country_Code": "AND",
    "Year_2016": 77281
  },
  {
    "Country": "Arab World",
    "Country_Code": "ARB",
    "Year_2016": 406452690
  },
  {
    "Country": "United Arab Emirates",
    "Country_Code": "ARE",
    "Year_2016": 9269612
  },
  {
    "Country": "Argentina",
    "Country_Code": "ARG",
    "Year_2016": 43847430
  },
  {
    "Country": "Armenia",
    "Country_Code": "ARM",
    "Year_2016": 2924816
  },
  {
    "Country": "American Samoa",
    "Country_Code": "ASM",
    "Year_2016": 55599
  },
  {
    "Country": "Antigua and Barbuda",
    "Country_Code": "ATG",
    "Year_2016": 100963
  },
  {
    "Country": "Australia",
    "Country_Code": "AUS",
    "Year_2016": 24127159
  },
  {
    "Country": "Austria",
    "Country_Code": "AUT",
    "Year_2016": 8747358
  },
  {
    "Country": "Azerbaijan",
    "Country_Code": "AZE",
    "Year_2016": 9762274
  },
  {
    "Country": "Burundi",
    "Country_Code": "BDI",
    "Year_2016": 10524117
  },
  {
    "Country": "Belgium",
    "Country_Code": "BEL",
    "Year_2016": 11348159
  },
  {
    "Country": "Benin",
    "Country_Code": "BEN",
    "Year_2016": 10872298
  },
  {
    "Country": "Burkina Faso",
    "Country_Code": "BFA",
    "Year_2016": 18646433
  },
  {
    "Country": "Bangladesh",
    "Country_Code": "BGD",
    "Year_2016": 162951560
  },
  {
    "Country": "Bulgaria",
    "Country_Code": "BGR",
    "Year_2016": 7127822
  },
  {
    "Country": "Bahrain",
    "Country_Code": "BHR",
    "Year_2016": 1425171
  },
  {
    "Country": "Bahamas, The",
    "Country_Code": "BHS",
    "Year_2016": 391232
  },
  {
    "Country": "Bosnia and Herzegovina",
    "Country_Code": "BIH",
    "Year_2016": 3516816
  },
  {
    "Country": "Belarus",
    "Country_Code": "BLR",
    "Year_2016": 9507120
  },
  {
    "Country": "Belize",
    "Country_Code": "BLZ",
    "Year_2016": 366954
  },
  {
    "Country": "Bermuda",
    "Country_Code": "BMU",
    "Year_2016": 65331
  },
  {
    "Country": "Bolivia",
    "Country_Code": "BOL",
    "Year_2016": 10887882
  },
  {
    "Country": "Brazil",
    "Country_Code": "BRA",
    "Year_2016": 207652865
  },
  {
    "Country": "Barbados",
    "Country_Code": "BRB",
    "Year_2016": 284996
  },
  {
    "Country": "Brunei Darussalam",
    "Country_Code": "BRN",
    "Year_2016": 423196
  },
  {
    "Country": "Bhutan",
    "Country_Code": "BTN",
    "Year_2016": 797765
  },
  {
    "Country": "Botswana",
    "Country_Code": "BWA",
    "Year_2016": 2250260
  },
  {
    "Country": "Central African Republic",
    "Country_Code": "CAF",
    "Year_2016": 4594621
  },
  {
    "Country": "Canada",
    "Country_Code": "CAN",
    "Year_2016": 36286425
  },
  {
    "Country": "Central Europe and the Baltics",
    "Country_Code": "CEB",
    "Year_2016": 102974082
  },
  {
    "Country": "Switzerland",
    "Country_Code": "CHE",
    "Year_2016": 8372098
  },
  {
    "Country": "Channel Islands",
    "Country_Code": "CHI",
    "Year_2016": 164541
  },
  {
    "Country": "Chile",
    "Country_Code": "CHL",
    "Year_2016": 17909754
  },
  {
    "Country": "China",
    "Country_Code": "CHN",
    "Year_2016": 1378665000
  },
  {
    "Country": "Cote d'Ivoire",
    "Country_Code": "CIV",
    "Year_2016": 23695919
  },
  {
    "Country": "Cameroon",
    "Country_Code": "CMR",
    "Year_2016": 23439189
  },
  {
    "Country": "Congo, Dem. Rep.",
    "Country_Code": "COD",
    "Year_2016": 78736153
  },
  {
    "Country": "Congo, Rep.",
    "Country_Code": "COG",
    "Year_2016": 5125821
  },
  {
    "Country": "Colombia",
    "Country_Code": "COL",
    "Year_2016": 48653419
  },
  {
    "Country": "Comoros",
    "Country_Code": "COM",
    "Year_2016": 795601
  },
  {
    "Country": "Cabo Verde",
    "Country_Code": "CPV",
    "Year_2016": 539560
  },
  {
    "Country": "Costa Rica",
    "Country_Code": "CRI",
    "Year_2016": 4857274
  },
  {
    "Country": "Caribbean small states",
    "Country_Code": "CSS",
    "Year_2016": 7245472
  },
  {
    "Country": "Cuba",
    "Country_Code": "CUB",
    "Year_2016": 11475982
  },
  {
    "Country": "Curacao",
    "Country_Code": "CUW",
    "Year_2016": 159999
  },
  {
    "Country": "Cayman Islands",
    "Country_Code": "CYM",
    "Year_2016": 60765
  },
  {
    "Country": "Cyprus",
    "Country_Code": "CYP",
    "Year_2016": 1170125
  },
  {
    "Country": "Czech Republic",
    "Country_Code": "CZE",
    "Year_2016": 10561633
  },
  {
    "Country": "Germany",
    "Country_Code": "DEU",
    "Year_2016": 82667685
  },
  {
    "Country": "Djibouti",
    "Country_Code": "DJI",
    "Year_2016": 942333
  },
  {
    "Country": "Dominica",
    "Country_Code": "DMA",
    "Year_2016": 73543
  },
  {
    "Country": "Denmark",
    "Country_Code": "DNK",
    "Year_2016": 5731118
  },
  {
    "Country": "Dominican Republic",
    "Country_Code": "DOM",
    "Year_2016": 10648791
  },
  {
    "Country": "Algeria",
    "Country_Code": "DZA",
    "Year_2016": 40606052
  },
  {
    "Country": "East Asia & Pacific (excluding high income)",
    "Country_Code": "EAP",
    "Year_2016": 2051452657
  },
  {
    "Country": "Early-demographic dividend",
    "Country_Code": "EAR",
    "Year_2016": 3170542188
  },
  {
    "Country": "East Asia & Pacific",
    "Country_Code": "EAS",
    "Year_2016": 2296786207
  },
  {
    "Country": "Europe & Central Asia (excluding high income)",
    "Country_Code": "ECA",
    "Year_2016": 417424643
  },
  {
    "Country": "Europe & Central Asia",
    "Country_Code": "ECS",
    "Year_2016": 911995305
  },
  {
    "Country": "Ecuador",
    "Country_Code": "ECU",
    "Year_2016": 16385068
  },
  {
    "Country": "Egypt, Arab Rep.",
    "Country_Code": "EGY",
    "Year_2016": 95688681
  },
  {
    "Country": "Euro area",
    "Country_Code": "EMU",
    "Year_2016": 340894606
  },
  {
    "Country": "Eritrea",
    "Country_Code": "ERI",
    "Year_2016": ""
  },
  {
    "Country": "Spain",
    "Country_Code": "ESP",
    "Year_2016": 46443959
  },
  {
    "Country": "Estonia",
    "Country_Code": "EST",
    "Year_2016": 1316481
  },
  {
    "Country": "Ethiopia",
    "Country_Code": "ETH",
    "Year_2016": 102403196
  },
  {
    "Country": "European Union",
    "Country_Code": "EUU",
    "Year_2016": 511497415
  },
  {
    "Country": "Fragile and conflict affected situations",
    "Country_Code": "FCS",
    "Year_2016": 496575241
  },
  {
    "Country": "Finland",
    "Country_Code": "FIN",
    "Year_2016": 5495096
  },
  {
    "Country": "Fiji",
    "Country_Code": "FJI",
    "Year_2016": 898760
  },
  {
    "Country": "France",
    "Country_Code": "FRA",
    "Year_2016": 66896109
  },
  {
    "Country": "Faroe Islands",
    "Country_Code": "FRO",
    "Year_2016": 49117
  },
  {
    "Country": "Micronesia, Fed. Sts.",
    "Country_Code": "FSM",
    "Year_2016": 104937
  },
  {
    "Country": "Gabon",
    "Country_Code": "GAB",
    "Year_2016": 1979786
  },
  {
    "Country": "United Kingdom",
    "Country_Code": "GBR",
    "Year_2016": 65637239
  },
  {
    "Country": "Georgia",
    "Country_Code": "GEO",
    "Year_2016": 3719300
  },
  {
    "Country": "Ghana",
    "Country_Code": "GHA",
    "Year_2016": 28206728
  },
  {
    "Country": "Gibraltar",
    "Country_Code": "GIB",
    "Year_2016": 34408
  },
  {
    "Country": "Guinea",
    "Country_Code": "GIN",
    "Year_2016": 12395924
  },
  {
    "Country": "Gambia, The",
    "Country_Code": "GMB",
    "Year_2016": 2038501
  },
  {
    "Country": "Guinea-Bissau",
    "Country_Code": "GNB",
    "Year_2016": 1815698
  },
  {
    "Country": "Equatorial Guinea",
    "Country_Code": "GNQ",
    "Year_2016": 1221490
  },
  {
    "Country": "Greece",
    "Country_Code": "GRC",
    "Year_2016": 10746740
  },
  {
    "Country": "Grenada",
    "Country_Code": "GRD",
    "Year_2016": 107317
  },
  {
    "Country": "Greenland",
    "Country_Code": "GRL",
    "Year_2016": 56186
  },
  {
    "Country": "Guatemala",
    "Country_Code": "GTM",
    "Year_2016": 16582469
  },
  {
    "Country": "Guam",
    "Country_Code": "GUM",
    "Year_2016": 162896
  },
  {
    "Country": "Guyana",
    "Country_Code": "GUY",
    "Year_2016": 773303
  },
  {
    "Country": "High income",
    "Country_Code": "HIC",
    "Year_2016": 1190029421
  },
  {
    "Country": "Hong Kong SAR, China",
    "Country_Code": "HKG",
    "Year_2016": 7346700
  },
  {
    "Country": "Honduras",
    "Country_Code": "HND",
    "Year_2016": 9112867
  },
  {
    "Country": "Heavily indebted poor countries (HIPC)",
    "Country_Code": "HPC",
    "Year_2016": 744602976
  },
  {
    "Country": "Croatia",
    "Country_Code": "HRV",
    "Year_2016": 4170600
  },
  {
    "Country": "Haiti",
    "Country_Code": "HTI",
    "Year_2016": 10847334
  },
  {
    "Country": "Hungary",
    "Country_Code": "HUN",
    "Year_2016": 9817958
  },
  {
    "Country": "IBRD only",
    "Country_Code": "IBD",
    "Year_2016": 4697247117
  },
  {
    "Country": "IDA & IBRD total",
    "Country_Code": "IBT",
    "Year_2016": 6271593092
  },
  {
    "Country": "IDA total",
    "Country_Code": "IDA",
    "Year_2016": 1574345975
  },
  {
    "Country": "IDA blend",
    "Country_Code": "IDB",
    "Year_2016": 521159393
  },
  {
    "Country": "Indonesia",
    "Country_Code": "IDN",
    "Year_2016": 261115456
  },
  {
    "Country": "IDA only",
    "Country_Code": "IDX",
    "Year_2016": 1053186582
  },
  {
    "Country": "Isle of Man",
    "Country_Code": "IMN",
    "Year_2016": 83737
  },
  {
    "Country": "India",
    "Country_Code": "IND",
    "Year_2016": 1324171354
  },
  {
    "Country": "Ireland",
    "Country_Code": "IRL",
    "Year_2016": 4773095
  },
  {
    "Country": "Iran, Islamic Rep.",
    "Country_Code": "IRN",
    "Year_2016": 80277428
  },
  {
    "Country": "Iraq",
    "Country_Code": "IRQ",
    "Year_2016": 37202572
  },
  {
    "Country": "Iceland",
    "Country_Code": "ISL",
    "Year_2016": 334252
  },
  {
    "Country": "Israel",
    "Country_Code": "ISR",
    "Year_2016": 8547100
  },
  {
    "Country": "Italy",
    "Country_Code": "ITA",
    "Year_2016": 60600590
  },
  {
    "Country": "Jamaica",
    "Country_Code": "JAM",
    "Year_2016": 2881355
  },
  {
    "Country": "Jordan",
    "Country_Code": "JOR",
    "Year_2016": 9455802
  },
  {
    "Country": "Japan",
    "Country_Code": "JPN",
    "Year_2016": 126994511
  },
  {
    "Country": "Kazakhstan",
    "Country_Code": "KAZ",
    "Year_2016": 17797032
  },
  {
    "Country": "Kenya",
    "Country_Code": "KEN",
    "Year_2016": 48461567
  },
  {
    "Country": "Kyrgyz Republic",
    "Country_Code": "KGZ",
    "Year_2016": 6082700
  },
  {
    "Country": "Cambodia",
    "Country_Code": "KHM",
    "Year_2016": 15762370
  },
  {
    "Country": "Kiribati",
    "Country_Code": "KIR",
    "Year_2016": 114395
  },
  {
    "Country": "St. Kitts and Nevis",
    "Country_Code": "KNA",
    "Year_2016": 54821
  },
  {
    "Country": "Korea, Rep.",
    "Country_Code": "KOR",
    "Year_2016": 51245707
  },
  {
    "Country": "Kuwait",
    "Country_Code": "KWT",
    "Year_2016": 4052584
  },
  {
    "Country": "Latin America & Caribbean (excluding high income)",
    "Country_Code": "LAC",
    "Year_2016": 610136397
  },
  {
    "Country": "Lao PDR",
    "Country_Code": "LAO",
    "Year_2016": 6758353
  },
  {
    "Country": "Lebanon",
    "Country_Code": "LBN",
    "Year_2016": 6006668
  },
  {
    "Country": "Liberia",
    "Country_Code": "LBR",
    "Year_2016": 4613823
  },
  {
    "Country": "Libya",
    "Country_Code": "LBY",
    "Year_2016": 6293253
  },
  {
    "Country": "St. Lucia",
    "Country_Code": "LCA",
    "Year_2016": 178015
  },
  {
    "Country": "Latin America & Caribbean",
    "Country_Code": "LCN",
    "Year_2016": 637664490
  },
  {
    "Country": "Least developed countries: UN classification",
    "Country_Code": "LDC",
    "Year_2016": 980609415
  },
  {
    "Country": "Low income",
    "Country_Code": "LIC",
    "Year_2016": 659272676
  },
  {
    "Country": "Liechtenstein",
    "Country_Code": "LIE",
    "Year_2016": 37666
  },
  {
    "Country": "Sri Lanka",
    "Country_Code": "LKA",
    "Year_2016": 21203000
  },
  {
    "Country": "Lower middle income",
    "Country_Code": "LMC",
    "Year_2016": 3012923806
  },
  {
    "Country": "Low & middle income",
    "Country_Code": "LMY",
    "Year_2016": 6247922508
  },
  {
    "Country": "Lesotho",
    "Country_Code": "LSO",
    "Year_2016": 2203821
  },
  {
    "Country": "Late-demographic dividend",
    "Country_Code": "LTE",
    "Year_2016": 2262709895
  },
  {
    "Country": "Lithuania",
    "Country_Code": "LTU",
    "Year_2016": 2872298
  },
  {
    "Country": "Luxembourg",
    "Country_Code": "LUX",
    "Year_2016": 582972
  },
  {
    "Country": "Latvia",
    "Country_Code": "LVA",
    "Year_2016": 1960424
  },
  {
    "Country": "Macao SAR, China",
    "Country_Code": "MAC",
    "Year_2016": 612167
  },
  {
    "Country": "St. Martin (French part)",
    "Country_Code": "MAF",
    "Year_2016": 31949
  },
  {
    "Country": "Morocco",
    "Country_Code": "MAR",
    "Year_2016": 35276786
  },
  {
    "Country": "Monaco",
    "Country_Code": "MCO",
    "Year_2016": 38499
  },
  {
    "Country": "Moldova",
    "Country_Code": "MDA",
    "Year_2016": 3552000
  },
  {
    "Country": "Madagascar",
    "Country_Code": "MDG",
    "Year_2016": 24894551
  },
  {
    "Country": "Maldives",
    "Country_Code": "MDV",
    "Year_2016": 417492
  },
  {
    "Country": "Middle East & North Africa",
    "Country_Code": "MEA",
    "Year_2016": 436720722
  },
  {
    "Country": "Mexico",
    "Country_Code": "MEX",
    "Year_2016": 127540423
  },
  {
    "Country": "Marshall Islands",
    "Country_Code": "MHL",
    "Year_2016": 53066
  },
  {
    "Country": "Middle income",
    "Country_Code": "MIC",
    "Year_2016": 5592833481
  },
  {
    "Country": "Macedonia, FYR",
    "Country_Code": "MKD",
    "Year_2016": 2081206
  },
  {
    "Country": "Mali",
    "Country_Code": "MLI",
    "Year_2016": 17994837
  },
  {
    "Country": "Malta",
    "Country_Code": "MLT",
    "Year_2016": 436947
  },
  {
    "Country": "Myanmar",
    "Country_Code": "MMR",
    "Year_2016": 52885223
  },
  {
    "Country": "Middle East & North Africa (excluding high income)",
    "Country_Code": "MNA",
    "Year_2016": 373719055
  },
  {
    "Country": "Montenegro",
    "Country_Code": "MNE",
    "Year_2016": 622781
  },
  {
    "Country": "Mongolia",
    "Country_Code": "MNG",
    "Year_2016": 3027398
  },
  {
    "Country": "Northern Mariana Islands",
    "Country_Code": "MNP",
    "Year_2016": 55023
  },
  {
    "Country": "Mozambique",
    "Country_Code": "MOZ",
    "Year_2016": 28829476
  },
  {
    "Country": "Mauritania",
    "Country_Code": "MRT",
    "Year_2016": 4301018
  },
  {
    "Country": "Mauritius",
    "Country_Code": "MUS",
    "Year_2016": 1263473
  },
  {
    "Country": "Malawi",
    "Country_Code": "MWI",
    "Year_2016": 18091575
  },
  {
    "Country": "Malaysia",
    "Country_Code": "MYS",
    "Year_2016": 31187265
  },
  {
    "Country": "North America",
    "Country_Code": "NAC",
    "Year_2016": 359479269
  },
  {
    "Country": "Namibia",
    "Country_Code": "NAM",
    "Year_2016": 2479713
  },
  {
    "Country": "New Caledonia",
    "Country_Code": "NCL",
    "Year_2016": 278000
  },
  {
    "Country": "Niger",
    "Country_Code": "NER",
    "Year_2016": 20672987
  },
  {
    "Country": "Nigeria",
    "Country_Code": "NGA",
    "Year_2016": 185989640
  },
  {
    "Country": "Nicaragua",
    "Country_Code": "NIC",
    "Year_2016": 6149928
  },
  {
    "Country": "Netherlands",
    "Country_Code": "NLD",
    "Year_2016": 17018408
  },
  {
    "Country": "Norway",
    "Country_Code": "NOR",
    "Year_2016": 5232929
  },
  {
    "Country": "Nepal",
    "Country_Code": "NPL",
    "Year_2016": 28982771
  },
  {
    "Country": "Nauru",
    "Country_Code": "NRU",
    "Year_2016": 13049
  },
  {
    "Country": "New Zealand",
    "Country_Code": "NZL",
    "Year_2016": 4692700
  },
  {
    "Country": "OECD members",
    "Country_Code": "OED",
    "Year_2016": 1289937319
  },
  {
    "Country": "Oman",
    "Country_Code": "OMN",
    "Year_2016": 4424762
  },
  {
    "Country": "Other small states",
    "Country_Code": "OSS",
    "Year_2016": 29983809
  },
  {
    "Country": "Pakistan",
    "Country_Code": "PAK",
    "Year_2016": 193203476
  },
  {
    "Country": "Panama",
    "Country_Code": "PAN",
    "Year_2016": 4034119
  },
  {
    "Country": "Peru",
    "Country_Code": "PER",
    "Year_2016": 31773839
  },
  {
    "Country": "Philippines",
    "Country_Code": "PHL",
    "Year_2016": 103320222
  },
  {
    "Country": "Palau",
    "Country_Code": "PLW",
    "Year_2016": 21503
  },
  {
    "Country": "Papua New Guinea",
    "Country_Code": "PNG",
    "Year_2016": 8084991
  },
  {
    "Country": "Poland",
    "Country_Code": "POL",
    "Year_2016": 37948016
  },
  {
    "Country": "Pre-demographic dividend",
    "Country_Code": "PRE",
    "Year_2016": 879292453
  },
  {
    "Country": "Puerto Rico",
    "Country_Code": "PRI",
    "Year_2016": 3411307
  },
  {
    "Country": "Korea, Dem. People’s Rep.",
    "Country_Code": "PRK",
    "Year_2016": 25368620
  },
  {
    "Country": "Portugal",
    "Country_Code": "PRT",
    "Year_2016": 10324611
  },
  {
    "Country": "Paraguay",
    "Country_Code": "PRY",
    "Year_2016": 6725308
  },
  {
    "Country": "West Bank and Gaza",
    "Country_Code": "PSE",
    "Year_2016": 4551566
  },
  {
    "Country": "Pacific island small states",
    "Country_Code": "PSS",
    "Year_2016": 2388875
  },
  {
    "Country": "Post-demographic dividend",
    "Country_Code": "PST",
    "Year_2016": 1102730983
  },
  {
    "Country": "French Polynesia",
    "Country_Code": "PYF",
    "Year_2016": 280208
  },
  {
    "Country": "Qatar",
    "Country_Code": "QAT",
    "Year_2016": 2569804
  },
  {
    "Country": "Romania",
    "Country_Code": "ROU",
    "Year_2016": 19705301
  },
  {
    "Country": "Russian Federation",
    "Country_Code": "RUS",
    "Year_2016": 144342396
  },
  {
    "Country": "Rwanda",
    "Country_Code": "RWA",
    "Year_2016": 11917508
  },
  {
    "Country": "South Asia",
    "Country_Code": "SAS",
    "Year_2016": 1766383450
  },
  {
    "Country": "Saudi Arabia",
    "Country_Code": "SAU",
    "Year_2016": 32275687
  },
  {
    "Country": "Sudan",
    "Country_Code": "SDN",
    "Year_2016": 39578828
  },
  {
    "Country": "Senegal",
    "Country_Code": "SEN",
    "Year_2016": 15411614
  },
  {
    "Country": "Singapore",
    "Country_Code": "SGP",
    "Year_2016": 5607283
  },
  {
    "Country": "Solomon Islands",
    "Country_Code": "SLB",
    "Year_2016": 599419
  },
  {
    "Country": "Sierra Leone",
    "Country_Code": "SLE",
    "Year_2016": 7396190
  },
  {
    "Country": "El Salvador",
    "Country_Code": "SLV",
    "Year_2016": 6344722
  },
  {
    "Country": "San Marino",
    "Country_Code": "SMR",
    "Year_2016": 33203
  },
  {
    "Country": "Somalia",
    "Country_Code": "SOM",
    "Year_2016": 14317996
  },
  {
    "Country": "Serbia",
    "Country_Code": "SRB",
    "Year_2016": 7057412
  },
  {
    "Country": "Sub-Saharan Africa (excluding high income)",
    "Country_Code": "SSA",
    "Year_2016": 1033011458
  },
  {
    "Country": "South Sudan",
    "Country_Code": "SSD",
    "Year_2016": 12230730
  },
  {
    "Country": "Sub-Saharan Africa",
    "Country_Code": "SSF",
    "Year_2016": 1033106135
  },
  {
    "Country": "Small states",
    "Country_Code": "SST",
    "Year_2016": 39618156
  },
  {
    "Country": "Sao Tome and Principe",
    "Country_Code": "STP",
    "Year_2016": 199910
  },
  {
    "Country": "Suriname",
    "Country_Code": "SUR",
    "Year_2016": 558368
  },
  {
    "Country": "Slovak Republic",
    "Country_Code": "SVK",
    "Year_2016": 5428704
  },
  {
    "Country": "Slovenia",
    "Country_Code": "SVN",
    "Year_2016": 2064845
  },
  {
    "Country": "Sweden",
    "Country_Code": "SWE",
    "Year_2016": 9903122
  },
  {
    "Country": "Swaziland",
    "Country_Code": "SWZ",
    "Year_2016": 1343098
  },
  {
    "Country": "Sint Maarten (Dutch part)",
    "Country_Code": "SXM",
    "Year_2016": 40005
  },
  {
    "Country": "Seychelles",
    "Country_Code": "SYC",
    "Year_2016": 94677
  },
  {
    "Country": "Syrian Arab Republic",
    "Country_Code": "SYR",
    "Year_2016": 18430453
  },
  {
    "Country": "Turks and Caicos Islands",
    "Country_Code": "TCA",
    "Year_2016": 34900
  },
  {
    "Country": "Chad",
    "Country_Code": "TCD",
    "Year_2016": 14452543
  },
  {
    "Country": "East Asia & Pacific (IDA & IBRD countries)",
    "Country_Code": "TEA",
    "Year_2016": 2026028438
  },
  {
    "Country": "Europe & Central Asia (IDA & IBRD countries)",
    "Country_Code": "TEC",
    "Year_2016": 455372659
  },
  {
    "Country": "Togo",
    "Country_Code": "TGO",
    "Year_2016": 7606374
  },
  {
    "Country": "Thailand",
    "Country_Code": "THA",
    "Year_2016": 68863514
  },
  {
    "Country": "Tajikistan",
    "Country_Code": "TJK",
    "Year_2016": 8734951
  },
  {
    "Country": "Turkmenistan",
    "Country_Code": "TKM",
    "Year_2016": 5662544
  },
  {
    "Country": "Latin America & the Caribbean (IDA & IBRD countries)",
    "Country_Code": "TLA",
    "Year_2016": 621534921
  },
  {
    "Country": "Timor-Leste",
    "Country_Code": "TLS",
    "Year_2016": 1268671
  },
  {
    "Country": "Middle East & North Africa (IDA & IBRD countries)",
    "Country_Code": "TMN",
    "Year_2016": 369167489
  },
  {
    "Country": "Tonga",
    "Country_Code": "TON",
    "Year_2016": 107122
  },
  {
    "Country": "South Asia (IDA & IBRD)",
    "Country_Code": "TSA",
    "Year_2016": 1766383450
  },
  {
    "Country": "Sub-Saharan Africa (IDA & IBRD countries)",
    "Country_Code": "TSS",
    "Year_2016": 1033106135
  },
  {
    "Country": "Trinidad and Tobago",
    "Country_Code": "TTO",
    "Year_2016": 1364962
  },
  {
    "Country": "Tunisia",
    "Country_Code": "TUN",
    "Year_2016": 11403248
  },
  {
    "Country": "Turkey",
    "Country_Code": "TUR",
    "Year_2016": 79512426
  },
  {
    "Country": "Tuvalu",
    "Country_Code": "TUV",
    "Year_2016": 11097
  },
  {
    "Country": "Tanzania",
    "Country_Code": "TZA",
    "Year_2016": 55572201
  },
  {
    "Country": "Uganda",
    "Country_Code": "UGA",
    "Year_2016": 41487965
  },
  {
    "Country": "Ukraine",
    "Country_Code": "UKR",
    "Year_2016": 45004645
  },
  {
    "Country": "Upper middle income",
    "Country_Code": "UMC",
    "Year_2016": 2579909675
  },
  {
    "Country": "Uruguay",
    "Country_Code": "URY",
    "Year_2016": 3444006
  },
  {
    "Country": "United States",
    "Country_Code": "USA",
    "Year_2016": 323127513
  },
  {
    "Country": "Uzbekistan",
    "Country_Code": "UZB",
    "Year_2016": 31848200
  },
  {
    "Country": "St. Vincent and the Grenadines",
    "Country_Code": "VCT",
    "Year_2016": 109643
  },
  {
    "Country": "Venezuela, RB",
    "Country_Code": "VEN",
    "Year_2016": 31568179
  },
  {
    "Country": "British Virgin Islands",
    "Country_Code": "VGB",
    "Year_2016": 30661
  },
  {
    "Country": "Virgin Islands (U.S.)",
    "Country_Code": "VIR",
    "Year_2016": 102951
  },
  {
    "Country": "Vietnam",
    "Country_Code": "VNM",
    "Year_2016": 92701100
  },
  {
    "Country": "Vanuatu",
    "Country_Code": "VUT",
    "Year_2016": 270402
  },
  {
    "Country": "World",
    "Country_Code": "WLD",
    "Year_2016": 7442135578
  },
  {
    "Country": "Samoa",
    "Country_Code": "WSM",
    "Year_2016": 195125
  },
  {
    "Country": "Kosovo",
    "Country_Code": "XKX",
    "Year_2016": 1816200
  },
  {
    "Country": "Yemen, Rep.",
    "Country_Code": "YEM",
    "Year_2016": 27584213
  },
  {
    "Country": "South Africa",
    "Country_Code": "ZAF",
    "Year_2016": 55908865
  },
  {
    "Country": "Zambia",
    "Country_Code": "ZMB",
    "Year_2016": 16591390
  },
  {
    "Country": "Zimbabwe",
    "Country_Code": "ZWE",
    "Year_2016": 16150362
  }
];

const Departures = [
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Aruba",
    "Country Code": "ABW",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Afghanistan",
    "Country Code": "AFG",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Angola",
    "Country Code": "AGO",
    "Latest": 0
  },
  {
    "2015": 4504000,
    "2016": 4852000,
    "2017": 5186000,
    "2018": "",
    "2019": "",
    "Country Name": "Albania",
    "Country Code": "ALB",
    "Latest": 5186000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Andorra",
    "Country Code": "AND",
    "Latest": 0
  },
  {
    "2015": 7807000,
    "2016": 10446000,
    "2017": 12258000,
    "2018": "",
    "2019": "",
    "Country Name": "Argentina",
    "Country Code": "ARG",
    "Latest": 12258000
  },
  {
    "2015": 1187000,
    "2016": 1263000,
    "2017": 1482000,
    "2018": "",
    "2019": "",
    "Country Name": "Armenia",
    "Country Code": "ARM",
    "Latest": 1482000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "American Samoa",
    "Country Code": "ASM",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Antigua and Barbuda",
    "Country Code": "ATG",
    "Latest": 0
  },
  {
    "2015": 9807000,
    "2016": 10380000,
    "2017": 10932000,
    "2018": "",
    "2019": "",
    "Country Name": "Australia",
    "Country Code": "AUS",
    "Latest": 10932000
  },
  {
    "2015": 10628000,
    "2016": 11534000,
    "2017": 11491000,
    "2018": "",
    "2019": "",
    "Country Name": "Austria",
    "Country Code": "AUT",
    "Latest": 11534000
  },
  {
    "2015": 4096000,
    "2016": 4282000,
    "2017": 4109000,
    "2018": "",
    "2019": "",
    "Country Name": "Azerbaijan",
    "Country Code": "AZE",
    "Latest": 4282000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Burundi",
    "Country Code": "BDI",
    "Latest": 0
  },
  {
    "2015": 10835000,
    "2016": 13372000,
    "2017": 12153000,
    "2018": "",
    "2019": "",
    "Country Name": "Belgium",
    "Country Code": "BEL",
    "Latest": 13372000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Benin",
    "Country Code": "BEN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Burkina Faso",
    "Country Code": "BFA",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bangladesh",
    "Country Code": "BGD",
    "Latest": 0
  },
  {
    "2015": 4632000,
    "2016": 5392000,
    "2017": 6228000,
    "2018": "",
    "2019": "",
    "Country Name": "Bulgaria",
    "Country Code": "BGR",
    "Latest": 6228000
  },
  {
    "2015": 4741000,
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bahrain",
    "Country Code": "BHR",
    "Latest": 4741000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bahamas, The",
    "Country Code": "BHS",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bosnia and Herzegovina",
    "Country Code": "BIH",
    "Latest": 0
  },
  {
    "2015": 671000,
    "2016": 467000,
    "2017": 706000,
    "2018": "",
    "2019": "",
    "Country Name": "Belarus",
    "Country Code": "BLR",
    "Latest": 706000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Belize",
    "Country Code": "BLZ",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bermuda",
    "Country Code": "BMU",
    "Latest": 0
  },
  {
    "2015": 965000,
    "2016": 1048000,
    "2017": 1105000,
    "2018": "",
    "2019": "",
    "Country Name": "Bolivia",
    "Country Code": "BOL",
    "Latest": 1105000
  },
  {
    "2015": 9384000,
    "2016": 8592000,
    "2017": 9458000,
    "2018": "",
    "2019": "",
    "Country Name": "Brazil",
    "Country Code": "BRA",
    "Latest": 9458000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Barbados",
    "Country Code": "BRB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Brunei Darussalam",
    "Country Code": "BRN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bhutan",
    "Country Code": "BTN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Botswana",
    "Country Code": "BWA",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Central African Republic",
    "Country Code": "CAF",
    "Latest": 0
  },
  {
    "2015": 32267000,
    "2016": 31278000,
    "2017": 33060000,
    "2018": "",
    "2019": "",
    "Country Name": "Canada",
    "Country Code": "CAN",
    "Latest": 33060000
  },
  {
    "2015": 13601000,
    "2016": 13857000,
    "2017": 15318000,
    "2018": "",
    "2019": "",
    "Country Name": "Switzerland",
    "Country Code": "CHE",
    "Latest": 15318000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Channel Islands",
    "Country Code": "CHI",
    "Latest": 0
  },
  {
    "2015": 3359000,
    "2016": 3553000,
    "2017": 3620000,
    "2018": "",
    "2019": "",
    "Country Name": "Chile",
    "Country Code": "CHL",
    "Latest": 3620000
  },
  {
    "2015": 127860000,
    "2016": 135130000,
    "2017": 143035000,
    "2018": "",
    "2019": "",
    "Country Name": "China",
    "Country Code": "CHN",
    "Latest": 143035000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cote d'Ivoire",
    "Country Code": "CIV",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cameroon",
    "Country Code": "CMR",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Congo, Rep.",
    "Country Code": "COG",
    "Latest": 0
  },
  {
    "2015": 3862000,
    "2016": 3795000,
    "2017": 4017000,
    "2018": "",
    "2019": "",
    "Country Name": "Colombia",
    "Country Code": "COL",
    "Latest": 4017000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Comoros",
    "Country Code": "COM",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cabo Verde",
    "Country Code": "CPV",
    "Latest": 0
  },
  {
    "2015": 919000,
    "2016": 1036000,
    "2017": 1150000,
    "2018": "",
    "2019": "",
    "Country Name": "Costa Rica",
    "Country Code": "CRI",
    "Latest": 1150000
  },
  {
    "2015": 580000,
    "2016": 894000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cuba",
    "Country Code": "CUB",
    "Latest": 894000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Curacao",
    "Country Code": "CUW",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cayman Islands",
    "Country Code": "CYM",
    "Latest": 0
  },
  {
    "2015": 1119000,
    "2016": 1268000,
    "2017": 1407000,
    "2018": "",
    "2019": "",
    "Country Name": "Cyprus",
    "Country Code": "CYP",
    "Latest": 1407000
  },
  {
    "2015": 5856000,
    "2016": 6027000,
    "2017": 6775000,
    "2018": "",
    "2019": "",
    "Country Name": "Czech Republic",
    "Country Code": "CZE",
    "Latest": 6775000
  },
  {
    "2015": 83737000,
    "2016": 90966000,
    "2017": 92402000,
    "2018": "",
    "2019": "",
    "Country Name": "Germany",
    "Country Code": "DEU",
    "Latest": 92402000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Djibouti",
    "Country Code": "DJI",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Dominica",
    "Country Code": "DMA",
    "Latest": 0
  },
  {
    "2015": 8991000,
    "2016": 9651000,
    "2017": 8102000,
    "2018": "",
    "2019": "",
    "Country Name": "Denmark",
    "Country Code": "DNK",
    "Latest": 9651000
  },
  {
    "2015": 478000,
    "2016": 500000,
    "2017": 522000,
    "2018": "",
    "2019": "",
    "Country Name": "Dominican Republic",
    "Country Code": "DOM",
    "Latest": 522000
  },
  {
    "2015": 3638000,
    "2016": 4530000,
    "2017": 5058000,
    "2018": "",
    "2019": "",
    "Country Name": "Algeria",
    "Country Code": "DZA",
    "Latest": 5058000
  },
  {
    "2015": 1398000,
    "2016": 1551000,
    "2017": 1547000,
    "2018": "",
    "2019": "",
    "Country Name": "Ecuador",
    "Country Code": "ECU",
    "Latest": 1551000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Egypt, Arab Rep.",
    "Country Code": "EGY",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Eritrea",
    "Country Code": "ERI",
    "Latest": 0
  },
  {
    "2015": 14407000,
    "2016": 15405000,
    "2017": 17031000,
    "2018": "",
    "2019": "",
    "Country Name": "Spain",
    "Country Code": "ESP",
    "Latest": 17031000
  },
  {
    "2015": 1250000,
    "2016": 1339000,
    "2017": 1279000,
    "2018": "",
    "2019": "",
    "Country Name": "Estonia",
    "Country Code": "EST",
    "Latest": 1339000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Ethiopia",
    "Country Code": "ETH",
    "Latest": 0
  },
  {
    "2015": 8904000,
    "2016": 9125000,
    "2017": 9330000,
    "2018": "",
    "2019": "",
    "Country Name": "Finland",
    "Country Code": "FIN",
    "Latest": 9330000
  },
  {
    "2015": "",
    "2016": 156000,
    "2017": 169000,
    "2018": "",
    "2019": "",
    "Country Name": "Fiji",
    "Country Code": "FJI",
    "Latest": 169000
  },
  {
    "2015": 26648000,
    "2016": 26483000,
    "2017": 29055000,
    "2018": "",
    "2019": "",
    "Country Name": "France",
    "Country Code": "FRA",
    "Latest": 29055000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Faroe Islands",
    "Country Code": "FRO",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Micronesia, Fed. Sts.",
    "Country Code": "FSM",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Gabon",
    "Country Code": "GAB",
    "Latest": 0
  },
  {
    "2015": 65720000,
    "2016": 70815000,
    "2017": 74189000,
    "2018": "",
    "2019": "",
    "Country Name": "United Kingdom",
    "Country Code": "GBR",
    "Latest": 74189000
  },
  {
    "2015": 3136000,
    "2016": 3400000,
    "2017": 3851000,
    "2018": "",
    "2019": "",
    "Country Name": "Georgia",
    "Country Code": "GEO",
    "Latest": 3851000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Ghana",
    "Country Code": "GHA",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Gibraltar",
    "Country Code": "GIB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guinea",
    "Country Code": "GIN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Gambia, The",
    "Country Code": "GMB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guinea-Bissau",
    "Country Code": "GNB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Equatorial Guinea",
    "Country Code": "GNQ",
    "Latest": 0
  },
  {
    "2015": 6291000,
    "2016": 7235000,
    "2017": 7685000,
    "2018": "",
    "2019": "",
    "Country Name": "Greece",
    "Country Code": "GRC",
    "Latest": 7685000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Grenada",
    "Country Code": "GRD",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Greenland",
    "Country Code": "GRL",
    "Latest": 0
  },
  {
    "2015": 1130000,
    "2016": 1195000,
    "2017": 1328000,
    "2018": "",
    "2019": "",
    "Country Name": "Guatemala",
    "Country Code": "GTM",
    "Latest": 1328000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guam",
    "Country Code": "GUM",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guyana",
    "Country Code": "GUY",
    "Latest": 0
  },
  {
    "2015": 89082000,
    "2016": 91758000,
    "2017": 91304000,
    "2018": "",
    "2019": "",
    "Country Name": "Hong Kong SAR, China",
    "Country Code": "HKG",
    "Latest": 91758000
  },
  {
    "2015": 692000,
    "2016": 654000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Honduras",
    "Country Code": "HND",
    "Latest": 692000
  },
  {
    "2015": 2578000,
    "2016": 1615000,
    "2017": 1923000,
    "2018": "",
    "2019": "",
    "Country Name": "Croatia",
    "Country Code": "HRV",
    "Latest": 2578000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Haiti",
    "Country Code": "HTI",
    "Latest": 0
  },
  {
    "2015": 17276000,
    "2016": 18895000,
    "2017": 20297000,
    "2018": "",
    "2019": "",
    "Country Name": "Hungary",
    "Country Code": "HUN",
    "Latest": 20297000
  },
  {
    "2015": 8176000,
    "2016": 8340000,
    "2017": 8856000,
    "2018": "",
    "2019": "",
    "Country Name": "Indonesia",
    "Country Code": "IDN",
    "Latest": 8856000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Isle of Man",
    "Country Code": "IMN",
    "Latest": 0
  },
  {
    "2015": 20376000,
    "2016": 21872000,
    "2017": 23943000,
    "2018": "",
    "2019": "",
    "Country Name": "India",
    "Country Code": "IND",
    "Latest": 23943000
  },
  {
    "2015": 7094000,
    "2016": 7646000,
    "2017": 8171000,
    "2018": "",
    "2019": "",
    "Country Name": "Ireland",
    "Country Code": "IRL",
    "Latest": 8171000
  },
  {
    "2015": 6620000,
    "2016": 9007000,
    "2017": 10543000,
    "2018": "",
    "2019": "",
    "Country Name": "Iran, Islamic Rep.",
    "Country Code": "IRN",
    "Latest": 10543000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Iraq",
    "Country Code": "IRQ",
    "Latest": 0
  },
  {
    "2015": 450000,
    "2016": 536000,
    "2017": 619000,
    "2018": "",
    "2019": "",
    "Country Name": "Iceland",
    "Country Code": "ISL",
    "Latest": 619000
  },
  {
    "2015": 5891000,
    "2016": 6781000,
    "2017": 7597000,
    "2018": "",
    "2019": "",
    "Country Name": "Israel",
    "Country Code": "ISR",
    "Latest": 7597000
  },
  {
    "2015": 27494000,
    "2016": 29067000,
    "2017": 31805000,
    "2018": "",
    "2019": "",
    "Country Name": "Italy",
    "Country Code": "ITA",
    "Latest": 31805000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Jamaica",
    "Country Code": "JAM",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": 1511000,
    "2017": 1592000,
    "2018": "",
    "2019": "",
    "Country Name": "Jordan",
    "Country Code": "JOR",
    "Latest": 1592000
  },
  {
    "2015": 16214000,
    "2016": 17116000,
    "2017": 17889000,
    "2018": "",
    "2019": "",
    "Country Name": "Japan",
    "Country Code": "JPN",
    "Latest": 17889000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Kazakhstan",
    "Country Code": "KAZ",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Kenya",
    "Country Code": "KEN",
    "Latest": 0
  },
  {
    "2015": 4008000,
    "2016": 4185000,
    "2017": 4446000,
    "2018": "",
    "2019": "",
    "Country Name": "Kyrgyz Republic",
    "Country Code": "KGZ",
    "Latest": 4446000
  },
  {
    "2015": 1194000,
    "2016": 1434000,
    "2017": 1752000,
    "2018": "",
    "2019": "",
    "Country Name": "Cambodia",
    "Country Code": "KHM",
    "Latest": 1752000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Kiribati",
    "Country Code": "KIR",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Kitts and Nevis",
    "Country Code": "KNA",
    "Latest": 0
  },
  {
    "2015": 19310000,
    "2016": 22383000,
    "2017": 26496000,
    "2018": "",
    "2019": "",
    "Country Name": "Korea, Rep.",
    "Country Code": "KOR",
    "Latest": 26496000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Kuwait",
    "Country Code": "KWT",
    "Latest": 0
  },
  {
    "2015": 3067000,
    "2016": 3059000,
    "2017": 3049000,
    "2018": "",
    "2019": "",
    "Country Name": "Lao PDR",
    "Country Code": "LAO",
    "Latest": 3067000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Lebanon",
    "Country Code": "LBN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Lucia",
    "Country Code": "LCA",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Liechtenstein",
    "Country Code": "LIE",
    "Latest": 0
  },
  {
    "2015": 1356000,
    "2016": 1448000,
    "2017": 1439000,
    "2018": "",
    "2019": "",
    "Country Name": "Sri Lanka",
    "Country Code": "LKA",
    "Latest": 1448000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Lesotho",
    "Country Code": "LSO",
    "Latest": 0
  },
  {
    "2015": 1860000,
    "2016": 1953000,
    "2017": 2032000,
    "2018": "",
    "2019": "",
    "Country Name": "Lithuania",
    "Country Code": "LTU",
    "Latest": 2032000
  },
  {
    "2015": 1702000,
    "2016": 1588000,
    "2017": 1802000,
    "2018": "",
    "2019": "",
    "Country Name": "Luxembourg",
    "Country Code": "LUX",
    "Latest": 1802000
  },
  {
    "2015": 1720000,
    "2016": 1939000,
    "2017": 2055000,
    "2018": "",
    "2019": "",
    "Country Name": "Latvia",
    "Country Code": "LVA",
    "Latest": 2055000
  },
  {
    "2015": 1466000,
    "2016": 1251000,
    "2017": 1391000,
    "2018": "",
    "2019": "",
    "Country Name": "Macao SAR, China",
    "Country Code": "MAC",
    "Latest": 1466000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Martin (French part)",
    "Country Code": "MAF",
    "Latest": 0
  },
  {
    "2015": 1910000,
    "2016": 1864000,
    "2017": 1849000,
    "2018": "",
    "2019": "",
    "Country Name": "Morocco",
    "Country Code": "MAR",
    "Latest": 1910000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Monaco",
    "Country Code": "MCO",
    "Latest": 0
  },
  {
    "2015": 189800,
    "2016": 177000,
    "2017": 229000,
    "2018": "",
    "2019": "",
    "Country Name": "Moldova",
    "Country Code": "MDA",
    "Latest": 229000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Madagascar",
    "Country Code": "MDG",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Maldives",
    "Country Code": "MDV",
    "Latest": 0
  },
  {
    "2015": 19603000,
    "2016": 20223000,
    "2017": 19067000,
    "2018": "",
    "2019": "",
    "Country Name": "Mexico",
    "Country Code": "MEX",
    "Latest": 20223000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Marshall Islands",
    "Country Code": "MHL",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "North Macedonia",
    "Country Code": "MKD",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Mali",
    "Country Code": "MLI",
    "Latest": 0
  },
  {
    "2015": 428000,
    "2016": 497000,
    "2017": 573000,
    "2018": "",
    "2019": "",
    "Country Name": "Malta",
    "Country Code": "MLT",
    "Latest": 573000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Myanmar",
    "Country Code": "MMR",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Montenegro",
    "Country Code": "MNE",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Mongolia",
    "Country Code": "MNG",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Northern Mariana Islands",
    "Country Code": "MNP",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Mozambique",
    "Country Code": "MOZ",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Mauritania",
    "Country Code": "MRT",
    "Latest": 0
  },
  {
    "2015": 242000,
    "2016": 260000,
    "2017": 283000,
    "2018": "",
    "2019": "",
    "Country Name": "Mauritius",
    "Country Code": "MUS",
    "Latest": 283000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Malawi",
    "Country Code": "MWI",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Malaysia",
    "Country Code": "MYS",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Namibia",
    "Country Code": "NAM",
    "Latest": 0
  },
  {
    "2015": 127000,
    "2016": 134000,
    "2017": 135000,
    "2018": "",
    "2019": "",
    "Country Name": "New Caledonia",
    "Country Code": "NCL",
    "Latest": 135000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Niger",
    "Country Code": "NER",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Nigeria",
    "Country Code": "NGA",
    "Latest": 0
  },
  {
    "2015": 925000,
    "2016": 981000,
    "2017": 982000,
    "2018": "",
    "2019": "",
    "Country Name": "Nicaragua",
    "Country Code": "NIC",
    "Latest": 982000
  },
  {
    "2015": 18070000,
    "2016": 17938000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Netherlands",
    "Country Code": "NLD",
    "Latest": 18070000
  },
  {
    "2015": 8750000,
    "2016": 8030000,
    "2017": 8170000,
    "2018": "",
    "2019": "",
    "Country Name": "Norway",
    "Country Code": "NOR",
    "Latest": 8750000
  },
  {
    "2015": "",
    "2016": "",
    "2017": 1197000,
    "2018": "",
    "2019": "",
    "Country Name": "Nepal",
    "Country Code": "NPL",
    "Latest": 1197000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Nauru",
    "Country Code": "NRU",
    "Latest": 0
  },
  {
    "2015": 2412000,
    "2016": 2611000,
    "2017": 2853000,
    "2018": "",
    "2019": "",
    "Country Name": "New Zealand",
    "Country Code": "NZL",
    "Latest": 2853000
  },
  {
    "2015": 3838000,
    "2016": 4167000,
    "2017": 4473000,
    "2018": "",
    "2019": "",
    "Country Name": "Oman",
    "Country Code": "OMN",
    "Latest": 4473000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Pakistan",
    "Country Code": "PAK",
    "Latest": 0
  },
  {
    "2015": 740000,
    "2016": 770000,
    "2017": 917000,
    "2018": "",
    "2019": "",
    "Country Name": "Panama",
    "Country Code": "PAN",
    "Latest": 917000
  },
  {
    "2015": 2595000,
    "2016": 2751000,
    "2017": 2875000,
    "2018": "",
    "2019": "",
    "Country Name": "Peru",
    "Country Code": "PER",
    "Latest": 2875000
  },
  {
    "2015": 5115000,
    "2016": 5703000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Philippines",
    "Country Code": "PHL",
    "Latest": 5703000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Palau",
    "Country Code": "PLW",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Papua New Guinea",
    "Country Code": "PNG",
    "Latest": 0
  },
  {
    "2015": 44300000,
    "2016": 44500000,
    "2017": 46700000,
    "2018": "",
    "2019": "",
    "Country Name": "Poland",
    "Country Code": "POL",
    "Latest": 46700000
  },
  {
    "2015": 746000,
    "2016": 789000,
    "2017": 792000,
    "2018": "",
    "2019": "",
    "Country Name": "Puerto Rico",
    "Country Code": "PRI",
    "Latest": 792000
  },
  {
    "2015": 1893000,
    "2016": 1941000,
    "2017": 2195000,
    "2018": "",
    "2019": "",
    "Country Name": "Portugal",
    "Country Code": "PRT",
    "Latest": 2195000
  },
  {
    "2015": 1008000,
    "2016": 1503000,
    "2017": 1548000,
    "2018": "",
    "2019": "",
    "Country Name": "Paraguay",
    "Country Code": "PRY",
    "Latest": 1548000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "West Bank and Gaza",
    "Country Code": "PSE",
    "Latest": 0
  },
  {
    "2015": 55000,
    "2016": 48000,
    "2017": 55000,
    "2018": "",
    "2019": "",
    "Country Name": "French Polynesia",
    "Country Code": "PYF",
    "Latest": 55000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Qatar",
    "Country Code": "QAT",
    "Latest": 0
  },
  {
    "2015": 13118000,
    "2016": 16128000,
    "2017": 19953000,
    "2018": "",
    "2019": "",
    "Country Name": "Romania",
    "Country Code": "ROU",
    "Latest": 19953000
  },
  {
    "2015": 34550000,
    "2016": 31659000,
    "2017": 39629000,
    "2018": "",
    "2019": "",
    "Country Name": "Russian Federation",
    "Country Code": "RUS",
    "Latest": 39629000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Rwanda",
    "Country Code": "RWA",
    "Latest": 0
  },
  {
    "2015": 28138552.8270597,
    "2016": 30194692.2477008,
    "2017": 32864565.9790369,
    "2018": "",
    "2019": "",
    "Country Name": "South Asia",
    "Country Code": "SAS",
    "Latest": 32864565.9790369
  },
  {
    "2015": 20819000,
    "2016": 21207000,
    "2017": 21071000,
    "2018": "",
    "2019": "",
    "Country Name": "Saudi Arabia",
    "Country Code": "SAU",
    "Latest": 21207000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sudan",
    "Country Code": "SDN",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Senegal",
    "Country Code": "SEN",
    "Latest": 0
  },
  {
    "2015": 9125000,
    "2016": 9474000,
    "2017": 9889000,
    "2018": "",
    "2019": "",
    "Country Name": "Singapore",
    "Country Code": "SGP",
    "Latest": 9889000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Solomon Islands",
    "Country Code": "SLB",
    "Latest": 0
  },
  {
    "2015": 61000,
    "2016": 92000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sierra Leone",
    "Country Code": "SLE",
    "Latest": 92000
  },
  {
    "2015": 1618000,
    "2016": 1804000,
    "2017": 1871000,
    "2018": "",
    "2019": "",
    "Country Name": "El Salvador",
    "Country Code": "SLV",
    "Latest": 1871000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "San Marino",
    "Country Code": "SMR",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Serbia",
    "Country Code": "SRB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sao Tome and Principe",
    "Country Code": "STP",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Suriname",
    "Country Code": "SUR",
    "Latest": 0
  },
  {
    "2015": 2777000,
    "2016": 3095000,
    "2017": 3870000,
    "2018": "",
    "2019": "",
    "Country Name": "Slovak Republic",
    "Country Code": "SVK",
    "Latest": 3870000
  },
  {
    "2015": 2867000,
    "2016": 2853000,
    "2017": 3013000,
    "2018": "",
    "2019": "",
    "Country Name": "Slovenia",
    "Country Code": "SVN",
    "Latest": 3013000
  },
  {
    "2015": "",
    "2016": "",
    "2017": 21232000,
    "2018": "",
    "2019": "",
    "Country Name": "Sweden",
    "Country Code": "SWE",
    "Latest": 21232000
  },
  {
    "2015": 1713000,
    "2016": 1789000,
    "2017": 1751000,
    "2018": "",
    "2019": "",
    "Country Name": "Eswatini",
    "Country Code": "SWZ",
    "Latest": 1789000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sint Maarten (Dutch part)",
    "Country Code": "SXM",
    "Latest": 0
  },
  {
    "2015": 56000,
    "2016": 68000,
    "2017": 74000,
    "2018": "",
    "2019": "",
    "Country Name": "Seychelles",
    "Country Code": "SYC",
    "Latest": 74000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Turks and Caicos Islands",
    "Country Code": "TCA",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": 56000,
    "2017": 52000,
    "2018": "",
    "2019": "",
    "Country Name": "Chad",
    "Country Code": "TCD",
    "Latest": 56000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Togo",
    "Country Code": "TGO",
    "Latest": 0
  },
  {
    "2015": 6794000,
    "2016": 8204000,
    "2017": 8963000,
    "2018": "",
    "2019": "",
    "Country Name": "Thailand",
    "Country Code": "THA",
    "Latest": 8963000
  },
  {
    "2015": 16000,
    "2016": 22000,
    "2017": 31000,
    "2018": "",
    "2019": "",
    "Country Name": "Tajikistan",
    "Country Code": "TJK",
    "Latest": 31000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Timor-Leste",
    "Country Code": "TLS",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Tonga",
    "Country Code": "TON",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Trinidad and Tobago",
    "Country Code": "TTO",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": 1830000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Tunisia",
    "Country Code": "TUN",
    "Latest": 1830000
  },
  {
    "2015": 8751000,
    "2016": 7892000,
    "2017": 8887000,
    "2018": "",
    "2019": "",
    "Country Name": "Turkey",
    "Country Code": "TUR",
    "Latest": 8887000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Tuvalu",
    "Country Code": "TUV",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Tanzania",
    "Country Code": "TZA",
    "Latest": 0
  },
  {
    "2015": 523000,
    "2016": 568000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Uganda",
    "Country Code": "UGA",
    "Latest": 568000
  },
  {
    "2015": 23142000,
    "2016": 24668000,
    "2017": 26437000,
    "2018": "",
    "2019": "",
    "Country Name": "Ukraine",
    "Country Code": "UKR",
    "Latest": 26437000
  },
  {
    "2015": 2217000,
    "2016": 1715000,
    "2017": 1789000,
    "2018": "",
    "2019": "",
    "Country Name": "Uruguay",
    "Country Code": "URY",
    "Latest": 2217000
  },
  {
    "2015": 74191000,
    "2016": 80226000,
    "2017": 87703000,
    "2018": "",
    "2019": "",
    "Country Name": "United States",
    "Country Code": "USA",
    "Latest": 87703000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Uzbekistan",
    "Country Code": "UZB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Vincent and the Grenadines",
    "Country Code": "VCT",
    "Latest": 0
  },
  {
    "2015": 1539000,
    "2016": 1530000,
    "2017": 1079000,
    "2018": "",
    "2019": "",
    "Country Name": "Venezuela, RB",
    "Country Code": "VEN",
    "Latest": 1539000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "British Virgin Islands",
    "Country Code": "VGB",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Virgin Islands (U.S.)",
    "Country Code": "VIR",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Vietnam",
    "Country Code": "VNM",
    "Latest": 0
  },
  {
    "2015": 27000,
    "2016": 25000,
    "2017": 28000,
    "2018": "",
    "2019": "",
    "Country Name": "Vanuatu",
    "Country Code": "VUT",
    "Latest": 28000
  },
  {
    "2015": 54000,
    "2016": "",
    "2017": 55000,
    "2018": "",
    "2019": "",
    "Country Name": "Samoa",
    "Country Code": "WSM",
    "Latest": 55000
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "South Africa",
    "Country Code": "ZAF",
    "Latest": 0
  },
  {
    "2015": "",
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Zambia",
    "Country Code": "ZMB",
    "Latest": 0
  },
  {
    "2015": 3393000,
    "2016": 3192000,
    "2017": 2768000,
    "2018": "",
    "2019": "",
    "Country Name": "Zimbabwe",
    "Country Code": "ZWE",
    "Latest": 3393000
  }
];

const Arrivals =  [
  {
    "2016": 1102000,
    "2017": 1070500,
    "2018": "",
    "2019": "",
    "Country Name": "Aruba",
    "Country Code": "ABW",
    "Latest": 1102000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Afghanistan",
    "Country Code": "AFG",
    "Latest": 0
  },
  {
    "2016": 397000,
    "2017": 261000,
    "2018": "",
    "2019": "",
    "Country Name": "Angola",
    "Country Code": "AGO",
    "Latest": 397000
  },
  {
    "2016": 4070000,
    "2017": 4643000,
    "2018": "",
    "2019": "",
    "Country Name": "Albania",
    "Country Code": "ALB",
    "Latest": 4643000
  },
  {
    "2016": 2831000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Andorra",
    "Country Code": "AND",
    "Latest": 2831000
  },
  {
    "2016": 6655000,
    "2017": 6720000,
    "2018": "",
    "2019": "",
    "Country Name": "Argentina",
    "Country Code": "ARG",
    "Latest": 6720000
  },
  {
    "2016": 1260000,
    "2017": 1495000,
    "2018": "",
    "2019": "",
    "Country Name": "Armenia",
    "Country Code": "ARM",
    "Latest": 1495000
  },
  {
    "2016": 20100,
    "2017": 20000,
    "2018": "",
    "2019": "",
    "Country Name": "American Samoa",
    "Country Code": "ASM",
    "Latest": 20100
  },
  {
    "2016": 265000,
    "2017": 247000,
    "2018": "",
    "2019": "",
    "Country Name": "Antigua and Barbuda",
    "Country Code": "ATG",
    "Latest": 265000
  },
  {
    "2016": 8269000,
    "2017": 8815000,
    "2018": "",
    "2019": "",
    "Country Name": "Australia",
    "Country Code": "AUS",
    "Latest": 8815000
  },
  {
    "2016": 28121000,
    "2017": 29460000,
    "2018": "",
    "2019": "",
    "Country Name": "Austria",
    "Country Code": "AUT",
    "Latest": 29460000
  },
  {
    "2016": 2044000,
    "2017": 2454000,
    "2018": "",
    "2019": "",
    "Country Name": "Azerbaijan",
    "Country Code": "AZE",
    "Latest": 2454000
  },
  {
    "2016": 187000,
    "2017": 299000,
    "2018": "",
    "2019": "",
    "Country Name": "Burundi",
    "Country Code": "BDI",
    "Latest": 299000
  },
  {
    "2016": 7481000,
    "2017": 8385000,
    "2018": "",
    "2019": "",
    "Country Name": "Belgium",
    "Country Code": "BEL",
    "Latest": 8385000
  },
  {
    "2016": 267000,
    "2017": 281000,
    "2018": "",
    "2019": "",
    "Country Name": "Benin",
    "Country Code": "BEN",
    "Latest": 281000
  },
  {
    "2016": 152000,
    "2017": 143000,
    "2018": "",
    "2019": "",
    "Country Name": "Burkina Faso",
    "Country Code": "BFA",
    "Latest": 152000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Bangladesh",
    "Country Code": "BGD",
    "Latest": 0
  },
  {
    "2016": 8252000,
    "2017": 8883000,
    "2018": "",
    "2019": "",
    "Country Name": "Bulgaria",
    "Country Code": "BGR",
    "Latest": 8883000
  },
  {
    "2016": 10158000,
    "2017": 11370000,
    "2018": "",
    "2019": "",
    "Country Name": "Bahrain",
    "Country Code": "BHR",
    "Latest": 11370000
  },
  {
    "2016": 1499000,
    "2017": 1439000,
    "2018": "",
    "2019": "",
    "Country Name": "Bahamas, The",
    "Country Code": "BHS",
    "Latest": 1499000
  },
  {
    "2016": 778000,
    "2017": 923000,
    "2018": "",
    "2019": "",
    "Country Name": "Bosnia and Herzegovina",
    "Country Code": "BIH",
    "Latest": 923000
  },
  {
    "2016": 10935400,
    "2017": 11060200,
    "2018": "",
    "2019": "",
    "Country Name": "Belarus",
    "Country Code": "BLR",
    "Latest": 11060200
  },
  {
    "2016": 386000,
    "2017": 427000,
    "2018": "",
    "2019": "",
    "Country Name": "Belize",
    "Country Code": "BLZ",
    "Latest": 427000
  },
  {
    "2016": 244000,
    "2017": 270000,
    "2018": "",
    "2019": "",
    "Country Name": "Bermuda",
    "Country Code": "BMU",
    "Latest": 270000
  },
  {
    "2016": 959000,
    "2017": 1134000,
    "2018": "",
    "2019": "",
    "Country Name": "Bolivia",
    "Country Code": "BOL",
    "Latest": 1134000
  },
  {
    "2016": 6547000,
    "2017": 6589000,
    "2018": "",
    "2019": "",
    "Country Name": "Brazil",
    "Country Code": "BRA",
    "Latest": 6589000
  },
  {
    "2016": 632000,
    "2017": 664000,
    "2018": "",
    "2019": "",
    "Country Name": "Barbados",
    "Country Code": "BRB",
    "Latest": 664000
  },
  {
    "2016": 219000,
    "2017": 259000,
    "2018": "",
    "2019": "",
    "Country Name": "Brunei Darussalam",
    "Country Code": "BRN",
    "Latest": 259000
  },
  {
    "2016": 210000,
    "2017": 255000,
    "2018": "",
    "2019": "",
    "Country Name": "Bhutan",
    "Country Code": "BTN",
    "Latest": 255000
  },
  {
    "2016": 1574000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Botswana",
    "Country Code": "BWA",
    "Latest": 1574000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Central African Republic",
    "Country Code": "CAF",
    "Latest": 0
  },
  {
    "2016": 19971000,
    "2017": 20798000,
    "2018": "",
    "2019": "",
    "Country Name": "Canada",
    "Country Code": "CAN",
    "Latest": 20798000
  },
  {
    "2016": 9205000,
    "2017": 9889000,
    "2018": "",
    "2019": "",
    "Country Name": "Switzerland",
    "Country Code": "CHE",
    "Latest": 9889000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Channel Islands",
    "Country Code": "CHI",
    "Latest": 0
  },
  {
    "2016": 5641000,
    "2017": 6450000,
    "2018": "",
    "2019": "",
    "Country Name": "Chile",
    "Country Code": "CHL",
    "Latest": 6450000
  },
  {
    "2016": 59270000,
    "2017": 60740000,
    "2018": "",
    "2019": "",
    "Country Name": "China",
    "Country Code": "CHN",
    "Latest": 60740000
  },
  {
    "2016": 1583000,
    "2017": 1800000,
    "2018": "",
    "2019": "",
    "Country Name": "Cote d'Ivoire",
    "Country Code": "CIV",
    "Latest": 1800000
  },
  {
    "2016": 994000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Cameroon",
    "Country Code": "CMR",
    "Latest": 994000
  },
  {
    "2016": 224000,
    "2017": 206000,
    "2018": "",
    "2019": "",
    "Country Name": "Congo, Rep.",
    "Country Code": "COG",
    "Latest": 224000
  },
  {
    "2016": 3317000,
    "2017": 4113000,
    "2018": "",
    "2019": "",
    "Country Name": "Colombia",
    "Country Code": "COL",
    "Latest": 4113000
  },
  {
    "2016": 26800,
    "2017": 28000,
    "2018": "",
    "2019": "",
    "Country Name": "Comoros",
    "Country Code": "COM",
    "Latest": 28000
  },
  {
    "2016": 598000,
    "2017": 668000,
    "2018": "",
    "2019": "",
    "Country Name": "Cabo Verde",
    "Country Code": "CPV",
    "Latest": 668000
  },
  {
    "2016": 2925000,
    "2017": 2960000,
    "2018": "",
    "2019": "",
    "Country Name": "Costa Rica",
    "Country Code": "CRI",
    "Latest": 2960000
  },
  {
    "2016": 3975000,
    "2017": 4594000,
    "2018": "",
    "2019": "",
    "Country Name": "Cuba",
    "Country Code": "CUB",
    "Latest": 4594000
  },
  {
    "2016": 441000,
    "2017": 399000,
    "2018": "",
    "2019": "",
    "Country Name": "Curacao",
    "Country Code": "CUW",
    "Latest": 441000
  },
  {
    "2016": 385000,
    "2017": 418000,
    "2018": "",
    "2019": "",
    "Country Name": "Cayman Islands",
    "Country Code": "CYM",
    "Latest": 418000
  },
  {
    "2016": 3187000,
    "2017": 3652000,
    "2018": "",
    "2019": "",
    "Country Name": "Cyprus",
    "Country Code": "CYP",
    "Latest": 3652000
  },
  {
    "2016": 9321000,
    "2017": 10160000,
    "2018": "",
    "2019": "",
    "Country Name": "Czech Republic",
    "Country Code": "CZE",
    "Latest": 10160000
  },
  {
    "2016": 35555000,
    "2017": 37452000,
    "2018": "",
    "2019": "",
    "Country Name": "Germany",
    "Country Code": "DEU",
    "Latest": 37452000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Djibouti",
    "Country Code": "DJI",
    "Latest": 0
  },
  {
    "2016": 78000,
    "2017": 72000,
    "2018": "",
    "2019": "",
    "Country Name": "Dominica",
    "Country Code": "DMA",
    "Latest": 78000
  },
  {
    "2016": 10781000,
    "2017": 11743000,
    "2018": "",
    "2019": "",
    "Country Name": "Denmark",
    "Country Code": "DNK",
    "Latest": 11743000
  },
  {
    "2016": 5959300,
    "2017": 6188000,
    "2018": "",
    "2019": "",
    "Country Name": "Dominican Republic",
    "Country Code": "DOM",
    "Latest": 6188000
  },
  {
    "2016": 2039000,
    "2017": 2451000,
    "2018": "",
    "2019": "",
    "Country Name": "Algeria",
    "Country Code": "DZA",
    "Latest": 2451000
  },
  {
    "2016": 1418000,
    "2017": 1608000,
    "2018": "",
    "2019": "",
    "Country Name": "Ecuador",
    "Country Code": "ECU",
    "Latest": 1608000
  },
  {
    "2016": 5258000,
    "2017": 8157000,
    "2018": "",
    "2019": "",
    "Country Name": "Egypt, Arab Rep.",
    "Country Code": "EGY",
    "Latest": 8157000
  },
  {
    "2016": 142000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Eritrea",
    "Country Code": "ERI",
    "Latest": 142000
  },
  {
    "2016": 75315000,
    "2017": 81786000,
    "2018": "",
    "2019": "",
    "Country Name": "Spain",
    "Country Code": "ESP",
    "Latest": 81786000
  },
  {
    "2016": 3131000,
    "2017": 3245000,
    "2018": "",
    "2019": "",
    "Country Name": "Estonia",
    "Country Code": "EST",
    "Latest": 3245000
  },
  {
    "2016": 871000,
    "2017": 933000,
    "2018": "",
    "2019": "",
    "Country Name": "Ethiopia",
    "Country Code": "ETH",
    "Latest": 933000
  },
  {
    "2016": 2789000,
    "2017": 3180000,
    "2018": "",
    "2019": "",
    "Country Name": "Finland",
    "Country Code": "FIN",
    "Latest": 3180000
  },
  {
    "2016": 792000,
    "2017": 843000,
    "2018": "",
    "2019": "",
    "Country Name": "Fiji",
    "Country Code": "FJI",
    "Latest": 843000
  },
  {
    "2016": 82682000,
    "2017": 86861000,
    "2018": "",
    "2019": "",
    "Country Name": "France",
    "Country Code": "FRA",
    "Latest": 86861000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Faroe Islands",
    "Country Code": "FRO",
    "Latest": 0
  },
  {
    "2016": 29600,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Micronesia, Fed. Sts.",
    "Country Code": "FSM",
    "Latest": 29600
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Gabon",
    "Country Code": "GAB",
    "Latest": 0
  },
  {
    "2016": 35814000,
    "2017": 37651000,
    "2018": "",
    "2019": "",
    "Country Name": "United Kingdom",
    "Country Code": "GBR",
    "Latest": 37651000
  },
  {
    "2016": 5393000,
    "2017": 6483000,
    "2018": "",
    "2019": "",
    "Country Name": "Georgia",
    "Country Code": "GEO",
    "Latest": 6483000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Ghana",
    "Country Code": "GHA",
    "Latest": 0
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Gibraltar",
    "Country Code": "GIB",
    "Latest": 0
  },
  {
    "2016": 60000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guinea",
    "Country Code": "GIN",
    "Latest": 60000
  },
  {
    "2016": 161000,
    "2017": 162000,
    "2018": "",
    "2019": "",
    "Country Name": "Gambia, The",
    "Country Code": "GMB",
    "Latest": 162000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Guinea-Bissau",
    "Country Code": "GNB",
    "Latest": 0
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Equatorial Guinea",
    "Country Code": "GNQ",
    "Latest": 0
  },
  {
    "2016": 24799000,
    "2017": 27194000,
    "2018": "",
    "2019": "",
    "Country Name": "Greece",
    "Country Code": "GRC",
    "Latest": 27194000
  },
  {
    "2016": 156000,
    "2017": 168000,
    "2018": "",
    "2019": "",
    "Country Name": "Grenada",
    "Country Code": "GRD",
    "Latest": 168000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Greenland",
    "Country Code": "GRL",
    "Latest": 0
  },
  {
    "2016": 1906000,
    "2017": 2113000,
    "2018": "",
    "2019": "",
    "Country Name": "Guatemala",
    "Country Code": "GTM",
    "Latest": 2113000
  },
  {
    "2016": 1536000,
    "2017": 1544000,
    "2018": "",
    "2019": "",
    "Country Name": "Guam",
    "Country Code": "GUM",
    "Latest": 1544000
  },
  {
    "2016": 235000,
    "2017": 247000,
    "2018": "",
    "2019": "",
    "Country Name": "Guyana",
    "Country Code": "GUY",
    "Latest": 247000
  },
  {
    "2016": 26553000,
    "2017": 27884000,
    "2018": "",
    "2019": "",
    "Country Name": "Hong Kong SAR, China",
    "Country Code": "HKG",
    "Latest": 27884000
  },
  {
    "2016": 838000,
    "2017": 851000,
    "2018": "",
    "2019": "",
    "Country Name": "Honduras",
    "Country Code": "HND",
    "Latest": 851000
  },
  {
    "2016": 13809000,
    "2017": 15593000,
    "2018": "",
    "2019": "",
    "Country Name": "Croatia",
    "Country Code": "HRV",
    "Latest": 15593000
  },
  {
    "2016": 445000,
    "2017": 467000,
    "2018": "",
    "2019": "",
    "Country Name": "Haiti",
    "Country Code": "HTI",
    "Latest": 467000
  },
  {
    "2016": 5302000,
    "2017": 5650000,
    "2018": "",
    "2019": "",
    "Country Name": "Hungary",
    "Country Code": "HUN",
    "Latest": 5650000
  },
  {
    "2016": 11519000,
    "2017": 14040000,
    "2018": "",
    "2019": "",
    "Country Name": "Indonesia",
    "Country Code": "IDN",
    "Latest": 14040000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Isle of Man",
    "Country Code": "IMN",
    "Latest": 0
  },
  {
    "2016": 14570000,
    "2017": 15543000,
    "2018": "",
    "2019": "",
    "Country Name": "India",
    "Country Code": "IND",
    "Latest": 15543000
  },
  {
    "2016": 10100000,
    "2017": 10338000,
    "2018": "",
    "2019": "",
    "Country Name": "Ireland",
    "Country Code": "IRL",
    "Latest": 10338000
  },
  {
    "2016": 4942000,
    "2017": 4867000,
    "2018": "",
    "2019": "",
    "Country Name": "Iran, Islamic Rep.",
    "Country Code": "IRN",
    "Latest": 4942000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Iraq",
    "Country Code": "IRQ",
    "Latest": 0
  },
  {
    "2016": 1792000,
    "2017": 2225000,
    "2018": "",
    "2019": "",
    "Country Name": "Iceland",
    "Country Code": "ISL",
    "Latest": 2225000
  },
  {
    "2016": 2900000,
    "2017": 3613000,
    "2018": "",
    "2019": "",
    "Country Name": "Israel",
    "Country Code": "ISR",
    "Latest": 3613000
  },
  {
    "2016": 52372000,
    "2017": 58253000,
    "2018": "",
    "2019": "",
    "Country Name": "Italy",
    "Country Code": "ITA",
    "Latest": 58253000
  },
  {
    "2016": 2182000,
    "2017": 2353000,
    "2018": "",
    "2019": "",
    "Country Name": "Jamaica",
    "Country Code": "JAM",
    "Latest": 2353000
  },
  {
    "2016": 3567000,
    "2017": 3843500,
    "2018": "",
    "2019": "",
    "Country Name": "Jordan",
    "Country Code": "JOR",
    "Latest": 3843500
  },
  {
    "2016": 24040000,
    "2017": 28691000,
    "2018": "",
    "2019": "",
    "Country Name": "Japan",
    "Country Code": "JPN",
    "Latest": 28691000
  },
  {
    "2016": 6509000,
    "2017": 7701000,
    "2018": "",
    "2019": "",
    "Country Name": "Kazakhstan",
    "Country Code": "KAZ",
    "Latest": 7701000
  },
  {
    "2016": 1268000,
    "2017": 1364000,
    "2018": "",
    "2019": "",
    "Country Name": "Kenya",
    "Country Code": "KEN",
    "Latest": 1364000
  },
  {
    "2016": 3853000,
    "2017": 4568000,
    "2018": "",
    "2019": "",
    "Country Name": "Kyrgyz Republic",
    "Country Code": "KGZ",
    "Latest": 4568000
  },
  {
    "2016": 5012000,
    "2017": 5602000,
    "2018": "",
    "2019": "",
    "Country Name": "Cambodia",
    "Country Code": "KHM",
    "Latest": 5602000
  },
  {
    "2016": 5700,
    "2017": 5800,
    "2018": "",
    "2019": "",
    "Country Name": "Kiribati",
    "Country Code": "KIR",
    "Latest": 5800
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Kitts and Nevis",
    "Country Code": "KNA",
    "Latest": 0
  },
  {
    "2016": 17242000,
    "2017": 13336000,
    "2018": "",
    "2019": "",
    "Country Name": "Korea, Rep.",
    "Country Code": "KOR",
    "Latest": 17242000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Kuwait",
    "Country Code": "KWT",
    "Latest": 0
  },
  {
    "2016": 3315000,
    "2017": 3257000,
    "2018": "",
    "2019": "",
    "Country Name": "Lao PDR",
    "Country Code": "LAO",
    "Latest": 3315000
  },
  {
    "2016": 1688000,
    "2017": 1857000,
    "2018": "",
    "2019": "",
    "Country Name": "Lebanon",
    "Country Code": "LBN",
    "Latest": 1857000
  },
  {
    "2016": 348000,
    "2017": 386000,
    "2018": "",
    "2019": "",
    "Country Name": "St. Lucia",
    "Country Code": "LCA",
    "Latest": 386000
  },
  {
    "2016": 60000,
    "2017": 69000,
    "2018": "",
    "2019": "",
    "Country Name": "Liechtenstein",
    "Country Code": "LIE",
    "Latest": 69000
  },
  {
    "2016": 2051000,
    "2017": 2116400,
    "2018": "",
    "2019": "",
    "Country Name": "Sri Lanka",
    "Country Code": "LKA",
    "Latest": 2116400
  },
  {
    "2016": 1196000,
    "2017": 1137000,
    "2018": "",
    "2019": "",
    "Country Name": "Lesotho",
    "Country Code": "LSO",
    "Latest": 1196000
  },
  {
    "2016": 2296000,
    "2017": 2523000,
    "2018": "",
    "2019": "",
    "Country Name": "Lithuania",
    "Country Code": "LTU",
    "Latest": 2523000
  },
  {
    "2016": 1054000,
    "2017": 1046000,
    "2018": "",
    "2019": "",
    "Country Name": "Luxembourg",
    "Country Code": "LUX",
    "Latest": 1054000
  },
  {
    "2016": 1793000,
    "2017": 1949000,
    "2018": "",
    "2019": "",
    "Country Name": "Latvia",
    "Country Code": "LVA",
    "Latest": 1949000
  },
  {
    "2016": 15703600,
    "2017": 17255000,
    "2018": "",
    "2019": "",
    "Country Name": "Macao SAR, China",
    "Country Code": "MAC",
    "Latest": 17255000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "St. Martin (French part)",
    "Country Code": "MAF",
    "Latest": 0
  },
  {
    "2016": 10332000,
    "2017": 11349000,
    "2018": "",
    "2019": "",
    "Country Name": "Morocco",
    "Country Code": "MAR",
    "Latest": 11349000
  },
  {
    "2016": 336000,
    "2017": 355000,
    "2018": "",
    "2019": "",
    "Country Name": "Monaco",
    "Country Code": "MCO",
    "Latest": 355000
  },
  {
    "2016": 121000,
    "2017": 145000,
    "2018": "",
    "2019": "",
    "Country Name": "Moldova",
    "Country Code": "MDA",
    "Latest": 145000
  },
  {
    "2016": 293000,
    "2017": 255000,
    "2018": "",
    "2019": "",
    "Country Name": "Madagascar",
    "Country Code": "MDG",
    "Latest": 293000
  },
  {
    "2016": 1286000,
    "2017": 1390000,
    "2018": "",
    "2019": "",
    "Country Name": "Maldives",
    "Country Code": "MDV",
    "Latest": 1390000
  },
  {
    "2016": 35079000,
    "2017": 39291000,
    "2018": "",
    "2019": "",
    "Country Name": "Mexico",
    "Country Code": "MEX",
    "Latest": 39291000
  },
  {
    "2016": 5400,
    "2017": 6000,
    "2018": "",
    "2019": "",
    "Country Name": "Marshall Islands",
    "Country Code": "MHL",
    "Latest": 6000
  },
  {
    "2016": 510000,
    "2017": 631000,
    "2018": "",
    "2019": "",
    "Country Name": "North Macedonia",
    "Country Code": "MKD",
    "Latest": 631000
  },
  {
    "2016": 173200,
    "2017": 193300,
    "2018": "",
    "2019": "",
    "Country Name": "Mali",
    "Country Code": "MLI",
    "Latest": 193300
  },
  {
    "2016": 1966000,
    "2017": 2274000,
    "2018": "",
    "2019": "",
    "Country Name": "Malta",
    "Country Code": "MLT",
    "Latest": 2274000
  },
  {
    "2016": 2907000,
    "2017": 3443000,
    "2018": "",
    "2019": "",
    "Country Name": "Myanmar",
    "Country Code": "MMR",
    "Latest": 3443000
  },
  {
    "2016": 1662000,
    "2017": 1877000,
    "2018": "",
    "2019": "",
    "Country Name": "Montenegro",
    "Country Code": "MNE",
    "Latest": 1877000
  },
  {
    "2016": 404000,
    "2017": 469000,
    "2018": "",
    "2019": "",
    "Country Name": "Mongolia",
    "Country Code": "MNG",
    "Latest": 469000
  },
  {
    "2016": 526000,
    "2017": 656000,
    "2018": "",
    "2019": "",
    "Country Name": "Northern Mariana Islands",
    "Country Code": "MNP",
    "Latest": 656000
  },
  {
    "2016": 1639000,
    "2017": 1447000,
    "2018": "",
    "2019": "",
    "Country Name": "Mozambique",
    "Country Code": "MOZ",
    "Latest": 1639000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Mauritania",
    "Country Code": "MRT",
    "Latest": 0
  },
  {
    "2016": 1275000,
    "2017": 1342000,
    "2018": "",
    "2019": "",
    "Country Name": "Mauritius",
    "Country Code": "MUS",
    "Latest": 1342000
  },
  {
    "2016": 849000,
    "2017": 837000,
    "2018": "",
    "2019": "",
    "Country Name": "Malawi",
    "Country Code": "MWI",
    "Latest": 849000
  },
  {
    "2016": 26757000,
    "2017": 25948000,
    "2018": "",
    "2019": "",
    "Country Name": "Malaysia",
    "Country Code": "MYS",
    "Latest": 26757000
  },
  {
    "2016": 1469000,
    "2017": 1499000,
    "2018": "",
    "2019": "",
    "Country Name": "Namibia",
    "Country Code": "NAM",
    "Latest": 1499000
  },
  {
    "2016": 116000,
    "2017": 121000,
    "2018": "",
    "2019": "",
    "Country Name": "New Caledonia",
    "Country Code": "NCL",
    "Latest": 121000
  },
  {
    "2016": 152000,
    "2017": 164000,
    "2018": "",
    "2019": "",
    "Country Name": "Niger",
    "Country Code": "NER",
    "Latest": 164000
  },
  {
    "2016": 1889000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Nigeria",
    "Country Code": "NGA",
    "Latest": 1889000
  },
  {
    "2016": 1504000,
    "2017": 1787000,
    "2018": "",
    "2019": "",
    "Country Name": "Nicaragua",
    "Country Code": "NIC",
    "Latest": 1787000
  },
  {
    "2016": 15828000,
    "2017": 17924000,
    "2018": "",
    "2019": "",
    "Country Name": "Netherlands",
    "Country Code": "NLD",
    "Latest": 17924000
  },
  {
    "2016": 5960000,
    "2017": 6252000,
    "2018": "",
    "2019": "",
    "Country Name": "Norway",
    "Country Code": "NOR",
    "Latest": 6252000
  },
  {
    "2016": 753000,
    "2017": 940000,
    "2018": "",
    "2019": "",
    "Country Name": "Nepal",
    "Country Code": "NPL",
    "Latest": 940000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Nauru",
    "Country Code": "NRU",
    "Latest": 0
  },
  {
    "2016": 3370000,
    "2017": 3555000,
    "2018": "",
    "2019": "",
    "Country Name": "New Zealand",
    "Country Code": "NZL",
    "Latest": 3555000
  },
  {
    "2016": 2335000,
    "2017": 2372000,
    "2018": "",
    "2019": "",
    "Country Name": "Oman",
    "Country Code": "OMN",
    "Latest": 2372000
  },
  {
    "2016": "",
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Pakistan",
    "Country Code": "PAK",
    "Latest": 0
  },
  {
    "2016": 1921000,
    "2017": 1843000,
    "2018": "",
    "2019": "",
    "Country Name": "Panama",
    "Country Code": "PAN",
    "Latest": 1921000
  },
  {
    "2016": 3744000,
    "2017": 4032000,
    "2018": "",
    "2019": "",
    "Country Name": "Peru",
    "Country Code": "PER",
    "Latest": 4032000
  },
  {
    "2016": 5967000,
    "2017": 6621000,
    "2018": "",
    "2019": "",
    "Country Name": "Philippines",
    "Country Code": "PHL",
    "Latest": 6621000
  },
  {
    "2016": 138000,
    "2017": 123000,
    "2018": "",
    "2019": "",
    "Country Name": "Palau",
    "Country Code": "PLW",
    "Latest": 138000
  },
  {
    "2016": 179000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Papua New Guinea",
    "Country Code": "PNG",
    "Latest": 179000
  },
  {
    "2016": 17471000,
    "2017": 18258000,
    "2018": "",
    "2019": "",
    "Country Name": "Poland",
    "Country Code": "POL",
    "Latest": 18258000
  },
  {
    "2016": 3736000,
    "2017": 3797000,
    "2018": "",
    "2019": "",
    "Country Name": "Puerto Rico",
    "Country Code": "PRI",
    "Latest": 3797000
  },
  {
    "2016": 13359000,
    "2017": 15432000,
    "2018": "",
    "2019": "",
    "Country Name": "Portugal",
    "Country Code": "PRT",
    "Latest": 15432000
  },
  {
    "2016": 1308000,
    "2017": 1584000,
    "2018": "",
    "2019": "",
    "Country Name": "Paraguay",
    "Country Code": "PRY",
    "Latest": 1584000
  },
  {
    "2016": 400000,
    "2017": 503000,
    "2018": "",
    "2019": "",
    "Country Name": "West Bank and Gaza",
    "Country Code": "PSE",
    "Latest": 503000
  },
  {
    "2016": 192000,
    "2017": 199000,
    "2018": "",
    "2019": "",
    "Country Name": "French Polynesia",
    "Country Code": "PYF",
    "Latest": 199000
  },
  {
    "2016": 2938200,
    "2017": 2256500,
    "2018": "",
    "2019": "",
    "Country Name": "Qatar",
    "Country Code": "QAT",
    "Latest": 2938200
  },
  {
    "2016": 10223000,
    "2017": 10926000,
    "2018": "",
    "2019": "",
    "Country Name": "Romania",
    "Country Code": "ROU",
    "Latest": 10926000
  },
  {
    "2016": 24571000,
    "2017": 24390000,
    "2018": "",
    "2019": "",
    "Country Name": "Russian Federation",
    "Country Code": "RUS",
    "Latest": 24571000
  },
  {
    "2016": 932000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Rwanda",
    "Country Code": "RWA",
    "Latest": 932000
  },
  {
    "2016": 21294137.6795585,
    "2017": 22845100.2035005,
    "2018": "",
    "2019": "",
    "Country Name": "South Asia",
    "Country Code": "SAS",
    "Latest": 22845100.2035005
  },
  {
    "2016": 18044000,
    "2017": 16109000,
    "2018": "",
    "2019": "",
    "Country Name": "Saudi Arabia",
    "Country Code": "SAU",
    "Latest": 18044000
  },
  {
    "2016": 800000,
    "2017": 813000,
    "2018": "",
    "2019": "",
    "Country Name": "Sudan",
    "Country Code": "SDN",
    "Latest": 813000
  },
  {
    "2016": 1210000,
    "2017": 1365000,
    "2018": "",
    "2019": "",
    "Country Name": "Senegal",
    "Country Code": "SEN",
    "Latest": 1365000
  },
  {
    "2016": 12914000,
    "2017": 13903000,
    "2018": "",
    "2019": "",
    "Country Name": "Singapore",
    "Country Code": "SGP",
    "Latest": 13903000
  },
  {
    "2016": 23200,
    "2017": 25700,
    "2018": "",
    "2019": "",
    "Country Name": "Solomon Islands",
    "Country Code": "SLB",
    "Latest": 25700
  },
  {
    "2016": 55000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sierra Leone",
    "Country Code": "SLE",
    "Latest": 55000
  },
  {
    "2016": 1434000,
    "2017": 1556000,
    "2018": "",
    "2019": "",
    "Country Name": "El Salvador",
    "Country Code": "SLV",
    "Latest": 1556000
  },
  {
    "2016": 60000,
    "2017": 78000,
    "2018": "",
    "2019": "",
    "Country Name": "San Marino",
    "Country Code": "SMR",
    "Latest": 78000
  },
  {
    "2016": 1281000,
    "2017": 1497000,
    "2018": "",
    "2019": "",
    "Country Name": "Serbia",
    "Country Code": "SRB",
    "Latest": 1497000
  },
  {
    "2016": 29000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Sao Tome and Principe",
    "Country Code": "STP",
    "Latest": 29000
  },
  {
    "2016": 256000,
    "2017": 278000,
    "2018": "",
    "2019": "",
    "Country Name": "Suriname",
    "Country Code": "SUR",
    "Latest": 278000
  },
  {
    "2016": 2027000,
    "2017": 2162000,
    "2018": "",
    "2019": "",
    "Country Name": "Slovak Republic",
    "Country Code": "SVK",
    "Latest": 2162000
  },
  {
    "2016": 3032000,
    "2017": 3586000,
    "2018": "",
    "2019": "",
    "Country Name": "Slovenia",
    "Country Code": "SVN",
    "Latest": 3586000
  },
  {
    "2016": 6782000,
    "2017": 7054000,
    "2018": "",
    "2019": "",
    "Country Name": "Sweden",
    "Country Code": "SWE",
    "Latest": 7054000
  },
  {
    "2016": 947000,
    "2017": 921000,
    "2018": "",
    "2019": "",
    "Country Name": "Eswatini",
    "Country Code": "SWZ",
    "Latest": 947000
  },
  {
    "2016": 528000,
    "2017": 402000,
    "2018": "",
    "2019": "",
    "Country Name": "Sint Maarten (Dutch part)",
    "Country Code": "SXM",
    "Latest": 528000
  },
  {
    "2016": 303000,
    "2017": 350000,
    "2018": "",
    "2019": "",
    "Country Name": "Seychelles",
    "Country Code": "SYC",
    "Latest": 350000
  },
  {
    "2016": 454000,
    "2017": 416400,
    "2018": "",
    "2019": "",
    "Country Name": "Turks and Caicos Islands",
    "Country Code": "TCA",
    "Latest": 454000
  },
  {
    "2016": 98000,
    "2017": 87000,
    "2018": "",
    "2019": "",
    "Country Name": "Chad",
    "Country Code": "TCD",
    "Latest": 98000
  },
  {
    "2016": 338000,
    "2017": 496000,
    "2018": "",
    "2019": "",
    "Country Name": "Togo",
    "Country Code": "TGO",
    "Latest": 496000
  },
  {
    "2016": 32530000,
    "2017": 35592000,
    "2018": "",
    "2019": "",
    "Country Name": "Thailand",
    "Country Code": "THA",
    "Latest": 35592000
  },
  {
    "2016": 344000,
    "2017": 431000,
    "2018": "",
    "2019": "",
    "Country Name": "Tajikistan",
    "Country Code": "TJK",
    "Latest": 431000
  },
  {
    "2016": 66000,
    "2017": 74000,
    "2018": "",
    "2019": "",
    "Country Name": "Timor-Leste",
    "Country Code": "TLS",
    "Latest": 74000
  },
  {
    "2016": 59100,
    "2017": 62500,
    "2018": "",
    "2019": "",
    "Country Name": "Tonga",
    "Country Code": "TON",
    "Latest": 62500
  },
  {
    "2016": 409000,
    "2017": 395000,
    "2018": "",
    "2019": "",
    "Country Name": "Trinidad and Tobago",
    "Country Code": "TTO",
    "Latest": 409000
  },
  {
    "2016": 5724000,
    "2017": 7052000,
    "2018": "",
    "2019": "",
    "Country Name": "Tunisia",
    "Country Code": "TUN",
    "Latest": 7052000
  },
  {
    "2016": 30289000,
    "2017": 37601000,
    "2018": "",
    "2019": "",
    "Country Name": "Turkey",
    "Country Code": "TUR",
    "Latest": 37601000
  },
  {
    "2016": 2500,
    "2017": 2500,
    "2018": "",
    "2019": "",
    "Country Name": "Tuvalu",
    "Country Code": "TUV",
    "Latest": 2500
  },
  {
    "2016": 1233000,
    "2017": 1275000,
    "2018": "",
    "2019": "",
    "Country Name": "Tanzania",
    "Country Code": "TZA",
    "Latest": 1275000
  },
  {
    "2016": 1323000,
    "2017": 1402000,
    "2018": "",
    "2019": "",
    "Country Name": "Uganda",
    "Country Code": "UGA",
    "Latest": 1402000
  },
  {
    "2016": 13333000,
    "2017": 14230000,
    "2018": "",
    "2019": "",
    "Country Name": "Ukraine",
    "Country Code": "UKR",
    "Latest": 14230000
  },
  {
    "2016": 3037000,
    "2017": 3674000,
    "2018": "",
    "2019": "",
    "Country Name": "Uruguay",
    "Country Code": "URY",
    "Latest": 3674000
  },
  {
    "2016": 76407000,
    "2017": 76941000,
    "2018": "",
    "2019": "",
    "Country Name": "United States",
    "Country Code": "USA",
    "Latest": 76941000
  },
  {
    "2016": 2027000,
    "2017": 2690000,
    "2018": "",
    "2019": "",
    "Country Name": "Uzbekistan",
    "Country Code": "UZB",
    "Latest": 2690000
  },
  {
    "2016": 79000,
    "2017": 76000,
    "2018": "",
    "2019": "",
    "Country Name": "St. Vincent and the Grenadines",
    "Country Code": "VCT",
    "Latest": 79000
  },
  {
    "2016": 601000,
    "2017": 427000,
    "2018": "",
    "2019": "",
    "Country Name": "Venezuela, RB",
    "Country Code": "VEN",
    "Latest": 601000
  },
  {
    "2016": 408000,
    "2017": 335000,
    "2018": "",
    "2019": "",
    "Country Name": "British Virgin Islands",
    "Country Code": "VGB",
    "Latest": 408000
  },
  {
    "2016": 667000,
    "2017": "",
    "2018": "",
    "2019": "",
    "Country Name": "Virgin Islands (U.S.)",
    "Country Code": "VIR",
    "Latest": 667000
  },
  {
    "2016": 10013000,
    "2017": 12922000,
    "2018": "",
    "2019": "",
    "Country Name": "Vietnam",
    "Country Code": "VNM",
    "Latest": 12922000
  },
  {
    "2016": 95100,
    "2017": 109000,
    "2018": "",
    "2019": "",
    "Country Name": "Vanuatu",
    "Country Code": "VUT",
    "Latest": 109000
  },
  {
    "2016": 134000,
    "2017": 146000,
    "2018": "",
    "2019": "",
    "Country Name": "Samoa",
    "Country Code": "WSM",
    "Latest": 146000
  },
  {
    "2016": 10044000,
    "2017": 10285000,
    "2018": "",
    "2019": "",
    "Country Name": "South Africa",
    "Country Code": "ZAF",
    "Latest": 10285000
  },
  {
    "2016": 956000,
    "2017": 1083000,
    "2018": "",
    "2019": "",
    "Country Name": "Zambia",
    "Country Code": "ZMB",
    "Latest": 1083000
  },
  {
    "2016": 2168000,
    "2017": 2423000,
    "2018": "",
    "2019": "",
    "Country Name": "Zimbabwe",
    "Country Code": "ZWE",
    "Latest": 2423000
  }
]