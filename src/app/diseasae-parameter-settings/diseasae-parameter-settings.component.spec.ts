import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasaeParameterSettingsComponent } from './diseasae-parameter-settings.component';

describe('DiseasaeParameterSettingsComponent', () => {
  let component: DiseasaeParameterSettingsComponent;
  let fixture: ComponentFixture<DiseasaeParameterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasaeParameterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasaeParameterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
