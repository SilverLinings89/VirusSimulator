import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SimulationControlComponent } from './simulation-control/simulation-control.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule} from '@angular/cdk/portal';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule} from '@angular/cdk/tree';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTreeModule} from '@angular/material/tree';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { WorldViewComponent } from './world-view/world-view.component';
import { CountryDataComponent } from './country-data/country-data.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { MathComponent } from './math/math.component';
import { SimulationDoneGuard } from './simulation-done.guard';
import { InitialInfectionComponent } from './initial-infection/initial-infection.component';
import { MortalitySettingsComponent } from './mortality-settings/mortality-settings.component';
import { DiseaseParameterSettingsComponent } from './disease-parameter-settings/disease-parameter-settings.component';
import { NumericalSettingsComponent } from './numerical-settings/numerical-settings.component';
import { PresetListComponent } from './preset-list/preset-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';

PlotlyModule.plotlyjs = PlotlyJS;

const appRoutes: Routes = [
  { path: 'setup', component: SimulationControlComponent },
  { path: 'world', component: WorldViewComponent, canActivate: [SimulationDoneGuard]},
  { path: 'country', component: ChartViewComponent, canActivate: [SimulationDoneGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'math', component: MathComponent },
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
  { path: '**', redirectTo: 'setup', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SimulationControlComponent,
    ChartViewComponent,
    MapViewComponent,
    WorldViewComponent,
    CountryDataComponent,
    SidenavComponent,
    HeaderComponent,
    AboutComponent,
    MathComponent,
    InitialInfectionComponent,
    MortalitySettingsComponent,
    DiseaseParameterSettingsComponent,
    NumericalSettingsComponent,
    PresetListComponent
  ],
  imports: [
    AngularMultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    MatFormFieldModule,
    ChartModule,
    PlotlyModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, relativeLinkResolution: 'legacy' }
    ),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
