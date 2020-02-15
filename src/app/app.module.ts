import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { SimulationControlComponent } from './simulation-control/simulation-control.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationControlComponent,
    ChartViewComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
