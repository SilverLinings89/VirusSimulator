import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationControlComponent } from './simulation-control.component';

describe('SimulationControlComponent', () => {
  let component: SimulationControlComponent;
  let fixture: ComponentFixture<SimulationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
