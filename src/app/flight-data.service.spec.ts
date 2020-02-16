import { TestBed } from '@angular/core/testing';

import { BaseDataService } from './flight-data.service';

describe('FlightDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseDataService = TestBed.get(BaseDataService);
    expect(service).toBeTruthy();
  });
});
