import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SimulationControlComponent } from './simulation-control/simulation-control.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import { MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule} from '@angular/cdk/portal';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule} from '@angular/cdk/tree';
import { MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import { MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { MatSortModule} from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
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
      { enableTracing: false }
    ),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
