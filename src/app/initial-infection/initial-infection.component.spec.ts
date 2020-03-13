import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialInfectionComponent } from './initial-infection.component';

describe('InitialInfectionComponent', () => {
  let component: InitialInfectionComponent;
  let fixture: ComponentFixture<InitialInfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialInfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialInfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
