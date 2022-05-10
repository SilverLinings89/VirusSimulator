import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MortalitySettingsComponent } from './mortality-settings.component';

describe('MortalitySettingsComponent', () => {
  let component: MortalitySettingsComponent;
  let fixture: ComponentFixture<MortalitySettingsComponent>;

  beforeEach(waitForAsync(() => {
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
