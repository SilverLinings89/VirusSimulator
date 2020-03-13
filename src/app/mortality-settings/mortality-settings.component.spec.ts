import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalitySettingsComponent } from './mortality-settings.component';

describe('MortalitySettingsComponent', () => {
  let component: MortalitySettingsComponent;
  let fixture: ComponentFixture<MortalitySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalitySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortalitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
