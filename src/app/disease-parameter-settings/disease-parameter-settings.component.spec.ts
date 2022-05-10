import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiseaseParameterSettingsComponent } from './disease-parameter-settings.component';

describe('DiseasaeParameterSettingsComponent', () => {
  let component: DiseaseParameterSettingsComponent;
  let fixture: ComponentFixture<DiseaseParameterSettingsComponent>;

  beforeEach(waitForAsync(() => {
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
