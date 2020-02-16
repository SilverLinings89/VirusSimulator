import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { SimulationControlComponent } from './simulation-control/simulation-control.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SimulationControlComponent,
    ChartViewComponent,
    MapViewComponent
  ],
  imports: [
    GoogleChartsModule.forRoot(environment.mapsApiKey, "46"),
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
