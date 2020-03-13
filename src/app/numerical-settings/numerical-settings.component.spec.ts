import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalSettingsComponent } from './numerical-settings.component';

describe('NumericalSettingsComponent', () => {
  let component: NumericalSettingsComponent;
  let fixture: ComponentFixture<NumericalSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericalSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
