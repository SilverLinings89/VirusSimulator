import { TestBed } from '@angular/core/testing';

import { FlightDataService } from './flight-data.service';

describe('FlightDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightDataService = TestBed.get(FlightDataService);
    expect(service).toBeTruthy();
  });
});
