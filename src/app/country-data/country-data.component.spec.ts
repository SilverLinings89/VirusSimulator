import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CountryDataComponent } from './country-data.component';

describe('CountryDataComponent', () => {
  let component: CountryDataComponent;
  let fixture: ComponentFixture<CountryDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
