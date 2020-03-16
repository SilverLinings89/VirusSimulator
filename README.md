# CoronaSimulator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.

## Setup

Run `npm i` to install all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Status

The project is currently not in a released state, meaning it will not work completely and some core features are missing. A basic implementation is there however.

## Data Sources

Special Thanks to: 
- [JonSnowLabs](https://datahub.io/JohnSnowLabs/population-figures-by-country) for providing a list of country populations.
- [The World Bank](https://data.worldbank.org/) for providing a list of [Departures](https://data.worldbank.org/indicator/ST.INT.DPRT) and [Arrivals](https://data.worldbank.org/indicator/ST.INT.ARVL) I could parse to JSON and use.
- Obviously the [angular team](https://angular.io/), which is just doing an awesome job.
- [Plotly](plot.ly) for their chart-tools in Javascript, which I use to draw the world map.
- [Highcharts](https://www.highcharts.com/) for their chart-tools, which I draw all the charts with.