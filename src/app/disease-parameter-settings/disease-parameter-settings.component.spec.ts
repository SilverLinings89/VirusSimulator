import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseParameterSettingsComponent } from './disease-parameter-settings.component';

describe('DiseasaeParameterSettingsComponent', () => {
  let component: DiseaseParameterSettingsComponent;
  let fixture: ComponentFixture<DiseaseParameterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseParameterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseParameterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
