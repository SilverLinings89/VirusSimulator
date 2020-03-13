import { TestBed } from '@angular/core/testing';

import { SimulationDoneGuard } from './simulation-done.guard';

describe('SimulationDoneGuard', () => {
  let guard: SimulationDoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SimulationDoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
